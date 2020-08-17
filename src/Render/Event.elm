module Render.Event exposing (view, width, height)


import Html as H
import Svg as S
import Svg.Attributes as SA
import Svg exposing (Svg)

import Msg exposing (Msg)

import Person exposing (..)
import Event exposing (..)


import Render.Person as Person exposing (..)
import Render.Util exposing (translate, distribute, wrapText, Sized)


width = 350
height = 130


view : Event -> Sized (Svg Msg)
view event =
    ( { width = width, height = height }
    , S.g
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
        , S.g
            [ SA.style <| translate 10 0 ]
            <| List.map
                (\(shift, (personId,stage,_)) ->
                    Svg.g
                        [ SA.style <| translate shift 0 ]
                        [ Person.view (personId, stage) ]
                )
                --(Person.view << (\(p,s,_) -> (p,s)))
            <| distribute 50
            <| event.participants
        , S.g
            [ SA.style <| translate 10 0 ]
            [ event.description |> wrapText 330 500 ]
        ]
    )
