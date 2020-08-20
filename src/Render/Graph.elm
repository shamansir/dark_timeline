module Render.Graph exposing (..)

import Date as Date exposing (compare)

import Html exposing (Html)
import Html as H
import Svg as S
import Svg.Attributes as SA

import Msg exposing (Msg)
import Event exposing (..)
import Person exposing (Person)

import Graph exposing (Graph)
import Graph as Graph exposing (..)

import Render.Event as Event exposing (view)
import Render.Group as Group exposing (..)
import Render.Util exposing (Label, withoutSize, labelAs, groupBy)
import Render.Util as List exposing (groupBy)


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
        >> Items (labelAs "root")
        >> List.singleton
        >> Items (labelAs "foo")


group
    :  (a -> a -> Bool)
    -> (a -> Label)
    -> List a
    -> Group a
group compare toLabel items =
    items
        |> groupBy compare toLabel
        |> Group.form_


groupEvents : Axis -> List Event -> Group Event
groupEvents axis events =
    case axis of
        None -> emptyGroup
        All -> Items_ events
        ByDate filter ->
            events
                |> List.filter (.date >> filter)
                |> group Event.onSameYear (.date >> dateToLabel >> labelAs)
        ByPerson filter -> emptyGroup
        BySeason filter -> emptyGroup
        ByWorld filter -> emptyGroup

