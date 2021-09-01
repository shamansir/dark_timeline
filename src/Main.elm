port module Main exposing (..)


import Browser

import Graph as Graph exposing (fromNodesAndEdges)
import Graph.DOT as Graph exposing (..)

import Html exposing (Html)
import Html as H
import Html.Attributes as H
import Html.Events as H
import Svg as S
import Svg.Attributes as SA

import Msg as Internal exposing (Msg)
import Event exposing (Event)

import Person as Person
import Event exposing (World(..))
import Timeline exposing (Timeline, timeline)
import Timeline as Timeline exposing (Graph)
import Gen.Def as Gen exposing (toGraph, Graph)
import Gen.Tree as Gen exposing (eva, adam, origin)

import Render.Plot exposing (..)
import Render.Plot as Plot exposing (view)
import Render.Util exposing (translate)


parentElemId = "graph-parent"
targetElemId = "graph-target"


type Msg
    = ToGenealogy World
    | ToTimeline
    | Internal Internal.Msg


type Model
    = Timeline Timeline.Graph
    | Genealogy Gen.Graph


init : () -> ( Model, Cmd Msg )
init _ =
    ( Timeline <| Graph.fromNodeLabelsAndEdgePairs timeline []
    , Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ToGenealogy world ->
            let
                graph = Gen.toGraph <| case world of
                    Adam -> Gen.adam
                    Eva -> Gen.eva
                    Origin_1 -> Gen.origin
                    Origin_2 -> Gen.origin
            in
                ( Genealogy graph
                , viewGraph
                    { targetEl = targetElemId
                    , parentEl = parentElemId
                    , graphStr =
                        Graph.output
                            (Just << Person.codename)
                            (Just << Gen.relToString)
                            graph
                    }
                )
        ToTimeline ->
            ( Timeline <| Graph.fromNodeLabelsAndEdgePairs timeline []
            , Cmd.none
            )
        Internal _ ->
            ( model, Cmd.none
            )


subscription : Model -> Sub Msg
subscription _ = Sub.none


view : Model -> Html Msg
view model =
    H.div
        []
        [ H.div
            [ H.id "links" ]
            [ H.a [ H.href "#", H.onClick <| ToTimeline ] [ H.text "Timeline" ]
            , H.a [ H.href "#", H.onClick <| ToGenealogy Adam ] [ H.text "Adam Gen." ]
            , H.a [ H.href "#", H.onClick <| ToGenealogy Eva ] [ H.text "Eva Gen." ]
            , H.a [ H.href "#", H.onClick <| ToGenealogy Origin_1 ] [ H.text "Origin Gen." ]
            ]
        ,
            case model of
                Timeline eventGraph ->
                    Plot.view { x = ByWorld noFilter, y = ByDate noFilter } eventGraph
                        |> Html.map Internal
                Genealogy _ ->
                    H.div
                        [ H.id parentElemId ]
                        [ H.div [ H.id targetElemId ] [] ]
        ]

main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscription
        , view = view
        }


port viewGraph : { parentEl : String, targetEl : String, graphStr : String } -> Cmd msg