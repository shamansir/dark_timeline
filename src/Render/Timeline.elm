module Render.Timeline exposing (..)


import Html exposing (Html)
import Html as H
import Svg as S
import Svg.Attributes as SA

import Msg exposing (Msg)
import Event exposing (Event)
import Timeline exposing (Timeline, timeline)

import Render.Event as Event exposing (view, width, height)
import Render.Util exposing (translate)


view : Timeline -> Html Msg
view timeline =
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
    S.svg
        [ SA.width <| String.fromInt totalWidth
        , SA.height <| String.fromInt totalHeight
        ]
        <| S.g [ SA.style wrapperTransform ] >> List.singleton
        <| List.indexedMap
            (\idx evtView ->
                S.g
                    [ SA.style <| eventTransform idx ]
                    [ evtView ]
            )
        <| List.map Event.view
        <| timeline
