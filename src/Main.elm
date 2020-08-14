module Main exposing (..)


import Browser

import Graph exposing (Graph)
import Graph as Graph exposing (..)

import Html exposing (Html)
import Html as H
import Svg as S
import Svg.Attributes as SA

import Msg exposing (Msg)
import Event exposing (Event)
import Timeline exposing (Timeline, timeline)

import Render.Event as Event exposing (view, width, height)


type alias Model = Graph Event ()


init : () -> ( Model, Cmd Msg )
init _ =
    ( Graph.fromNodeLabelsAndEdgePairs timeline []
    , Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update _ model = ( model, Cmd.none )


subscription : Model -> Sub Msg
subscription _ = Sub.none


view : Model -> Html Msg
view graph =
    let
        wrapperYShift = Event.height / 2
        wrapperTransform =
            "transform: translate(0, " ++ String.fromFloat wrapperYShift ++ "px);"
        eventTransform idx =
            "transform: translate(0," ++ String.fromInt (idx * Event.height) ++ "px);"
    in
        S.svg
            [ SA.width <| String.fromInt Event.width
            , SA.height <| String.fromInt <| Event.height * Graph.size graph
            ]
            <| S.g [ SA.style wrapperTransform ] >> List.singleton
            <| List.indexedMap
                (\idx evtView ->
                    S.g
                        [ SA.style <| eventTransform idx ]
                        [ evtView ]
                )
            <| List.map Event.view
            <| List.map (.label << .node)
            <| List.reverse
            <| Graph.dfs (Graph.onDiscovery (::)) [] graph


main : Program () Model ()
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscription
        , view = view
        }


