module Render.Plot exposing (..)


import Date as Date exposing (compare)

import Html exposing (Html)
import Html as H
import Svg as S
import Svg.Attributes as SA

import Msg exposing (Msg)
import Event exposing (..)
import Person exposing (PersonId, Family, Person)

import Graph exposing (Graph)
import Graph as Graph exposing (..)

import Render.Event as Event exposing (view)
import Render.Group as Group exposing (..)
import Render.Util exposing (Label, withoutSize, labelAs, groupBy)
import Render.Util as List exposing (groupBy)


type alias ByPerson x
    = List (Family, List (PersonId, List x))


type alias ByDate x
    = List (Event.Year, List x, List (Event.Month, List x, List (Event.Day, List x)))


type alias BySeason x
    = List (Season, List (Episode, List x))


type alias ByWorld x
    = List (World, List x)


type Axis
    = None
    | All
    | ByDate (Date -> Bool)
    | ByPerson (Person -> Bool)
    | BySeason ((Season, Maybe Episode) -> Bool)
    | ByWorld (World -> Bool)


type YAxis
    = YNone
    | YAll (List Event)
    | YByDate (ByDate Event)
    | YByPerson (ByPerson Event)
    | YBySeason (BySeason Event)
    | YByWorld (ByWorld Event)


type XAxis
    = XNone
    | XByDate (ByDate YAxis)
    | XByPerson (ByPerson YAxis)
    | XBySeason (BySeason YAxis)
    | XByWorld (ByWorld YAxis)


type alias Plot = XAxis


type alias Spec = { x : Axis, y : Axis }


noFilter : a -> Bool
noFilter = always True


view : Spec -> Graph Event () -> Html Msg
-- view = viewAsGrid { x = None, y = All }
view spec =
    plot spec
        >> viewPlot


viewPlot : Plot -> Html Msg
viewPlot =
    toGroupX
        >> Group.view Horizontal
            (Group.view Vertical Event.view)
        >> (\({ width, height }, v) ->
             S.svg
                [ SA.width <| String.fromFloat width
                , SA.height<| String.fromFloat height
                ]
                [ v ])


toEventList : Graph Event () -> List Event
toEventList =
    Graph.dfs (Graph.onDiscovery (::)) []
        >> List.reverse
        >> List.map (.label << .node)


toGroupX : XAxis -> Group (Group Event)
toGroupX xAxis =
    Group.map toGroupY
        <| case xAxis of
            XNone ->
                Group.None
            XByDate yAxis ->
                groupByDate yAxis
            XByPerson yAxis ->
                groupByPerson yAxis
            XBySeason yAxis ->
                groupBySeason yAxis
            XByWorld yAxis ->
                groupByWorld yAxis


toGroupY : YAxis -> Group Event
toGroupY yAxis =
    case yAxis of
        YNone ->
            Group.None
        YAll events ->
            Group.Some_ events
        YByDate events ->
            groupByDate events
        YByPerson events ->
            groupByPerson events
        YBySeason events ->
            groupBySeason events
        YByWorld events ->
            groupByWorld events


plot : Spec -> Graph Event () -> Plot
plot { x, y } graph =
    let
        eventList = toEventList graph
    in
        XNone


groupByDate : ByDate x -> Group x
groupByDate _ = Group.None


groupByPerson : ByPerson x -> Group x
groupByPerson _ = Group.None


groupBySeason : BySeason x -> Group x
groupBySeason _ = Group.None


groupByWorld : ByWorld x -> Group x
groupByWorld _ = Group.None


{-
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
        All -> Some_ events
        ByDate filter ->
            events
                |> List.filter (.date >> filter)
                |> group (Event.compareByDate Event.onSameYear) (.date >> yearToLabel >> labelAs)
                --|> group (Event.compareByDate Event.onSameDay) (.date >> dateToLabel >> labelAs)
        ByPerson filter -> emptyGroup
        BySeason filter -> emptyGroup
        ByWorld filter -> emptyGroup
-}
