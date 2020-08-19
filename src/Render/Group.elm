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
    = Items Label (List a)
    | Nest Label (Group a)


type Direction
    = Horizontal
    | Vertical


emptyGroup : Group a
emptyGroup =
    Items (Label "") []


view
    :  Direction
    -> (a -> Sized (S.Svg Msg))
    -> Group a
    -> Sized (S.Svg Msg)
view direction renderItem group =
    case ( direction, group ) of
        ( Vertical, Items label items ) ->
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
                    |> Label.add label
        ( Vertical, Nest label nestedGroup ) ->
            view direction renderItem nestedGroup
                |> Label.add label
        ( Horizontal, _ ) ->
            view Vertical renderItem group
    {-
    let
        margin = 10
        halfHeight = Event.height / 2
        heightAndMargin = Event.height + margin
        totalHeight = ((Event.height + margin) * List.length timeline) + margin
        totalWidth = margin + Event.width + margin
        wrapperTransform =
            translate margin (halfHeight + margin)
        eventTransform idx =
            translate 0.0 <| toFloat idx * heightAndMargin
    in
        (
            { width = totalWidth
            , height = toFloat totalHeight
            }
        , S.g [ SA.style wrapperTransform ]
            <| List.indexedMap
                (\idx evtView ->
                    S.g
                        [ SA.style <| eventTransform idx ]
                        [ withoutSize evtView ]
                )
            <| List.map Event.view
            <| timeline
        )
    -}
