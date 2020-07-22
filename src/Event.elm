module Event exposing (..)


import World exposing (..)
import Person exposing (..)


type Episode = Episode Int


type Season = Season Int


type alias Date = ( Int, Int, Int )


type Existence
    = Belongs
    | TraveledFrom Date


type alias Event =
    { world : World
    , date : Date
    , participants : List ( PersonId, Stage, Existence )
    , description : String
    , episode : ( Season, Episode )
    }
