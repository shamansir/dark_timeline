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

    {- Nov 4 -}

    , Event
        Eva
        ( exact 4 Nov 2019 )
        ( [ ( Jonas, Teen, from6Nov2052 )
          , ( Martha_2, Teen, from6Nov2052 )
          ]
        )
        ( sep 3 2 )
        "World One (Adam) Jonas is brought to World Two (Eva) by Martha-2"

    , Event
        Eva
        ( exact 4 Nov 2019 )
        ( [ ( Martha_2, Teen, to21Sep1888 )
          ]
        )
        ( sep 3 2 )
        "Martha-2 travels to 1988 in World one to give Stranger-Jonas the God particle material needed for his portal"

    , Event
        Eva
        ( exact 4 Nov 2019 )
        ( [ ( Martha_3, Old, TraveledFromUnknown )
          , ( Jonas, Teen, TraveledFromUnknown )
          ]
        )
        ( sep 3 1 )
        "Martha-3, aka Eva, brings Jonas to the Erit Lux headquaters"

    , Event
        Eva
        ( exact 4 Nov 2019 )
        ( [ ( Martha_3, Old, TraveledFromUnknown )
          , ( Jonas, Teen, TraveledFromUnknown )
          , ( Martha_2, Teen, TraveledFromUnknown )
          ]
        )
        ( sep 3 3 )
        "Martha-3, aka Eva, convinces Jonas to help her and Martha-2 work against Adam"

    , Event
        Adam
        ( exact 4 Nov 2019 )
        ( [ ( Peter, Adult, Belongs )
          , ( Mads, Child, Wormhole )
          ]
        )
        ( sep 1 10 )
        "Peter is in the bunker when Mads' body drops through wormhole and into 2019"

    , Event
        Adam
        ( exact 4 Nov 2019 )
        ( [ ( Peter, Adult, Belongs )
          , ( Tronte, Old, Belongs )
          , ( Mads, Child, Wormhole )
          ]
        )
        ( sep 1 10 )
        "Peter calls Tronte, Mads' father, who comes to the bunker"

    , Event
        Adam
        ( exact 4 Nov 2019 )
        ( [ ( Claudia, Old, TraveledFromUnknown )
          , ( Tronte, Old, Belongs )
          , ( Peter, Adult, Belongs )
          ]
        )
        ( sep 1 10 )
        "Old-Claudia arrives and explains time travel to Peter and Tronte"

    , Event
        Adam
        ( exact 4 Nov 2019 )
        ( [ ( Mikkel, Child, to5Nov1986 )
          , ( Jonas, Teen, Belongs )
          ]
        )
        ( sep 1 1 )
        "Mikkel is brought through the cave passageway (by Jonas) to 1986"

    , Event
        Adam
        ( exact 4 Nov 2019 )
        ( [ ( Peter, Adult, Belongs )
          , ( Tronte, Old, Belongs )
          , ( Mads, Child, Death )
          ]
        )
        ( sep 1 1 ) -- also sep 1 10
        "Peter and Tronte take Mads' body to the forest"

    {- Nov 5 -}

    , Event
        Eva
        ( exact 5 Nov 2019 )
        ( theUnknowns ++ [ ( Martha_3, Old, TraveledFromUnknown ) ]
        )
        ( sep 3 3 )
        "the Unknowns return to Eva with the keys, watch and power plant schematics"

    , Event
        Eva
        ( exact 5 Nov 2019 )
        ( [ ( Jonas, Teen, to5Nov2052 )
          , ( Martha_2, Teen, to5Nov2052 )
          ]
        )
        ( sep 3 3 )
        "Jonas and Martha-2 travel through the cave passage-way and into 2052"

    , Event
        Adam
        ( exact 5 Nov 2019 )
        ( [ strangerJonasFrom2020
          ]
        )
        ( sep 1 2 )
        "Stranger-Jonas comes to Winden and goes to the Waldhotel"

    , Event
        Adam
        ( exact 5 Nov 2019 )
        ( [ ( Boris_Aleksander, Adult, Belongs )
          ]
        )
        ( sep 1 2 )
        "Aleksander has barrels of the radioactive material loaded into an off-site truck"

    ]


