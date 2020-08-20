module Render.Group exposing (..)


import Html exposing (Html)
import Html as H
import Svg as S
import Svg.Attributes as SA

import Msg exposing (Msg)
import Event exposing (Event)
import Timeline exposing (Timeline, timeline)

import Render.Event as Event exposing (view, width, height)
import Render.Label as Label
import Render.Util exposing (..)


type Group a
    = Empty
    | Items Label (List a)
    | Items_ (List a)
    | Nest Label (List (Group a))
    | Nest_ (List (Group a))


type Direction
    = Horizontal
    | Vertical


emptyGroup : Group a
emptyGroup =
    Empty


form : Label -> List ( Label, List a ) -> Group a
form rootLabel = Nest rootLabel << List.map (\(label, items) -> Items label items)


form_ : List ( Label, List a ) -> Group a
form_ = Nest_ << List.map (\(label, items) -> Items label items)


distribute
    :  Direction
    -> (a -> Sized (S.Svg Msg))
    -> List a
    -> Sized (S.Svg Msg)
distribute direction renderItem items =
    case direction of
        Vertical ->
            let
                horzMargin = 5
                vertMargin = 10
                renderedItems = items |> List.map renderItem
                totalWidth =
                    renderedItems
                        |> List.map (Tuple.first >> .width)
                        |> List.maximum
                        |> Maybe.withDefault 0
                ( totalHeight, withTransforms )
                    = renderedItems
                        |> mapAccum
                            (\({ height }, item ) prev ->
                                let
                                    shift = prev + height + vertMargin
                                in
                                    ( shift
                                    , S.g [ SA.style <| translate 0 prev ] [ item ]
                                    )
                            )
                            vertMargin
            in
                withTransforms
                    |> S.g []
                    |> sized totalWidth totalHeight
        Horizontal ->
            S.g [] [] |> noSize -- TODO:


view
    :  Direction
    -> (a -> Sized (S.Svg Msg))
    -> Group a
    -> Sized (S.Svg Msg)
view direction renderItem group =
    case ( direction, group ) of
        ( Vertical, Items label items ) ->

            items
                |> distribute Vertical renderItem
                |> Label.add label

        ( Vertical, Items_ items ) ->

            items
                |> distribute Vertical renderItem

        ( Vertical, Nest label nestedGroups ) ->

            nestedGroups
                |> distribute Vertical (view Vertical renderItem)
                |> Label.add label

        ( Vertical, Nest_ nestedGroups ) ->

            nestedGroups
                |> distribute Vertical (view Vertical renderItem)

        ( Vertical, Empty ) ->

            S.g [] [] |> noSize

        ( Horizontal, _ ) ->

            view Vertical renderItem group
