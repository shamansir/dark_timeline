module Main exposing (..)


import Browser

import Graph exposing (Graph)
import Graph as Graph exposing (..)

import Html exposing (Html)
import Html as H

import Event exposing (Event)
import Timeline exposing (Timeline, timeline)


type alias Model = Graph Event ()


type alias Msg = ()


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
    H.div []
        <| List.map viewEvent
        <| List.map .label
        <| List.map .node
        <| Graph.dfs (Graph.onDiscovery (::)) [] graph


viewEvent : Event -> Html Msg
viewEvent _ = H.text "event"


main : Program () Model ()
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscription
        , view = view
        }


