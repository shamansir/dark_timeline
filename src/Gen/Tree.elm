module Gen.Tree exposing (..)


import Person exposing (..)
import Event exposing (World(..))
import Gen.Def exposing (..)


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
