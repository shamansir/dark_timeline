module Render.Plot exposing (..)


import Date as Date exposing (compare)
import Time exposing (Month(..))

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
    = List (Season, List x, List (Episode, List x))


type alias ByWorld x
    = List (World, List x)


-- type Transfer_ x
--     = ByDate_ (ByDate x)
--     | ByPerson_ (ByDate x)

-- map : (a -> b) -> Transfer a -> Transfer b



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
    | XAll YAxis
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
            XAll yAxis ->
                Some_ <| List.singleton yAxis
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
        loadEventDate evt = Exact ( 1, Jan, 1888 )
        loadEventPersons evt = []
        loadEventWorld evt = Adam
        loadEventSeason evt = ( Season 1, Nothing )
        toWorlds : (List Event -> YAxis) -> ByWorld Event -> ByWorld YAxis
        toWorlds f
            = List.map
                <| Tuple.mapSecond
                    <| List.singleton << f
        toPersons : (List Event -> YAxis) -> ByPerson Event -> ByPerson YAxis
        toPersons f
            = List.map
                <| Tuple.mapSecond
                    <| List.map
                        <| Tuple.mapSecond
                            <| List.singleton << f
        toSeasons : (List Event -> YAxis) -> BySeason Event -> BySeason YAxis
        toSeasons f
            = List.map
                (\(season, seasonItems, episodes) ->
                    ( season
                    , List.singleton <| f seasonItems
                    , episodes
                        |> List.map (Tuple.mapSecond <| List.singleton << f)
                    )
                )
        toDates : (List Event -> YAxis) -> ByDate Event -> ByDate YAxis
        toDates f
            = List.map
                (\(year, yearItems, months) ->
                    ( year
                    , List.singleton <| f yearItems
                    , months |> List.map
                        (\(month, monthItems, dates) ->
                            ( month
                            , List.singleton <| f monthItems
                            , dates
                                |> List.map (Tuple.mapSecond <| List.singleton << f))
                        )
                    )
                )
    in
        case ( x, y ) of
            ( None, _ ) -> XNone
            ( _, None ) -> XNone
            ( All, All ) ->
                eventList
                    |> YAll
                    |> XAll
            ( All, ByDate _ ) ->
                eventList
                    |> arrangeByDate loadEventDate
                    |> YByDate
                    |> XAll
            ( All, ByPerson _ ) ->
                eventList
                    |> arrangeByPerson loadEventPersons
                    |> YByPerson
                    |> XAll
            ( All, BySeason _ ) ->
                eventList
                    |> arrangeBySeason loadEventSeason
                    |> YBySeason
                    |> XAll
            ( All, ByWorld _ ) ->
                eventList
                    |> arrangeByWorld loadEventWorld
                    |> YByWorld
                    |> XAll
            ( ByDate _, All ) ->
                eventList
                    |> arrangeByDate loadEventDate
                    |> toDates YAll
                    |> XByDate
            ( ByDate _, ByDate filter ) ->
                plot
                    { x = All
                    , y = ByDate filter }
                    graph
            ( ByDate _, ByPerson _ ) ->
                eventList
                    |> arrangeByDate loadEventDate
                    |> toDates (YByPerson << arrangeByPerson loadEventPersons)
                    |> XByDate
            ( ByDate _, BySeason _ ) ->
                eventList
                    |> arrangeByDate loadEventDate
                    |> toDates (YBySeason << arrangeBySeason loadEventSeason)
                    |> XByDate
            ( ByDate _, ByWorld _ ) ->
                eventList
                    |> arrangeByDate loadEventDate
                    |> toDates (YByWorld << arrangeByWorld loadEventWorld)
                    |> XByDate
            ( ByPerson _, All ) ->
                eventList
                    |> arrangeByPerson loadEventPersons
                    |> toPersons YAll
                    |> XByPerson
            ( ByPerson _, ByDate _ ) ->
                eventList
                    |> arrangeByPerson loadEventPersons
                    |> toPersons (YByDate << arrangeByDate loadEventDate)
                    |> XByPerson
            ( ByPerson _, ByPerson filter ) ->
                plot
                    { x = All
                    , y = ByPerson filter }
                    graph
            ( ByPerson _, BySeason _ ) ->
                eventList
                    |> arrangeByPerson loadEventPersons
                    |> toPersons (YBySeason << arrangeBySeason loadEventSeason)
                    |> XByPerson
            ( ByPerson _, ByWorld _ ) ->
                eventList
                    |> arrangeByPerson loadEventPersons
                    |> toPersons (YByWorld << arrangeByWorld loadEventWorld)
                    |> XByPerson
            ( BySeason _, All ) ->
                eventList
                    |> arrangeBySeason loadEventSeason
                    |> toSeasons YAll
                    |> XBySeason
            ( BySeason _, ByDate _ ) ->
                eventList
                    |> arrangeBySeason loadEventSeason
                    |> toSeasons (YByDate << arrangeByDate loadEventDate)
                    |> XBySeason
            ( BySeason _, ByPerson _ ) ->
                eventList
                    |> arrangeBySeason loadEventSeason
                    |> toSeasons (YByPerson << arrangeByPerson loadEventPersons)
                    |> XBySeason
            ( BySeason _, BySeason filter ) ->
                plot
                    { x = All
                    , y = BySeason filter }
                    graph
            ( BySeason _, ByWorld _ ) ->
                eventList
                    |> arrangeBySeason loadEventSeason
                    |> toSeasons (YByWorld << arrangeByWorld loadEventWorld)
                    |> XBySeason
            ( ByWorld _, All ) ->
                eventList
                    |> arrangeByWorld loadEventWorld
                    |> toWorlds YAll
                    |> XByWorld
            ( ByWorld _, ByDate _ ) ->
                eventList
                    |> arrangeByWorld loadEventWorld
                    |> toWorlds (YByDate << arrangeByDate loadEventDate)
                    |> XByWorld
            ( ByWorld _, ByPerson _ ) ->
                eventList
                    |> arrangeByWorld loadEventWorld
                    |> toWorlds (YByPerson << arrangeByPerson loadEventPersons)
                    |> XByWorld
            ( ByWorld _, BySeason _ ) ->
                eventList
                    |> arrangeByWorld loadEventWorld
                    |> toWorlds (YBySeason << arrangeBySeason loadEventSeason)
                    |> XByWorld
            ( ByWorld _, ByWorld filter ) ->
                plot
                    { x = All
                    , y = ByWorld filter }
                    graph


arrangeByDate : (x -> Event.Date) -> List x -> ByDate x
arrangeByDate extractDate source = []


arrangeByPerson : (x -> List PersonId) -> List x -> ByPerson x
arrangeByPerson extractPerson source = []


arrangeBySeason : (x -> ( Season, Maybe Episode )) -> List x -> BySeason x
arrangeBySeason extractSeason source = []


arrangeByWorld : (x -> World) -> List x -> ByWorld x
arrangeByWorld extractWorld source = []


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
