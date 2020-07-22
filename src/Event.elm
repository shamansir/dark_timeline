module Event exposing (..)


import Time exposing (Month)

import World exposing (..)
import Person exposing (..)


type Episode = Episode Int


type Season = Season Int


type alias Year = Int


type alias Day = Int


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
    , participants : List ( PersonId, Stage, Existence )
    -- , connections : List Event
    , episode : ( Season, Maybe Episode )
    , description : String
    }
