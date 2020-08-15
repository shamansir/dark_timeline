module Render.Person exposing (view)


import Svg as S
import Svg exposing (Svg)
import Svg.Attributes as SA exposing (..)

import Msg exposing (Msg)

import Person exposing (..)


view : Person -> Svg Msg
view _ =
    S.g
        []
        [ S.circle
            [ SA.r <| String.fromInt 20
            , SA.stroke "black"
            , SA.strokeWidth <| String.fromInt 1
            , SA.fill "none"
            ]
            []
        ]
