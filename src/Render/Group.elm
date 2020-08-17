module Render.Group exposing (..)


import Html exposing (Html)
import Html as H
import Svg as S
import Svg.Attributes as SA

import Msg exposing (Msg)
import Event exposing (Event)
import Timeline exposing (Timeline, timeline)

import Render.Event as Event exposing (view, width, height)
import Render.Util exposing (translate, withoutSize, Sized)


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
