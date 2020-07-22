module Timeline exposing (..)


import Time exposing (..)
import World exposing (..)
import Person exposing (..)
import Event exposing (..)


type Timline = List Event


y1988 =
    [ Event
        Adam
        ( Exact ( 27, Jun, 1988 ) )
        [ ( Jonas, Adult, TraveledFrom ( Exact ( 27, Jun, 2020 ) ) Adam )
        , ( Magnus, Young, TraveledFrom ( Exact ( 27, Jun, 2020 ) ) Adam )
        , ( Franziska, Young, TraveledFrom ( Exact ( 27, Jun, 2020 ) ) Adam )
        , ( Bartocz, Young, TraveledFrom ( Exact ( 27, Jun, 2020 ) ) Adam )
        ]
        ( Season 3, Nothing )
        "Stranger-Jonas, and young Bartocz, Franziska and Bartocz arrive from 2020"
    ]
