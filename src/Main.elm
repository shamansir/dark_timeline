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

import Render.Plot exposing (..)
import Render.Plot as Plot exposing (view)
import Render.Util exposing (translate)


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
view = Plot.view { x = ByWorld noFilter, y = ByDate noFilter }


main : Program () Model ()
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscription
        , view = view
        }


