module Event exposing (..)


import Time exposing (Month)

import World exposing (..)
import Person exposing (..)


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
    | TravelsTo Date World Episodes
    | TraveledFromUnknown


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
