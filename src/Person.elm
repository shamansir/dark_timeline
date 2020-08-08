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
    | Bartosz
    | Franziska
    | Magnus
    | Gustav
    | Unknown
    | Silja
    | Hanno_Noah
    | Agnes
    | Hannah


type alias Person = ( PersonId, Stage )
