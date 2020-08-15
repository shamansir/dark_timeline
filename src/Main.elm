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
        margin = 10
        halfHeight = Event.height / 2
        heightAndMargin = Event.height + margin
        translate x y
            = "transform: translate("
                ++ String.fromFloat x ++ "px, "
                ++ String.fromFloat y ++ "px);"
        totalHeight = ((Event.height + margin) * Graph.size graph) + margin
        totalWidth = margin + Event.width + margin
        wrapperTransform =
            translate margin (halfHeight + margin)
        eventTransform idx =
            translate 0.0 <| toFloat idx * heightAndMargin
    in
        S.svg
            [ SA.width <| String.fromInt totalWidth
            , SA.height <| String.fromInt totalHeight
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


