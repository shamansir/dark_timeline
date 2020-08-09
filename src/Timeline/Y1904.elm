module Timeline.Y1904 exposing (y1904)


import Time exposing (..)
import Person exposing (..)
import Event exposing (..)

import Timeline.Def exposing (..)


{- 1904 -}

y1904 : Timeline
y1904 =
    [ Event
        Adam
        ( throughout 1904 )
        ( [ siljaFrom2053 |> changeAge Adult
          , ( Hanno_Noah, Child, Birth )
          ]
        )
        ( sep 3 7 )
        "Adult-Silja gives birth to a baby boy and names him Hanno (aka Noah)"
    ]
