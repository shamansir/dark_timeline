module Timeline.Y2052 exposing (y2052)


import Time exposing (..)
import Person exposing (..)
import Event exposing (..)

import Timeline.Def exposing (..)


{- 2052 -}

y2052 : Timeline
y2052 =

    [ Event
        Adam
        ( throughout 2052 )
        ( [ ( Claudia, Old, TraveledFromUnknown )
          , ( Jonas, Adult, TravelsToUnknown_ 2019 )
          ]
        )
        ( sep 3 7 )
        "Old-Claudia senss Stranger-Jonas to 2019 so he can help start the cycles again"

    {- Nov 6 -}

    , Event
        Eva
        ( exact 6 Nov 2052 )
        ( [ ( Martha_2, Teen, TraveledFromUnknown )
          , ( Jonas, Teen, TraveledFromUnknown )
          , ( Martha_3, Adult, TraveledFromUnknown )
          ]
        )
        ( sep 3 3 )
        "Martha-3 and Jonas emerge from the caves and are greeted by adult-Martha-3"

    , Event
        Eva
        ( exact 6 Nov 2052 )
        ( [ ( Martha_2, Teen, TraveledFromUnknown )
          , ( Jonas, Teen, TraveledFromUnknown )
          -- , ( Martha, Teen, TraveledFromUnknown ) -- Referenced
          , ( Martha_3, Adult, TraveledFromUnknown )
          ]
        )
        ( sep 3 3 )
        "Adult-Martha-3 tells Jonas he can't save his Martha, but that he can be happy with Martha-2"

    , Event
        Eva
        ( exact 6 Nov 2052 )
        ( [ ( Martha_2, Teen, to6Nov2019 )
          , ( Jonas, Teen, to6Nov2019 )
          , ( Unknown, Child, Birth )
          ]
        )
        ( sep 3 3 )
        "Jonas and Martha-2 return to 2019 in World Two, and they concieve the Unknown"

    {- Nov 7 -}

    , Event
        Eva
        ( exact 7 Nov 2052 )
        ( [ ( Martha_3, Old, TraveledFromUnknown )
          ]
        )
        ( sep 3 3 )
        "Eva orchestrates her plan from the sand-covered Erit-Lux headquarters"

    , Event
        Eva
        ( exact 7 Nov 2052 )
        ( [ ( Bartosz_2, Adult, TraveledFromUnknown )
          , ( Martha_3, Teen, TraveledFromUnknown )
          , ( Martha_3, Old, TraveledFromUnknown )
          , ( Jonas, Teen, Death )
          ]
        )
        ( sep 3 7 )
        "Bartosz-2 brings Martha-3 to Eva, who cuts her face and orders her to kill Jonas"

    , Event
        Eva
        ( exact 7 Nov 2052 )
        ( [ ( Jonas, Old, TraveledFromUnknown )
          , ( Martha_3, Old, TraveledFromUnknown )
          ]
        )
        ( sep 3 8 )
        "Adam travels to confront Eva one final time, and expains how he's finally ending the cycle"

    {- Nov 12 -}

    , Event
        Eva
        ( exact 12 Nov 2052 )
        ( [ ( Jonas, Teen, from12Nov1986 )
          , ( Silja, Teen, TraveledFromUnknown )
          ]
        )
        ( sep 1 10 )
        "Jonas arrives from 1986 and is found by Silja"

    ]


