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

import Render.Event as Event exposing (view)
import Render.Group as Group exposing (..)
import Render.Util exposing (withoutSize)


type Axis
    = None
    | All
    | ByDate (Date -> Bool)
    | ByPerson (Person -> Bool)
    | BySeason (Episodes -> Bool)
    | ByWorld (World -> Bool)


noFilter : a -> Bool
noFilter = always True


view : Graph Event () -> Html Msg
-- view = viewAsGrid { x = None, y = All }
view =
    viewAsGrid
        { x = ByWorld noFilter
        , y = ByDate noFilter
        }


viewAsGrid : { x : Axis, y : Axis } -> Graph Event () -> Html Msg
viewAsGrid axes =
    plot axes
        >> Group.view Horizontal
            (Group.view Vertical Event.view)
        >> (\({ width, height }, v) ->
             S.svg
                [ SA.width <| String.fromFloat width
                , SA.height<| String.fromFloat height
                ]
                [ v ])


plot : { x : Axis, y : Axis } -> Graph Event () -> Group (Group Event)
plot { x, y } =
    Graph.dfs (Graph.onDiscovery (::)) []
        >> List.reverse
        >> List.map (.label << .node)
        >> Items "root"
        >> List.singleton
        >> Items "foo"


group : List a -> (a -> Bool) -> Group a
group _ _ = emptyGroup
