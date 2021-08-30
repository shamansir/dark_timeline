module Gen.Tree exposing (..)


import Person exposing (..)
import Event exposing (World(..))
import Gen.Def exposing (..)


-- family


adam : WorldRelationships
adam =
    ( Adam
    ,
        [ fact Bernd fatherTo Helge
        , fact Gretchen motherTo Helge
        --, fact Bernd affectedTo Gretchen

        , fact Helge fatherTo Peter

        --, fact Peter affectedTo Charlotte
        , fact Charlotte motherTo Elisabeth
        , fact Charlotte motherTo Franziska
        , fact Peter fatherTo Elisabeth
        , fact Peter fatherTo Franziska

        , fact HGTannhaus adoptFatherTo Charlotte

        , fact Elisabeth motherTo Charlotte
        , fact Hanno_Noah fatherTo Charlotte
        --, fact Elisabeth affectedTo Hanno_Noah

        , fact Doris motherTo Claudia
        , fact Egon fatherTo Claudia
        --, fact Doris affectedTo Egon

        , fact Claudia motherTo Regina
        , fact Regina motherTo Bartosz
        , fact Boris_Aleksander fatherTo Bartosz
        --, fact Boris_Aleksander affectedTo Regina

        , fact Bartosz fatherTo Hanno_Noah
        , fact Bartosz fatherTo Agnes
        , fact Silja motherTo Hanno_Noah
        , fact Silja motherTo Agnes
        --, fact Bartosz affectedTo Silja

        , fact Hannah motherTo Silja
        , fact Egon fatherTo Silja
        --, fact Hannah affectedTo Egon

        , fact Hannah motherTo Jonas
        , fact Mikkel fatherTo Jonas
        --, fact Hannah affectedTo Mikkel

        , fact Daniel fatherTo Ines

        , fact Ines adoptMotherTo Mikkel

        , fact Ulrich fatherTo Mikkel
        , fact Ulrich fatherTo Martha
        , fact Ulrich fatherTo Magnus
        , fact Katharina motherTo Mikkel
        , fact Katharina motherTo Martha
        , fact Katharina motherTo Magnus
        --, fact Ulrich affectedTo Katharina

        , fact Helene motherTo Katharina

        , fact Agnes motherTo Tronte
        , fact Unknown fatherTo Tronte

        , fact Jana motherTo Mads
        , fact Tronte fatherTo Mads
        , fact Jana motherTo Ulrich
        , fact Tronte fatherTo Ulrich
        --, fact Jana affectedTo Tronte

        , fact Jonas fatherTo Unknown

        ]
    )


eva : WorldRelationships
eva =
    ( Eva
    ,
        [ fact Bernd fatherTo Helge
        , fact Gretchen motherTo Helge
        --, fact Bernd affectedTo Gretchen

        , fact Helge fatherTo Peter

        --, fact Peter affectedTo Charlotte
        , fact Charlotte motherTo Elisabeth
        , fact Charlotte motherTo Franziska
        , fact Peter fatherTo Elisabeth
        , fact Peter fatherTo Franziska

        , fact HGTannhaus adoptFatherTo Charlotte

        , fact Elisabeth motherTo Charlotte
        , fact Hanno_Noah fatherTo Charlotte
        --, fact Elisabeth affectedTo Hanno_Noah

        , fact Doris motherTo Claudia
        , fact Egon fatherTo Claudia
        --, fact Doris affectedTo Egon

        , fact Claudia motherTo Regina
        , fact Regina motherTo Bartosz
        , fact Boris_Aleksander fatherTo Bartosz
        --, fact Boris_Aleksander affectedTo Regina

        , fact Bartosz fatherTo Hanno_Noah
        , fact Bartosz fatherTo Agnes
        , fact Silja motherTo Hanno_Noah
        , fact Silja motherTo Agnes
        --, fact Bartosz affectedTo Silja

        , fact Hannah motherTo Silja
        , fact Egon fatherTo Silja
        --, fact Hannah affectedTo Egon

        , fact Ulrich fatherTo Mikkel
        , fact Ulrich fatherTo Martha
        , fact Ulrich fatherTo Magnus
        , fact Katharina motherTo Mikkel
        , fact Katharina motherTo Martha
        , fact Katharina motherTo Magnus
        --, fact Ulrich affectedTo Katharina

        , fact Helene motherTo Katharina

        , fact Agnes motherTo Tronte
        , fact Unknown fatherTo Tronte

        , fact Jana motherTo Mads
        , fact Tronte fatherTo Mads
        , fact Jana motherTo Ulrich
        , fact Tronte fatherTo Ulrich
        --, fact Jana affectedTo Tronte

        , fact Martha motherTo Unknown

        ]
    )



{-
tannhaus : List Relationship
tannhaus =
    tannhausWithoutCharlotte ++
        [ fatherIs Marek HGTannhaus
        , childOf Charlotte ( Marek, Sonja )
        ]


tannhausWithoutCharlotte : List Relationship
tannhausWithoutCharlotte =
    [ fatherIs Gustav Heinrich
    , fatherIs Leopold Gustav
    , fatherIs HGTannhaus Leopold
    ]


obendorf : List Relationship
obendorf =
    [ family [ Erik, Killian ] ( Jurgen, Ulla )
    ]


tree : Tree
tree
    =  (tannhaus |> allIn Origin_1)
    ++ (tannhaus |> allIn Origin_2)
    ++ (tannhausWithoutCharlotte |> allIn Adam)
    ++ (tannhausWithoutCharlotte |> allIn Eva)
    ++ (obendorf |> allIn Adam)
    ++ (obendorf |> allIn Eva)

-}