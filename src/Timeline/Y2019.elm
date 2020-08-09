module Timeline.Y2019 exposing (y2019)


import Time exposing (..)
import Person exposing (..)
import Event exposing (..)

import Timeline.Def exposing (..)


{- 2019 -}

y2019 : Timeline
y2019 =

    [ Event
        Origin_2
        ( throughout 2019 )
        ( [ ( Regina, Adult, Belongs )
          , ( Peter, Adult, Belongs )
          , ( Benni, Adult, Belongs )
          , ( Hannah, Adult, Belongs )
          , ( Torben, Adult, Belongs )
          , ( Katharina, Adult, Belongs )
          ]
        )
        ( sep 3 8 )
        "Regina, Peter, Benni, Hannah, Torben, and Katharina have dinner party"

    {- Jun 20 -}

    , Event
        Adam
        ( exact 20 Jun 2019 )
        ( [ ( Jonas, Teen, Belongs )
          , ( Bartosz, Teen, Belongs )
          , ( Martha, Teen, Belongs )
          , ( Magnus, Teen, Belongs )
          ]
        )
        ( sep 2 6 )
        "Jonas goes to the lake with Martha, Magnus, and Bartosz"

    , Event
        Adam
        ( exact 20 Jun 2019 )
        ( [ ( Jonas, Teen, Belongs )
          , ( Helene, Adult, Death )
          ]
        )
        ( sep 2 6 )
        "Jonas finds Helene's St.Christopher necklace in the sand by the lake"

    {- , Event
        Adam
        ( exact 20 Jun 2019 )
        ( [ ( Bartosz, Teen, Belongs )
          , ( Helene, Adult, Death )
          ]
        )
        ( sep 2 6 )
        "Bartosz tells the 'myth' about dead woman on the bottom of a lake, which is Helene" -}

    , Event
        Adam
        ( exact 20 Jun 2019 )
        ( [ ( Jonas, Teen, TraveledFrom_ <| throughout 1921 )
          , ( Mikkel, Adult, from4Nov2019 )
          ]
        )
        ( sep 2 6 )
        "A slightly-older Jonas arrives from 1921 on mission to stop adult-Mikkel from dying by suicide"

    , Event
        Adam
        ( exact 20 Jun 2019 )
        ( [ ( Jonas, Teen, TraveledFrom_ <| throughout 1921 )
          , ( Martha, Teen, Belongs )
          ]
        )
        ( sep 2 6 )
        "A slightly-older Jonas goes to the lake, also kisses Martha, and then leaves"

    , Event
        Adam
        ( exact 20 Jun 2019 )
        ( [ ( Jonas, Teen, Belongs )
          , ( Martha, Teen, Belongs )
          ]
        )
        ( sep 2 6 )
        "Martha puts St. Christopher pendant onto a cord and gives it to Jonas"

    , Event
        Adam
        ( exact 20 Jun 2019 )
        ( [ ( Jonas, Teen, Belongs )
          , ( Martha, Teen, Belongs )
          ]
        )
        ( sep 2 6 )
        "Martha and Jonas have sex for the first time"

    , Event
        Adam
        ( exact 20 Jun 2019 )
        ( [ ( Ulrich, Adult, Belongs )
          , ( Katharina, Adult, Belongs )
          , ( Hannah, Adult, Belongs )
          ]
        )
        ( sep 2 6 )
        "Ulrich cheats on Katharina with Hannah in the backyard during their anniversary party"

    , Event
        Adam
        ( exact 20 Jun 2019 )
        ( [ ( Jonas, Teen, TraveledFrom_ <| throughout 1921 )
          , ( Mikkel, Adult, from4Nov2019 )
          ]
        )
        ( sep 2 6 )
        "Time-travelling Jonas goes to Mikkel and asks him not to kill himself"

    , Event
        Adam
        ( exact 20 Jun 2019 )
        ( [ ( Jonas, Teen, TraveledFrom_ <| throughout 1921 )
          , ( Mikkel, Adult, from4Nov2019 )
          ]
        )
        ( sep 2 6 )
        "But Jonas' appearance turns out to be the reason why Mikkel decides to die"

    , Event
        Adam
        ( exact 20 Jun 2019 )
        ( [ ( Jonas, Teen, TraveledFrom_ <| throughout 1921 )
          , ( Claudia, Old, Belongs )
          ]
        )
        ( sep 2 6 )
        "Jonas begins working with old-Claudia, devastated by Adam's lie to him about saving Mikkel"

    {- Jun 21 -}

    , Event
        Adam
        ( exact 21 Jun 2019 )
        ( [ ( Mikkel, Adult, Death )
          ]
        )
        ( sep 2 6 )
        "Adult-Mikkel dies by suicide"

    ]


