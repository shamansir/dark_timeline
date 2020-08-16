module Render.Graph exposing (..)


import Graph exposing (Graph)
import Graph as Graph exposing (..)

import Html exposing (Html)
import Html as H
import Svg as S
import Svg.Attributes as SA

import Msg exposing (Msg)
import Event exposing (Event)

import Render.Timeline as Timeline exposing (view)


view : Graph Event () -> Html Msg
view =
    Graph.dfs (Graph.onDiscovery (::)) []
        >> List.reverse
        >> List.map (.label << .node)
        >> Timeline.view
