module Timeline.Y1971 exposing (y1971)


import Time exposing (..)
import World exposing (..)
import Person exposing (..)
import Event exposing (..)

import Timeline.Helpers exposing (..)


{- 1971 -}

y1971 : Timeline
y1971 =
    [ Event
        Origin_1
        ( exact 8 Aug 1971 )
        ( [ ( Marek, Adult, Belongs )
          , ( Sonja, Adult, Belongs )
          , ( Charlotte, Child, Belongs )
          , ( HGTannhaus, Adult, Belongs )
          ]
        )
        ( sep 3 7 )
        "In one reality, Marek, Sonja and baby Charlotte have an argue with Tannhaus"
    , Event
        Origin_1
        ( exact 8 Aug 1971 )
        ( [ ( Marek, Adult, Death )
          , ( Sonja, Adult, Death )
          , ( Charlotte, Child, Death )
          ]
        )
        ( sep 3 7 )
        "In one reality, Marek, Sonja and baby Charlotte die in a car accident"
    , Event
        Origin_2
        ( exact 8 Aug 1971 )
        ( [ ( Jonas, Teen, Wormhole )
          , ( Martha_2, Teen, Wormhole )
          , ( Marek, Adult, Belongs )
          , ( Sonja, Adult, Belongs )
          , ( Charlotte, Child, Belongs )
          , ( HGTannhaus, Adult, Belongs )
          ]
        )
        ( sep 3 8 )
        "In new reality, Jonas and Martha-2 convince Marek to drive back to the clock shop, saving their lives"
    , Event
        Origin_2
        ( exact 8 Aug 1971 )
        ( [ ( Jonas, Teen, Death )
          , ( Martha_2, Teen, Death )
          ]
        )
        ( sep 3 8 )
        "Jonas and Martha-2 both die/disappear following the conversation"
    ]


