module Timeline.Y1910 exposing (y1910)


import Time exposing (..)
import Person exposing (..)
import Event exposing (..)

import Timeline.Helpers exposing (..)


{- 1910 -}

y1910 : Timeline
y1910 =
    [ Event
        Adam
        ( throughout 1910 )
        ( [ siljaFrom2053 |> changeAge Adult
          , ( Agnes, Child, Birth )
          ]
        )
        ( sep 3 7 )
        "Adult-Silja gives birth to a baby girl and names her Agnes"
    ]
