module Event exposing (..)


import Time exposing (Month)

import World exposing (..)
import Person exposing (..)


type Episode = Episode Int


type Season = Season Int


type alias Year = Int


type alias Day = Int


type alias Participant = ( PersonId, Stage, Existence )


type alias Participants = List Participant


type Date
    = Exact ( Day, Month, Year )
    | Someday Month Year
    | Throughout Year


type Existence
    = Belongs
    | TraveledFrom Date World


type alias Event =
    { world : World
    , date : Date
    , participants : Participants
    -- , connections : List Event
    , episode : ( Season, Maybe Episode )
    , description : String
    }


belongs : Participant -> Participant
belongs ( id, stage, exist ) =
    ( id, stage, Belongs )
