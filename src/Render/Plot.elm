module Render.Plot exposing (..)


import Date as Date exposing (compare)
import Time exposing (Month(..))

import Html exposing (Html)
import Html as H
import Svg as S
import Svg.Attributes as SA

import Msg exposing (Msg)
import Event exposing (..)
import Person exposing (PersonId, Family, Person, uniqueName, codename)

import Graph exposing (Graph)
import Graph as Graph exposing (..)

import Render.Event as Event exposing (view)
import Render.Group as Group exposing (..)
import Render.Util exposing (Label, withoutSize, labelAs, groupBy)
import Render.Util as List exposing (groupBy, groupBy1, groupByEquals, groupByEquals1, participants)
import Render.Util as Tuple exposing (triplet, firstInTriplet, mapSecondToTuple)


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


toGroupX : XAxis -> Group Label (Group Label Event)
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


toGroupY : YAxis -> Group Label Event
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
                    |> arrangeByDate .date
                    |> YByDate
                    |> XAll
            ( All, ByPerson _ ) ->
                eventList
                    |> arrangeByPerson Event.getPersons
                    |> YByPerson
                    |> XAll
            ( All, BySeason _ ) ->
                eventList
                    |> arrangeBySeason .episode
                    |> YBySeason
                    |> XAll
            ( All, ByWorld _ ) ->
                eventList
                    |> arrangeByWorld .world
                    |> YByWorld
                    |> XAll
            ( ByDate _, All ) ->
                eventList
                    |> arrangeByDate .date
                    |> toDates YAll
                    |> XByDate
            ( ByDate _, ByDate filter ) ->
                plot
                    { x = All
                    , y = ByDate filter }
                    graph
            ( ByDate _, ByPerson _ ) ->
                eventList
                    |> arrangeByDate .date
                    |> toDates (YByPerson << arrangeByPerson Event.getPersons)
                    |> XByDate
            ( ByDate _, BySeason _ ) ->
                eventList
                    |> arrangeByDate .date
                    |> toDates (YBySeason << arrangeBySeason .episode)
                    |> XByDate
            ( ByDate _, ByWorld _ ) ->
                eventList
                    |> arrangeByDate .date
                    |> toDates (YByWorld << arrangeByWorld .world)
                    |> XByDate
            ( ByPerson _, All ) ->
                eventList
                    |> arrangeByPerson Event.getPersons
                    |> toPersons YAll
                    |> XByPerson
            ( ByPerson _, ByDate _ ) ->
                eventList
                    |> arrangeByPerson Event.getPersons
                    |> toPersons (YByDate << arrangeByDate .date)
                    |> XByPerson
            ( ByPerson _, ByPerson filter ) ->
                plot
                    { x = All
                    , y = ByPerson filter }
                    graph
            ( ByPerson _, BySeason _ ) ->
                eventList
                    |> arrangeByPerson Event.getPersons
                    |> toPersons (YBySeason << arrangeBySeason .episode)
                    |> XByPerson
            ( ByPerson _, ByWorld _ ) ->
                eventList
                    |> arrangeByPerson Event.getPersons
                    |> toPersons (YByWorld << arrangeByWorld .world)
                    |> XByPerson
            ( BySeason _, All ) ->
                eventList
                    |> arrangeBySeason .episode
                    |> toSeasons YAll
                    |> XBySeason
            ( BySeason _, ByDate _ ) ->
                eventList
                    |> arrangeBySeason .episode
                    |> toSeasons (YByDate << arrangeByDate .date)
                    |> XBySeason
            ( BySeason _, ByPerson _ ) ->
                eventList
                    |> arrangeBySeason .episode
                    |> toSeasons (YByPerson << arrangeByPerson Event.getPersons)
                    |> XBySeason
            ( BySeason _, BySeason filter ) ->
                plot
                    { x = All
                    , y = BySeason filter }
                    graph
            ( BySeason _, ByWorld _ ) ->
                eventList
                    |> arrangeBySeason .episode
                    |> toSeasons (YByWorld << arrangeByWorld .world)
                    |> XBySeason
            ( ByWorld _, All ) ->
                eventList
                    |> arrangeByWorld .world
                    |> toWorlds YAll
                    |> XByWorld
            ( ByWorld _, ByDate _ ) ->
                eventList
                    |> arrangeByWorld .world
                    |> toWorlds (YByDate << arrangeByDate .date)
                    |> XByWorld
            ( ByWorld _, ByPerson _ ) ->
                eventList
                    |> arrangeByWorld .world
                    |> toWorlds (YByPerson << arrangeByPerson Event.getPersons)
                    |> XByWorld
            ( ByWorld _, BySeason _ ) ->
                eventList
                    |> arrangeByWorld .world
                    |> toWorlds (YBySeason << arrangeBySeason .episode)
                    |> XByWorld
            ( ByWorld _, ByWorld filter ) ->
                plot
                    { x = All
                    , y = ByWorld filter }
                    graph


arrangeByWorld : (x -> World) -> List x -> ByWorld x
arrangeByWorld = List.groupByEquals1


arrangeByPerson : (x -> List PersonId) -> List x -> ByPerson x
arrangeByPerson extractPersons =
    List.participants codename extractPersons
        >> groupByEquals1 (Tuple.first >> Person.familyOf)


arrangeBySeason : (x -> ( Season, Maybe Episode )) -> List x -> BySeason x
arrangeBySeason extractEpisode =
    let
        extractSeason = extractEpisode >> Tuple.first
        equalEpisodes a b =
            case ( extractEpisode a, extractEpisode b ) of
                ( ( Season sA, Just (Episode eA) ), ( Season sB, Just (Episode eB) ) ) ->
                    sA == sB && eA == eB
                _ -> False
    in
        List.groupByEquals1
            extractSeason
                >> List.map
                    (Tuple.mapSecondToTuple
                        <| List.groupSplitBy
                            equalEpisodes
                            (extractEpisode >> Tuple.second)
                    )


arrangeByDate : (x -> Event.Date) -> List x -> ByDate x
arrangeByDate extractDate =
    let
        equalMonths a b = Event.onSameMonth (extractDate a) (extractDate b)
        equalDays a b = Event.onSameDay (extractDate a) (extractDate b)
    in
        List.groupByEquals1
            (extractDate >> getYear)
                >> List.map
                    (Tuple.mapSecondToTuple
                        <| List.groupSplitBy
                                equalMonths
                                (extractDate >> Event.getMonth)

                            >> Tuple.mapSecond
                                (List.map
                                    <| Tuple.mapSecondToTuple
                                    <| List.groupSplitBy
                                            equalDays
                                            (extractDate >> Event.getDay)
                                )
                    )


groupByDate : ByDate x -> Group Label x
groupByDate =
    Nest_ << List.map
        (\(year, noYearItems, months) ->

            Nest
                (labelAs <| String.fromInt year)
                <| Some_ noYearItems
                    ::  (months |> List.map
                            (\(month, noDayItems, days) ->

                                if not <| List.isEmpty noDayItems then

                                    Nest
                                        (labelAs
                                            <| Date.format "MMMM yyyy"
                                            <| Date.fromCalendarDate year month 1)
                                        <| Some_ noDayItems
                                            ::  (days |> List.map
                                                    (\(day, xs) ->
                                                        Some
                                                            (labelAs
                                                                <| Date.format "ddd MMMM, yyyy"
                                                                <| Date.fromCalendarDate year month day)
                                                            xs
                                                    )
                                                )

                                else

                                    Nest_
                                        <| Some_ noDayItems
                                            ::  (days |> List.map
                                                    (\(day, xs) ->
                                                        Some
                                                            (labelAs
                                                                <| Date.format "ddd MMMM, yyyy"
                                                                <| Date.fromCalendarDate year month day)
                                                            xs
                                                    )
                                                )

                            )
                        )

        )


groupByPerson : ByPerson x -> Group Label x
groupByPerson =
    Nest_ << List.map
        (\(family, persons) ->
            persons
                |> List.map (\(person, xs) -> Some (labelAs <| Person.uniqueName person) xs)
                |> Nest (labelAs <| Person.familyToLabel family)
        )


groupBySeason : BySeason x -> Group Label x
groupBySeason =
    Nest_ << List.map
        (\(Season season, noEpisodeItems, episodes) ->

            Nest
                (labelAs <| "Season " ++ String.fromInt season)
                <| Some_ noEpisodeItems
                    ::  (episodes |> List.map
                            (\(Episode episode, xs) ->
                                Some
                                    (labelAs <| "Episode " ++ String.fromInt episode)
                                    xs
                            )
                        )

        )


groupByWorld : ByWorld x -> Group Label x
groupByWorld = Group.form_ >> Group.mapKey (worldToLabel >> labelAs)
