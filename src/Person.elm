module Person exposing (..)


type Stage
    = Child
    | Teen
    | Adult
    | Old


type PersonId
    = Jonas
    | Martha
    | Martha_2
    | Martha_3
    | Bartocz
    | Franziska
    | Magnus
    | Gustav
    | Unknown


type alias Person = ( PersonId, Stage )
