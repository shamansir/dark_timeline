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


type Group l a
    = None
    | Some l (List a)
    | Some_ (List a)
    | Nest l (List (Group l a))
    | Nest_ (List (Group l a))


type Direction
    = Horizontal
    | Vertical


emptyGroup : Group l a
emptyGroup =
    None


map : (a -> b) -> Group l a -> Group l b
map f group =
    case group of
        None -> None
        Some key list -> Some key <| List.map f <| list
        Some_ list -> Some_ <| List.map f <| list
        Nest key list -> Nest key <| List.map (map f) <| list
        Nest_ list -> Nest_ <| List.map (map f) <| list


mapKey : (l -> m) -> Group l a -> Group m a
mapKey f group =
    case group of
        None -> None
        Some key list -> Some (f key) list
        Some_ list -> Some_ list
        Nest key list -> Nest (f key) <| List.map (mapKey f) <| list
        Nest_ list -> Nest_ <| List.map (mapKey f) <| list


form : l -> List ( l, List a ) -> Group l a
form rootLabel = Nest rootLabel << List.map (\(key, items) -> Some key items)


form_ : List ( l, List a ) -> Group l a
form_ = Nest_ << List.map (\(key, items) -> Some key items)


-- form1 : List ( l, Group l a ) -> Group l a
-- form1 = Nest_ << List.map (\(key, group) -> Nest key items)


distribute
    :  Direction
    -> (a -> Sized (S.Svg Msg))
    -> List a
    -> Sized (S.Svg Msg)
distribute direction renderItem items =
    case direction of
        Vertical ->
            let
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
            let
                horzMargin = 10
                renderedItems = items |> List.map renderItem
                totalHeight =
                    renderedItems
                        |> List.map (Tuple.first >> .height)
                        |> List.maximum
                        |> Maybe.withDefault 0
                ( totalWidth, withTransforms )
                    = renderedItems
                        |> mapAccum
                            (\({ width }, item ) prev ->
                                let
                                    shift = prev + width + horzMargin
                                in
                                    ( shift
                                    , S.g [ SA.style <| translate prev 0 ] [ item ]
                                    )
                            )
                            horzMargin
            in
                withTransforms
                    |> S.g []
                    |> sized totalWidth totalHeight


view
    :  Direction
    -> (a -> Sized (S.Svg Msg))
    -> Group Label a
    -> Sized (S.Svg Msg)
view direction renderItem group =
    case ( direction, group ) of

        ( Vertical, Some label items ) ->

            items
                |> distribute Vertical renderItem
                |> Label.add label

        ( Vertical, Some_ items ) ->

            items
                |> distribute Vertical renderItem

        ( Vertical, Nest label nestedGroups ) ->

            nestedGroups
                 |> distribute Vertical (view Vertical renderItem)
                 |> Label.add label

        ( Vertical, Nest_ nestedGroups ) ->

            nestedGroups
               |> distribute Vertical (view Vertical renderItem)

        ( Vertical, None ) ->

            S.g [] [] |> noSize

        ( Horizontal, Some label items ) ->

            items
                |> distribute Horizontal renderItem
                |> Label.add label

        ( Horizontal, Some_ items ) ->

            items
                |> distribute Horizontal renderItem

        ( Horizontal, Nest label nestedGroups ) ->

            nestedGroups
                 |> distribute Horizontal (view Horizontal renderItem)
                 |> Label.add label

        ( Horizontal, Nest_ nestedGroups ) ->

            nestedGroups
               |> distribute Horizontal (view Horizontal renderItem)

        ( Horizontal, None ) ->

            S.g [] [] |> noSize
