module Person exposing (..)


type Stage
    = Child
    | Young
    | Adult
    | Old


type PersonId
    = Jonas
    | Martha
    | Bartocz
    | Franziska
    | Magnus


type alias Person = ( PersonId, Stage )
