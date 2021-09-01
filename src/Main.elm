port module Main exposing (..)


import Browser

import Graph exposing (Graph)
import Graph as Graph exposing (..)
import Graph.DOT as Graph exposing (..)

import Html exposing (Html)
import Html as H
import Html.Attributes as H
import Svg as S
import Svg.Attributes as SA

import Msg exposing (Msg)
import Event exposing (Event)

import Person as Person
import Timeline exposing (Timeline, timeline)
import Gen.Def as Gen exposing (toGraph)
import Gen.Tree as Gen exposing (eva, adam, origin)

import Render.Plot exposing (..)
import Render.Plot as Plot exposing (view)
import Render.Util exposing (translate)



type alias TargetElem = String
type alias EncodedGraph = String


targetElemId = "graph-target"


type alias Model = Graph Event ()


init : () -> ( Model, Cmd Msg )
init _ =
    ( Graph.fromNodeLabelsAndEdgePairs timeline []
    , viewGraph
        { targetEl = targetElemId
        , graphStr = Graph.output
            (Just << Person.codename)
            (Just << Gen.relToString)
            <| Gen.toGraph Gen.adam
        }
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update _ model = ( model, Cmd.none )


subscription : Model -> Sub Msg
subscription _ = Sub.none


view : Model -> Html Msg
view eventGraph =
    H.div
        []
        [ H.div [ H.id targetElemId ] []
        , Plot.view { x = ByWorld noFilter, y = ByDate noFilter } eventGraph
        ]


main : Program () Model ()
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscription
        , view = view
        }


port viewGraph : { targetEl : TargetElem, graphStr : EncodedGraph } -> Cmd msg