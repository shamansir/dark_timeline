module Person exposing (..)


type Stage
    = Child
    | Teen
    | Adult
    | Old
    | Poodle


type PersonId
    = Unknown
    | Jonas
    | Martha
    | Martha_2
    | Martha_3
    | Bartosz
    | Franziska
    | Magnus
    | Gustav
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
    | Marek
    | Sonja
    | Charlotte
    | Mikkel
    | Ines
    | Boris_Aleksander
    | Regina
    | Mads


type alias Person = ( PersonId, Stage )
