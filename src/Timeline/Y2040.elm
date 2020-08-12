module Timeline.Y2040 exposing (y2040)


import Time exposing (..)
import Person exposing (..)
import Event exposing (..)

import Timeline.Def exposing (..)


{- 2040 -}

y2040 : Timeline
y2040 =

    [ Event
        Eva
        ( throughout 2040 )
        ( [ ( Claudia_2, Adult, TraveledFromUnknown )
          , ( Claudia, Adult, TraveledFromUnknown )
          , ( Martha_3, Old, TraveledFromUnknown )
          ]
        )
        ( sep 3 7 )
        "Claudia-2 checks in on Claudia and says Eva wants to make sure the portal doesn't work yet"

    , Event
        Eva
        ( throughout 2040 )
        ( [ ( Claudia_2, Adult, Death )
          , ( Claudia, Adult, TraveledFromUnknown )
          , ( Martha_3, Old, TraveledFromUnknown )
          ]
        )
        ( sep 3 7 )
        "Claudia kills Claudia-2 and starts impersonating her to Eva"

    , Event
        Eva
        ( throughout 2040 )
        ( [ ( Claudia, Adult, TraveledFromUnknown )
          , ( Martha_3, Adult, TraveledFromUnknown )
          ]
        )
        ( sep 3 7 )
        "Claudia goes to Erit Lux headquaters, where adult-Martha-3 gives her the blueprints for the time machine"

    , Event
        Eva
        ( throughout 2040 )
        ( [ ( Claudia, Adult, to11Nov1953 )
          ]
        )
        ( sep 3 7 )
        "Claudia takes the blueprints taken from Martha-3 to World One Tannhaus in 1953"

    , Event
        Adam
        ( throughout 2040 )
        ( [ ( Claudia, Adult, TraveledFromUnknown )
          , ( Hanno_Noah, Adult, Belongs )
          , ( Jonas, Adult, Belongs )
          ]
        )
        ( sep 3 7 )
        "Adult-Noah argues with Jonas, who has grown into Stranger-Jonas, over Claudia trustworthiness"

    , Event
        Adam
        ( throughout 2040 )
        ( [ ( Elisabeth, Adult, Belongs )
          , ( Charlotte, Child, Birth )
          ]
        )
        ( sep 3 7 )
        "Adult-Elisabeth gives birth to Charlotte"

    ]


