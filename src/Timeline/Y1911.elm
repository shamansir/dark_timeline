module Timeline.Y1911 exposing (y1911)


import Time exposing (..)
import Person exposing (..)
import Event exposing (..)

import Timeline.Def exposing (..)


{- 1911 -}

y1911 : Timeline
y1911 =
    [ Event
        Adam
        ( throughout 1911 )
        ( [ ( Hannah, Adult, TraveledFromUnknown )
          , ( Silja, Teen, TraveledFromUnknown )
          ]
        )
        ( sep 3 7 )
        "Adult-Hanna arrives from the future with Young Silja"

    , Event
        Adam
        ( throughout 1911 )
        ( [ adamAtStartOf19xx
          , ( Hannah, Adult, Death )
          ]
        )
        ( sep 3 7 )
        "Stranger-Jonas, who has now become Adam, kills adult-Hannah"

    , Event
        Adam
        ( throughout 1911 )
        ( [ adamAtStartOf19xx
          , ( Silja, Child, TravelsToUnknown ) -- Probably, 2053
          ]
        )
        ( sep 3 7 )
        "Stranger-Jonas, who has now become Adam, sends Silja to the future with the working time portal"

    ]


