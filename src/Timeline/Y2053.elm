module Timeline.Y2053 exposing (y2053)


import Time exposing (..)
import Person exposing (..)
import Event exposing (..)

import Timeline.Def exposing (..)


{- 2053 -}

y2053 : Timeline
y2053 =

    {- Feb -}

    [ Event
        Adam
        ( someday Feb 2053 )
        ( [ ( Elisabeth, Adult, Belongs )
          , ( Jonas, Teen, TraveledFromUnknown )
          ]
        )
        ( sep 2 2 )
        "Adult-Elisabeth catches Jonas breaking into the power plant and almost hangs him"

    , Event
        Adam
        ( someday Feb 2053 )
        ( [ ( Silja, Teen, TraveledFromUnknown_ 1911 )
          , ( Jonas, Teen, TravelsToUnknown_ 1921 )
          ]
        )
        ( sep 2 2 )
        "Silja helps Jonas back into the power plant where he enters the portal and travels back to 1921"


    , Event
        Adam
        ( someday Feb 2053 )
        ( [ ( Elisabeth, Adult, Wormhole )
          ]
        )
        ( sep 2 8 )
        "Adult-Elisabeth is inside the power plant when the wormhole opens again"

    , Event
        Adam
        ( someday Feb 2053 )
        ( [ ( Charlotte, Adult, Join Wormhole (TraveledFromUnknown_ 2020) )
          , ( Elisabeth, Adult, TraveledFromUnknown )
          ]
        )
        ( sep 2 8 )
        "Charlotte arrives from 2020 after touching Elisabeth's hand through the wormhole"

    {- Sep 22 -}

    , Event
        Adam
        ( exact 22 Sep 2053 )
        ( [ ( Jonas, Old, TraveledFromUnknown )
          ]
        )
        ( sep 3 3 )
        "Adam relocates the Sic Mundus headquarters to the power plant"

    , Event
        Adam
        ( exact 22 Sep 2053 )
        ( [ ( Martha_2, Teen, TraveledFromUnknown_ 1888 )
          ]
        )
        ( sep 3 4 )
        "Martha-2 returns from 1888"

    , Event
        Adam
        ( exact 22 Sep 2053 )
        ( [ ( Jonas, Old, TraveledFromUnknown )
          , ( Martha_2, Teen, TraveledFromUnknown_ 1888 )
          , ( Unknown, Child, Birth )
          ]
        )
        ( sep 3 4 )
        "Adam tells Martha-2 that she's pregnant and that the Unknown child is the origin. He imprisons her"

    {- Sep 23 -}

    , Event
        Adam
        ( exact 23 Sep 2053 )
        ( [ ( Charlotte, Adult, Belongs )
          , ( Elisabeth, Adult, Belongs )
          , ( Charlotte, Child, TravelsToUnknown )
          ]
        )
        ( sep 3 5 )
        "Adult-Charlotte and adult-Elisabeth travel back to 2041 to steal baby-Charlotte"

    {- Sep 24 -}

    , Event
        Adam
        ( exact 24 Sep 2053 )
        ( [ ( Magnus, Adult, Join TraveledFromUnknown TravelsToUnknown )
          , ( Franziska, Adult, Join TraveledFromUnknown TravelsToUnknown )
          , ( Martha_2, Teen, TravelsToUnknown )
          ]
        )
        ( sep 3 6 )
        "Adult-Magnus and adult-Franziska travel to world two to intercept Martha-2 on the day of the apocalypse"

    , Event
        Adam
        ( exact 24 Sep 2053 )
        ( [ ( Jonas, Old, TraveledFromUnknown )
          , ( Martha_2, Teen, Death )
          ]
        )
        ( sep 3 6 )
        "Adam kills Martha-2"

    , Event
        Adam
        ( exact 24 Sep 2053 )
        ( [ ( Jonas, Old, TraveledFromUnknown )
          , ( Claudia_3, Old, TraveledFromUnknown )
          ]
        )
        ( sep 3 8 )
        "Old-Claudia-3 reveals the existence of the Origin World to Adam"

    , Event
        Adam
        ( exact 24 Sep 2053 )
        ( [ ( Jonas, Old, to27June2019 )
          , ( Jonas, Teen, to27June2019 )
          , ( Martha_2, Teen, to27June2019 )
          ]
        )
        ( sep 3 8 )
        "Adam travels back to 27 June 2019 to create third reality where Jonas takes Martha-2 to Origin World and saves Tannhaus' family"

    ]


