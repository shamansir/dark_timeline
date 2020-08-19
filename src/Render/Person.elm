module Render.Person exposing (view, radius)


import Svg as S
import Svg exposing (Svg)
import Svg.Attributes as SA exposing (..)

import Msg exposing (Msg)

import Person exposing (Person)
import Person as Person exposing (..)


radius = 20


view : Person -> Svg Msg
view ( personId, personStage ) =
    S.g
        []
        [ S.circle
            [ SA.r <| String.fromFloat radius
            , SA.cx <| String.fromFloat radius
            , SA.cy <| String.fromFloat radius
            , SA.stroke "black"
            , SA.strokeWidth <| String.fromInt 1
            , SA.fill "none"
            ]
            []
        , case Person.picture personId personStage of
            Just src ->
                S.image
                    [ SA.xlinkHref src
                    , SA.width <| String.fromFloat <| radius * 2
                    , SA.height <| String.fromFloat <| radius * 2
                    ]
                    []
            Nothing -> S.g [] []
        ]
