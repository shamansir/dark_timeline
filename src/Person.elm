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
    | Claudia
    | Helge
    | Ulrich
    | Yasin
    | Erik
    | Egon
    | Tronte
    | Doris
    | Gretchen
    | Bernd
    | HGTannhaus
    | Katharina
    | Helene
    | FObendorf -- Fran? Obendorf


type alias Person = ( PersonId, Stage )
