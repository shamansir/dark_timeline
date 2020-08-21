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


onSameDay : Event -> Event -> Bool
onSameDay eventA eventB =
    case ( eventA.date, eventB.date ) of
        ( Exact ( dA, mA, yA ), Exact ( dB, mB, yB ) ) ->
            (Date.fromCalendarDate yA mA dA |> Date.toRataDie)
            == (Date.fromCalendarDate yA mA dA |> Date.toRataDie)
        ( Someday mA yA, Someday mB yB ) -> mA == mB && yA == yB
        ( Throughout yA, Throughout yB ) -> yA == yB
        _ -> False


onSameMonth : Event -> Event -> Bool
onSameMonth eventA eventB =
    case ( eventA.date, eventB.date ) of
        ( Exact ( _, mA, yA ), Exact ( _, mB, yB ) ) ->
            (Date.fromCalendarDate 1 mA yA |> Date.toRataDie)
            == (Date.fromCalendarDate 1 mA yA |> Date.toRataDie)
        ( Someday mA yA, Someday mB yB ) -> mA == mB && yA == yB
        ( Throughout yA, Throughout yB ) -> yA == yB
        _ -> False


onSameYear : Event -> Event -> Bool
onSameYear eventA eventB =
    case ( eventA.date, eventB.date ) of
        ( Exact ( _, _, yA ), Exact ( _, _, yB ) ) ->
            (Date.fromCalendarDate 1 Jan yA |> Date.toRataDie)
            == (Date.fromCalendarDate 1 Jan yA |> Date.toRataDie)
        ( Someday _ yA, Someday _ yB ) -> yA == yB
        ( Throughout yA, Throughout yB ) -> yA == yB
        _ -> False


dateToLabel : Date -> String
dateToLabel date =
    case date of
        Exact ( d, m, y ) ->
            Date.format "ddd MMMM, yyyy" <| Date.fromCalendarDate y m d
        Someday m y ->
            Date.format "MMMM yyyy" <| Date.fromCalendarDate y m 1
        Throughout y ->
            Date.format "yyyy" <| Date.fromCalendarDate y Jan 1




