module Timeline.Y1890 exposing (y1890)


import Time exposing (..)
import World exposing (..)
import Person exposing (..)
import Event exposing (..)

import Timeline.Helpers exposing (..)


{- 1890 -}

y1890 : Timeline
y1890 =
    [ Event
        Adam
        ( throughout 1890 )
        ( [ strangerJonasFrom2020
          ]
        )
        ( sep 3 7 )
        "Stranger-Jonas continues working on portal"
    , Event
        Adam
        ( throughout 1890 )
        ( [ strangerJonasFrom2020
          , siljaFrom2053
          , ( Bartosz, Adult, travelOfStrangerTeam )
          ]
        )
        ( sep 3 7 )
        "Bartosz begins to break faith with Jonas and meets Silja when she arrives from 2053"
    ]
