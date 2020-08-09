module Timeline.Y1974 exposing (y1974)


import Time exposing (..)
import Person exposing (..)
import Event exposing (..)

import Timeline.Def exposing (..)


{- 1974 -}

y1974 : Timeline
y1974 =

    [ Event
        Origin_1
        ( throughout 1974 )
        ( [ ( HGTannhaus, Adult, Belongs )
          ]
        )
        ( sep 3 7 )
        "In first reality, H.G.Tannhaus begins building Time Machine to try to resurrect his family"
    ]


