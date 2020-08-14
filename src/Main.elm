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

import Render.Event as Event exposing (view)


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
    S.svg
        [ SA.width "1000", SA.height "12000" ]
        <| List.indexedMap
            (\idx evtView ->
                S.g
                    [ SA.style
                        <| "transform: translate(0," ++ String.fromInt (50 + idx * 50) ++ "px);" ]
                    [ evtView ])
        <| List.map Event.view
        <| List.map .label
        <| List.map .node
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


