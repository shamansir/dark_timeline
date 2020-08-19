module Render.Person exposing (view, radius)


import Svg as S
import Svg exposing (Svg)
import Svg.Attributes as SA exposing (..)

import Msg exposing (Msg)

import Person exposing (..)


radius = 20


view : Person -> Svg Msg
view _ =
    S.g
        []
        [ S.circle
            [ SA.r <| String.fromFloat radius
            , SA.cx <| String.fromFloat <| radius / 2
            , SA.cy <| String.fromFloat <| radius / 2
            , SA.stroke "black"
            , SA.strokeWidth <| String.fromInt 1
            , SA.fill "none"
            ]
            []
        ]
