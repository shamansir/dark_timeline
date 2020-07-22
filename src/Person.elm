module Person exposing (..)


type Stage
    = Young
    | Adult
    | Old


type PersonId
    = JonasKahnwald
    | MarthaNielsen


type alias Person = ( PersonId, Stage )
