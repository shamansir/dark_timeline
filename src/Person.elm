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
    | Bartosz_2
    | Franziska
    | Magnus
    | Gustav
    | Silja
    | Hanno_Noah
    | Agnes
    | Hannah
    | Claudia
    | Claudia_2
    | Claudia_3
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
    | Obendorf -- Fran? Obendorf
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
    | Clausen
    | Elisabeth
    -- below were not met before
    | Bernandette
    | Daniel
    | Jana


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


knownStages : PersonId -> List Stage
knownStages person =
    case person of
        Agnes -> [ Teen, Adult ]
        Bartosz -> [ Teen, Adult ]
        Boris_Aleksander -> [ Teen, Adult ]
        Bernandette -> [ Adult ]
        Bernd -> [ Adult, Old ]
        Charlotte -> [ Teen, Adult ]
        Claudia -> [ Teen, Adult, Old ]
        Clausen -> [ Teen, Adult ]
        Daniel -> [ Adult ]
        Doris -> [ Adult ]
        Egon -> [ Adult, Old ]
        Elisabeth -> [ Teen, Adult ]
        Franziska -> [ Teen, Old ]
        Gretchen -> [ Adult ] -- ??
        Gustav -> [ Child, Old ]
        Hannah -> [ Teen, Adult ]
        Hanno_Noah -> [ Child, Teen, Adult ]
        Heinrich -> [ Adult ]
        Helge -> [ Child, Adult, Old ]
        Ines -> [ Teen, Adult, Old ]
        Jana -> [ Teen, Adult, Old ]
        Jonas -> [ Teen, Adult, Old ]
        Katharina -> [ Teen, Adult ]
        Mads -> [ Child ]
        Magnus -> [ Teen, Adult ]
        Martha -> [ Teen, Adult, Old ]
        Mikkel -> [ Child, Adult ]
        Peter -> [ Teen, Adult ]
        Regina -> [ Teen, Adult ]
        Silja -> [ Child, Teen, Adult ]
        HGTannhaus -> [ Adult, Old ]
        Torben -> [ Adult ]
        Tronte -> [ Teen, Old, Adult ]
        Ulrich -> [ Teen, Old, Adult ]
        Unknown -> [ Teen, Old, Adult ]

        Martha_2 -> knownStages Martha
        Martha_3 -> knownStages Martha
        Bartosz_2 -> knownStages Bartosz
        Claudia_2 -> knownStages Claudia
        Claudia_3 -> knownStages Claudia

        _ -> []


uniqueId : PersonId -> Stage -> String
uniqueId person stage =
    codename person ++ "/" ++ stageToString stage


isKnownStage : PersonId -> Stage -> Bool
isKnownStage person stage =
    List.member stage <| knownStages person


picture : PersonId -> Stage -> Maybe String
picture person stage =

    ( if isKnownStage person stage
        then Just <| codename person ++ "/" ++ stageToString stage
        else Nothing
    ) |> Maybe.map (\fileName -> "./assets/" ++ fileName ++ "_c.png")


codename : PersonId -> String
codename person =
    case person of
        Agnes -> "agnes"
        Bartosz -> "bartosz"
        Bartosz_2 -> codename Bartosz
        Boris_Aleksander -> "aleksander"
        Benjamin -> "benjamin"
        Benni -> "benni"
        Bernandette -> "bernandette"
        Bernd -> "bernd"
        Charlotte -> "charlotte"
        Claudia -> "claudia"
        Claudia_2 -> codename Claudia
        Claudia_3 -> codename Claudia
        Clausen -> "clausen"
        Daniel -> "daniel"
        Doris -> "doris"
        Egon -> "egon"
        Elisabeth -> "elisabeth"
        Erik -> "erik"
        Franziska -> "franziska"
        Gretchen -> "greta" -- ??
        Gustav -> "gustav"
        Hannah -> "hannah"
        Hanno_Noah -> "hanno"
        Heinrich -> "heinrich"
        Helene -> "helene"
        Helge -> "helge"
        HGTannhaus -> "hg_tannhaus"
        Ines -> "ines"
        Jana -> "jana"
        Jonas -> "jonas"
        Jurgen -> "jurgen"
        Katharina -> "katharina"
        Killian -> "killian"
        Leopold -> "leopold"
        Mads -> "mads"
        Magnus -> "magnus"
        Marek -> "marek"
        Martha -> "martha"
        Martha_2 -> codename Martha
        Martha_3 -> codename Martha
        Mikkel -> "mikkel"
        Obendorf -> "obendorf"
        Peter -> "peter"
        Regina -> "regina"
        Silja -> "silja"
        Sonja -> "sonja"
        Torben -> "torben"
        Tronte -> "tronte"
        Ulla -> "ulla"
        Ulrich -> "ulrich"
        Unknown -> "unknown"
        Yasin -> "yasin"


stageToString : Stage -> String
stageToString stage =
    case stage of
        Child -> "child"
        Teen -> "teen"
        Adult -> "adult"
        Old -> "old"
        Poodle -> "poodle"
