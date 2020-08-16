module Render.Graph exposing (..)


import Graph exposing (Graph)
import Graph as Graph exposing (..)

import Html exposing (Html)
import Html as H
import Svg as S
import Svg.Attributes as SA

import Msg exposing (Msg)
import Event exposing (..)
import Person exposing (Person)

import Render.Timeline as Timeline exposing (view)


type Axis
    = None
    | All
    | ByDate (Date -> Bool)
    | ByPerson (Person -> Bool)
    | BySeason (Episodes -> Bool)
    | ByWorld (World -> Bool)


view : Graph Event () -> Html Msg
view =
    Graph.dfs (Graph.onDiscovery (::)) []
        >> List.reverse
        >> List.map (.label << .node)
        >> Timeline.view


viewAsGrid : { x : Axis, y : Axis } -> Graph Event () -> Html Msg
viewAsGrid { x, y } _ = H.div [] []
