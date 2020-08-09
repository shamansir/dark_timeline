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
    | Heinrich
    | Leopold
    | Killian
    | Jurgen
    | Ulla
    | Benjamin
    | Peter
    | Benni
    | Torben


type alias Person = ( PersonId, Stage )


type Name
    = Nickname String
    | Full String String


names : PersonId -> List Name
names person =
    case person of
        Unknown -> [ Nickname "Unknown" ]
        Jonas -> [ Full "Jonas" "Kahnwald", Nickname "Adam" ]
        Martha -> [ Full "Martha" "Nielsen" ]
        Martha_2 -> [ Full "Martha" "Nielsen", Nickname "Eve" ]
        Martha_3 -> [ Full "Martha" "Nielsen", Nickname "Eve" ]
        Benjamin -> [ Full "Benjamin" "Wöller", Full "Bernandette" "Wöller" ]
        Mikkel -> [ Full "Michael" "Kahnwald", Full "Mikkel" "Nielsen" ]
        Boris_Aleksander ->
            [ Full "Boris" "Niewald"
            , Full "Alexander" "Köhler"
            , Full "Alexander" "Tiedemann"
            ]
        Hanno_Noah ->
            [ Full "Hanno" "Tauber"
            , Nickname "Noah"
            ]
        _ -> []
