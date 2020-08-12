module Timeline.Y2023 exposing (y2023)


import Time exposing (..)
import Person exposing (..)
import Event exposing (..)

import Timeline.Def exposing (..)


{- 2023 -}

y2023 : Timeline
y2023 =

    [ Event
        Adam
        ( throughout 2023 )
        ( [ ( Jonas, Teen, Belongs )
          , ( Claudia, Adult, Belongs )
          ]
        )
        ( sep 3 7 )
        "Jonas and Claudia keep working on the machine, but Jonas tires of their failure"

    , Event
        Adam
        ( throughout 2023 )
        ( [ ( Jonas, Teen, Belongs )
          , ( Hanno_Noah, Teen, Belongs )
          ]
        )
        ( sep 3 2 )
        "Jonas attempts to hang himself, but young-Noah comes in and saves him"

    , Event
        Adam
        ( throughout 2023 )
        ( [ ( Jonas, Teen, Belongs )
          , ( Claudia, Adult, Belongs )
          , ( Hanno_Noah, Teen, Belongs )
          ]
        )
        ( sep 3 7 )
        "Young-Noah starts working with Claudia and Jonas to try and create the portal"
    ]


