module Render.Group exposing (..)


import Html exposing (Html)
import Html as H
import Svg as S
import Svg.Attributes as SA

import Msg exposing (Msg)
import Event exposing (Event)
import Timeline exposing (Timeline, timeline)

import Render.Event as Event exposing (view, width, height)
import Render.Util exposing (translate, withoutSize, Sized, sized, mapAccum)


type alias Label = String


type Group a
    = Items Label (List a)
    | Nest Label (Group a)


type Direction
    = Horizontal
    | Vertical


emptyGroup : Group a
emptyGroup =
    Items "" []


view
    :  Direction
    -> (a -> Sized (S.Svg Msg))
    -> Group a
    -> Sized (S.Svg Msg)
view direction renderItem group =
    case ( direction, group ) of
        ( Vertical, Items label items ) ->
            let
                margin = 10
                renderedItems = items |> List.map renderItem
                totalWidth =
                    renderedItems
                        |> List.map (Tuple.first >> .width)
                        |> List.maximum
                        |> Maybe.withDefault 0
                totalHeight =
                    renderedItems
                        |> List.map (Tuple.first >> .height)
                        |> List.foldl (\itemHeight total -> total + itemHeight + margin) margin
                withTransforms
                    = renderedItems
                        |> mapAccum
                            (\({ height }, item ) prev ->
                                let
                                    shift = prev + height + margin
                                in
                                    ( shift
                                    , S.g [ SA.style <| translate 0 prev ] [ item ]
                                    )
                            )
                            margin
                        |> Tuple.second
            in
                withTransforms
                    |> S.g []
                    |> sized totalWidth totalHeight
        ( Vertical, Nest _ nestedGroup ) ->
            view direction renderItem nestedGroup
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
