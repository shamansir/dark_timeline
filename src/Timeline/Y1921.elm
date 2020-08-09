module Timeline.Y1921 exposing (y1921)


import Time exposing (..)
import Person exposing (..)
import Event exposing (..)

import Timeline.Def exposing (..)


{- 1921 -}

y1921 : Timeline
y1921 =
    -- Jun 21
    [ Event
        Adam
        ( exact 21 Jun 1921 )
        ( [ ( Hanno_Noah, Teen, Belongs )
          , ( Bartosz, Adult, travelOfStrangerTeam )
          ]
        )
        ( sep 2 1 )
        "Young Noah and Bartosz work to create cave passageway"
    , Event
        Adam
        ( exact 21 Jun 1921 )
        ( [ ( Hanno_Noah, Teen, Belongs )
          , ( Bartosz, Adult, Death )
          ]
        )
        ( sep 2 1 )
        "Young Noah kills Bartosz outside the caves"
    , Event
        Adam
        ( exact 21 Jun 1921 )
        [ ]
        ( sep 2 1 )
        "The St. Christopher Church is built over the Sic Mundus headquaters"
    -- Jun 23: No source except 23 Jun 1954 (!!!)
    , Event
        Adam
        ( exact 23 Jun 1921 )
        [ ( Hanno_Noah, Adult, from23Jun1954 )
        ]
        ( sep 2 3 )
        "Adult-Noah (another one than the one from 2040?) arrives with a plan to kill Adam"
    -- Jun 24
    , Event
        Adam
        ( exact 24 Jun 1921 )
        ( [ ( Jonas, Teen, TraveledFrom_ <| throughout 1953 )
          ]
        )
        ( sep 2 4 )
        "Jonas arrives in 1921 after stepping into the portal in 1953"
    , Event
        Adam
        ( exact 24 Jun 1921 )
        ( [ ( Jonas, Teen, TraveledFrom_ <| throughout 1953 )
          , adamAtStartOf19xx
          , ( Hanno_Noah, Teen, Belongs )
          , ( Hanno_Noah, Adult, from2040 )
          ]
        )
        ( sep 2 4 )
        "Young-Noah leads Young-Jonas to Adult-Noah who in turn brings him to Adam"
    , Event
        Adam
        ( exact 24 Jun 1921 )
        ( [ ( Jonas, Teen, TraveledFrom_ <| throughout 1953 )
          , adamAtStartOf19xx
          ]
        )
        ( sep 2 4 )
        "Adam reveals to Jonas that he is his own future self"
    -- Jun 25
    , Event
        Adam
        ( exact 25 Jun 1921 )
        ( [ ( Jonas, Teen, TraveledFrom_ <| throughout 1953 )
          , adamAtStartOf19xx
          ]
        )
        ( sep 2 5 )
        "Adam tells Jonas he has to stop his father, adult-Mikkel, from dying"
    , Event
        Adam
        ( exact 25 Jun 1921 )
        ( [ ( Jonas, Teen, to20Jun2019 )
          ]
        )
        ( sep 2 5 )
        "Jonas enters Adam's portal, and goes to 2019"
    -- Jun 27
    , Event
        Adam
        ( exact 27 Jun 1921 )
        ( [ adamAtStartOf19xx
          , ( Hanno_Noah, Adult, Death )
          , ( Agnes, Adult, Belongs )
          ]
        )
        ( sep 2 8 )
        "Adult-Noah tries to kill Adam, but the gun won't work. Then Agnes shoots and kills Noah"
    , Event
        Adam
        ( exact 27 Jun 1921 )
        ( [ adamAtStartOf19xx |> changeExistense to27Jun2020
          ]
        )
        ( sep 2 8 )
        "Adam travels to 2020 on the day of apocalypse to kill Martha"
    , Event
        Adam
        ( exact 27 Jun 1921 )
        ( [ ( Hanno_Noah, Teen, to27Jun2020 )
          ]
        )
        ( sep 2 8 )
        "Young=Noah travels to 2020 to give Stranger-Jonas the letter from Martha-2, and to meet Young-Elisabeth"
    ]


