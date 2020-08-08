module Timeline exposing (..)


import Time exposing (..)
import World exposing (..)
import Person exposing (..)
import Event exposing (..)


type alias Timeline = List Event



strangerTeamFrom2020 : Participants
strangerTeamFrom2020 =
    [ ( Jonas, Adult, TraveledFrom ( Exact ( 27, Jun, 2020 ) ) Adam )
    , ( Magnus, Young, TraveledFrom ( Exact ( 27, Jun, 2020 ) ) Adam )
    , ( Franziska, Young, TraveledFrom ( Exact ( 27, Jun, 2020 ) ) Adam )
    , ( Bartocz, Young, TraveledFrom ( Exact ( 27, Jun, 2020 ) ) Adam )
    ]


y1988 : Timeline
y1988 =
    [ Event
        Adam
        ( Exact ( 27, Jun, 1988 ) )
        strangerTeamFrom2020
        ( Season 3, Nothing )
        "Stranger-Jonas, and young Bartocz, Franziska, and Magnus arrive from 2020"
    , Event
        Adam
        ( Exact ( 27, Jun, 1988 ) )
        ((strangerTeamFrom2020 |> List.map belongs) ++
            [ ( Gustav, Old, Belongs ) ])
        ( Season 3, Nothing )
        "The team of Stranger-Jonas meet Gustav Tannhaus and become new Sic Mundus group"
    ]
