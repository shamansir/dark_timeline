module Render.Event exposing (view, width, height)


import Svg as S
import Svg.Attributes as SA
import Svg exposing (Svg)

import Msg exposing (Msg)

import Person exposing (..)
import Event exposing (..)


width = 350
height = 130


view : Event -> Svg Msg
view event =
    S.g
        []
        [ S.rect
            [ SA.rx <| String.fromInt 15
            , SA.ry <| String.fromInt 15
            , SA.x <| String.fromInt 0
            , SA.y <| String.fromFloat (height / 2 * -1)
            , SA.width <| String.fromInt width
            , SA.height <| String.fromInt height
            , SA.stroke "black"
            , SA.fill "none"
            , SA.strokeWidth <| String.fromInt 3
            ]
            []
        , S.text_
            []
            [ S.text event.description ]
        ]
