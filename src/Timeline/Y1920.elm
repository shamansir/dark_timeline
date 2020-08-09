module Timeline.Y1920 exposing (y1920)


import Time exposing (..)
import Person exposing (..)
import Event exposing (..)

import Timeline.Def exposing (..)


{- 1920 -}

y1920 : Timeline
y1920 =

    [ Event
        Adam
        ( throughout 1920 )
        ( [ adamAtStartOf19xx
          , ( Hanno_Noah, Adult, from2040 )
          ]
        )
        ( sep 3 7 )
        "Adult-Noah arrives from 2040 and starts working for Adam"
    ]


