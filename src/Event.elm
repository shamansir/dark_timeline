module Event exposing (..)

import Date as Date

import Time exposing (Month(..))

import Person exposing (..)


type World
    = Origin_1 -- car accident happens
    | Origin_2 -- car accident doesn't happen
    | Adam
    | Eva


type Episode = Episode Int


type Season = Season Int


type alias Year = Int


type alias Month = Time.Month


type alias Day = Int


type alias Participant = ( PersonId, Stage, Existence )


type alias Episodes = ( Season, Maybe Episode )


type alias Participants = List Participant


type Date
    = Exact ( Day, Month, Year )
    | Someday Month Year
    | Throughout Year


type Existence
    = Belongs
    | TraveledFrom Date World Episodes
    | TraveledFrom_ Date
    | TravelsTo Date World Episodes
    | TraveledFromUnknown
    | TraveledFromUnknown_ Year
    | TravelsToUnknown
    | TravelsToUnknown_ Year
    | Join Existence Existence
    | Missing
    | Wormhole
    | Birth
    | Death
    -- TODO: Alien (so marked traveled only at the moment of travel), Referenced
    -- TODO: With TimeMachine or Caves or Wormhole


type alias Event =
    { world : World
    , date : Date
    , participants : Participants
    -- , connections : List Event
    , episode : Episodes
    , description : String
    }


belongs : Participant -> Participant
belongs ( id, stage, _ ) =
    ( id, stage, Belongs )


throughout : Int -> Date
throughout = Throughout


someday : Month -> Int -> Date
someday = Someday


theyAll : Existence -> List ( PersonId, Stage ) -> Participants
theyAll = List.map << addExistense


theyAll_ : Existence -> Participants -> Participants
theyAll_ = List.map << changeExistense


changeExistense : Existence -> Participant -> Participant
changeExistense e = (\(p, s, _) -> (p, s, e))


addExistense : Existence -> ( PersonId, Stage ) -> Participant
addExistense e = (\(p, s) -> (p, s, e))


exact : Day -> Month -> Year -> Date
exact d m y = Exact ( d, m, y )


season : Int -> Episodes
season s = ( Season s, Nothing )


sep : Int -> Int -> Episodes
sep s e = ( Season s, Just <| Episode e )


changeAge : Stage -> Participant -> Participant
changeAge s = (\(p, _, e) -> (p, s, e))


compareByDate : (Date -> Date -> Bool) -> (Event -> Event -> Bool)
compareByDate f =
    \evtA evtB -> f evtA.date evtB.date


onSameDay : Date -> Date -> Bool
onSameDay dateA dateB =
    case ( dateA, dateB ) of
        ( Exact ( dA, mA, yA ), Exact ( dB, mB, yB ) ) ->
            (Date.fromCalendarDate yA mA dA |> Date.toRataDie)
            == (Date.fromCalendarDate yB mB dB |> Date.toRataDie)
        ( Someday mA yA, Someday mB yB ) -> mA == mB && yA == yB
        ( Throughout yA, Throughout yB ) -> yA == yB
        _ -> False


onSameMonth : Date -> Date -> Bool
onSameMonth dateA dateB =
    case ( dateA, dateB ) of
        ( Exact ( _, mA, yA ), Exact ( _, mB, yB ) ) ->
            (Date.fromCalendarDate yA mA 1 |> Date.toRataDie)
            == (Date.fromCalendarDate yB mB 1 |> Date.toRataDie)
        ( Someday mA yA, Someday mB yB ) -> mA == mB && yA == yB
        ( Throughout yA, Throughout yB ) -> yA == yB
        ( Exact ( _, mA, yA ), Someday mB yB) -> mA == mB && yA == yB
        ( Someday mA yA, Exact ( _, mB, yB ) ) -> mA == mB && yA == yB
        _ -> False


onSameYear : Date -> Date -> Bool
onSameYear dateA dateB =
    case ( dateA, dateB ) of
        ( Exact ( _, _, yA ), Exact ( _, _, yB ) ) ->
            (Date.fromCalendarDate yA Jan 1 |> Date.toRataDie)
            == (Date.fromCalendarDate yB Jan 1 |> Date.toRataDie)
        ( Someday _ yA, Someday _ yB ) -> yA == yB
        ( Throughout yA, Throughout yB ) -> yA == yB
        ( Exact ( _, _, yA ), Someday _ yB ) -> yA == yB
        ( Exact ( _, _, yA ), Throughout yB  ) -> yA == yB
        ( Someday _ yA, Exact ( _, _, yB ) ) -> yA == yB
        ( Someday _ yA, Throughout yB ) -> yA == yB
        ( Throughout yA, Exact ( _, _, yB ) ) -> yA == yB
        ( Throughout yA, Someday _ yB ) -> yA == yB


dateToLabel : Date -> String
dateToLabel date =
    case date of
        Exact ( d, m, y ) ->
            Date.format "ddd MMMM, yyyy" <| Date.fromCalendarDate y m d
        Someday m y ->
            Date.format "MMMM yyyy" <| Date.fromCalendarDate y m 1
        Throughout y ->
            Date.format "yyyy" <| Date.fromCalendarDate y Jan 1


yearToLabel : Date -> String
yearToLabel =
    getYear
    >> \y -> Date.format "yyyy" <| Date.fromCalendarDate y Jan 1


worldToLabel : World -> String
worldToLabel world =
    case world of
        Origin_1 -> "Origin 1"
        Origin_2 -> "Origin 2"
        Adam -> "Adam"
        Eva -> "Eva"


getYear : Date -> Year
getYear date =
    case date of
        Exact ( _, _, y ) -> y
        Someday _ y -> y
        Throughout y -> y


getMonth : Date -> Maybe Month
getMonth date =
    case date of
        Exact ( _, m, _ ) -> Just m
        Someday m _ -> Just m
        Throughout _ -> Nothing


getDay : Date -> Maybe Day
getDay date =
    case date of
        Exact ( d, _, _ ) -> Just d
        Someday _ _ -> Nothing
        Throughout _ -> Nothing


getPersons : Event -> List PersonId
getPersons event =
    event.participants
        |> List.map (\(personId, _, _) -> personId)
