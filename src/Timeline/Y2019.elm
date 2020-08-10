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

    {- Nov 6 -}

    , Event
        Eva
        ( exact 6 Nov 2019 )
        ( [ ( Jonas, Teen, TraveledFromUnknown )
          , ( Martha_2, Teen, TraveledFromUnknown )
          ]
        )
        ( sep 3 5 )
        "Jonas and Martha-2 head to the power plant and she cuts her cheek"

    , Event
        Eva
        ( exact 6 Nov 2019 )
        ( [ ( Jonas, Teen, TravelsToUnknown )
          , ( Martha_2, Teen, TravelsToUnknown )
          ]
        )
        ( sep 3 5 )
        "Jonas sees the Martha-2 cut and instead brings Martha-2 to Eva"

    , Event
        Eva
        ( exact 6 Nov 2019 )
        ( [ ( Martha_3, Old, to6Nov2052 )
          , ( Martha_3, Teen, to6Nov2052 )
          , ( Jonas, Teen, Death )
          ]
        )
        ( sep 3 5 )
        "Eva has Martha-3 shoot and kill Jonas and then they travel to 2052"

    {- Nov 7 -}

    , Event
        Eva
        ( exact 7 Nov 2019 )
        ( [ ( Martha_2, Teen, TravelsToUnknown_ 2053 )
          , ( Magnus, Adult, TravelsToUnknown_ 2053 )
          , ( Franziska, Adult, TravelsToUnknown_ 2053 )
          ]
        )
        ( sep 3 6 )
        "Martha-2 tries to prevent the Apocalypse but is intercepted by adult-Magnus and adult Franziska and brought to Adam in 2053 (World one)"

    , Event
        Eva
        ( exact 7 Nov 2019 )
        ( [ ( Bartosz, Adult, Belongs )
          , ( Bartosz, Teen, Belongs )
          ]
        )
        ( sep 3 6 )
        "Adult-Bartosz from World Two intercepts young-Bartosz from World Two, bringing him to work with Eva"

    , Event
        Eva
        ( exact 7 Nov 2019 )
        ( [
          ]
        )
        ( sep 3 6 )
        "The Apocalypse happens in World Two"

    , Event
        Adam
        ( exact 7 Nov 2019 )
        ( [ ( Yasin, Child, TravelsToUnknown_ 1986 )
          , ( Helge, Adult, Belongs  )
          ]
        )
        ( sep 1 4 )
        "Yasin is kidnapped by Helge and taken to the bunker in 1986"

    , Event
        Adam
        ( exact 7 Nov 2019 )
        ( [ ( Hanno_Noah, Adult, TraveledFromUnknown )
          , ( Bartosz, Teen, Belongs  )
          ]
        )
        ( sep 1 5 )
        "Adult-Noah makes contact with young-Bartosz for the first time"

    {- Nov 8 -}

    , Event
        Adam
        ( exact 8 Nov 2019 )
        ( [ ( Jonas, Teen, Join to8Nov1986 from8Nov1986 )
          ]
        )
        ( sep 1 6 )
        "Jonas finds the passageway in the caves for the first time and then travels to 1986 and then back"

    , Event
        Adam
        ( exact 8 Nov 2019 )
        ( [ ( Ulrich, Adult, Belongs )
          , ( Mads, Child, Death )
          ]
        )
        ( sep 1 7 )
        "Ulrich realizes the body from the forest was Mads"

    , Event
        Adam
        ( exact 8 Nov 2019 )
        ( [ ( Charlotte, Adult, Belongs )
          ]
        )
        ( sep 1 7 )
        "Charlotte continues the investigation and searches the power plant and bunker"

    , Event
        Adam
        ( exact 8 Nov 2019 )
        ( [ ( Ulrich, Adult, to8Nov1953 )
          , ( Helge, Child, to8Nov1953 )
          ]
        )
        ( sep 1 8 )
        "Ulrich follows Helge to travel to 1953"

    {- Nov 11 -}

    , Event
        Adam
        ( exact 11 Nov 2019 )
        ( [ ( Claudia, Old, TraveledFromUnknown )
          , ( Bartosz, Teen, Belongs )
          ]
        )
        ( sep 1 9 )
        "Old Claudia visits young-Bartosz for the first time"

    , Event
        Adam
        ( exact 11 Nov 2019 )
        ( [ ( Jonas, Teen, Belongs )
          , ( Martha, Teen, Belongs )
          ]
        )
        ( sep 1 9 )
        "Jonas tries to end things with Martha after learning she's his aunt"

    , Event
        Adam
        ( exact 11 Nov 2019 )
        ( [ ( Jonas, Adult, TraveledFromUnknown )
          , ( Boris_Aleksander, Adult, Belongs )
          ]
        )
        ( sep 1 9 )
        "Strabger-Jonas takes some of the radioactive material from the truck Aleksander had hidden"

    {- Nov 12 -}

    , Event
        Adam
        ( exact 12 Nov 2019 )
        ( [ ( Jonas, Teen, Join to12Nov1986 <| Join Wormhole to12Nov2052 )
          ]
        )
        ( sep 1 10 )
        "Jonas goes back through the cave passageway to 1986, where he'll be sent to 2052 through wormhole in the bunker"

    , Event
        Adam
        ( exact 12 Nov 2019 )
        ( [ ( Charlotte, Adult, Belongs )
          ]
        )
        ( sep 1 10 )
        "Charlotte finds the photo of Ulrich in the 1953 newspaper records"

    , Event
        Adam
        ( exact 12 Nov 2019 )
        ( [ ( Peter, Adult, Belongs )
          , ( Charlotte, Adult, Belongs )
          ]
        )
        ( sep 1 10 )
        "Peter decides to tell Charlotte about time travel"

    , Event
        Adam
        ( exact 12 Nov 2019 )
        ( [ ( Jonas, Adult, Wormhole )
          ]
        )
        ( sep 1 10 )
        "Stranger-Jonas tries to destroy the cave passageway with the time machine, but instead creates the wormhole"

    ]


