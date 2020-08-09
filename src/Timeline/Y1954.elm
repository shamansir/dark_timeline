module Timeline.Y1954 exposing (y1954)


import Time exposing (..)
import Person exposing (..)
import Event exposing (..)

import Timeline.Def exposing (..)


{- 1954 -}

y1954 : Timeline
y1954 =
    -- Jun 23
    [ Event
        Adam
        ( exact 23 Jun 1954 )
        ( [ ( Helge, Child, from23Jun1987 )
          ]
        )
        ( sep 2 3 )
        "Noah uses the time-bunker maching in 1986 to send Helge back home to 1954"
    , Event
        Adam
        ( exact 23 Jun 1954 )
        ( [ ( Agnes, Adult, Belongs )
          , ( Doris, Adult, Belongs )
          ]
        )
        ( sep 2 3 )
        "Doris and Agnes continue having an affair"
    , Event
        Adam
        ( exact 23 Jun 1954 )
        ( [ ( Hanno_Noah, Adult, from23Jun1987 )
          ]
        )
        ( sep 2 3 )
        "Adult-Noah arrives back in 1954 after time travelling from 1987"
    , Event
        Adam
        ( exact 23 Jun 1954 )
        ( [ ( Hanno_Noah, Adult, from23Jun1987 )
          , ( Agnes, Adult, Belongs )
          , ( Claudia, Old, TraveledFromUnknown )
          ]
        )
        ( sep 2 3 )
        "Agnes tells adult-Noah that old-Claudia has the missing pages from the Trinity notebook"
    , Event
        Adam
        ( exact 23 Jun 1954 )
        ( [ ( Egon, Adult, Belongs )
          , ( Claudia, Old, TraveledFromUnknown )
          ]
        )
        ( sep 2 3 )
        "Old-Claudia visits Egon at the police station and tells him she's sorry"
    , Event
        Adam
        ( exact 23 Jun 1954 )
        ( [ ( HGTannhaus, Adult, Belongs )
          , ( Claudia, Old, TraveledFromUnknown )
          ]
        )
        ( sep 2 3 )
        "Old-Claudia visits Tannhaus and gives him the 'A Jorney Through Time' book (so he can write it)"
    , Event
        Adam
        ( exact 23 Jun 1954 )
        ( [ ( Hanno_Noah, Adult, from23Jun1987 )
          , ( Claudia, Old, Death )
          ]
        )
        ( sep 2 3 )
        "Adult-Noah kills Old-Claudia and takes the missing notebook pages"
    , Event
        Adam
        ( exact 23 Jun 1954 )
        ( [ ( Hanno_Noah, Adult, to23Jun1921 )
          ]
        )
        ( sep 2 3 )
        "Noah realizes that Adam lied and travels back to kill him"
    -- Jun 26
    , Event
        Adam
        ( exact 26 Jun 1954 )
        ( [ ( Claudia, Old, Death )
          ]
        )
        ( sep 2 7 )
        "Old-Claudia's corpse is examined by a mortician"
    , Event
        Adam
        ( exact 26 Jun 1954 )
        ( [ ( Hannah, Adult, from26Jun2020 )
          , ( Egon, Adult, Belongs )
          , ( Ulrich, Adult, from8Nov2019 )
          ]
        )
        ( sep 2 7 )
        "Hannah arrives from 2020 and goes to Egon to ask to see Ulrich"
    , Event
        Adam
        ( exact 26 Jun 1954 )
        ( [ ( Hannah, Adult, from26Jun2020 )
          , ( Ulrich, Adult, from8Nov2019 )
          ]
        )
        ( sep 2 7 )
        "Hannah visits Ulrich, but leaves him imprisoned and denies knowing him"
    , Event
        Adam
        ( exact 26 Jun 1954 )
        ( [ ( Hannah, Adult, from26Jun2020 )
          , ( Egon, Adult, Belongs )
          , ( Katharina, Child, Belongs )
          ]
        )
        ( sep 2 7 )
        "Hannah assumes the identity of 'Katharina Nielsen' and begins the affair with Egon, chosing to stay in the past"
    , Event
        Adam
        ( exact 26 Jun 1954 )
        ( [ ( Agnes, Adult, TravelsToUnknown )
          , ( Tronte, Teen, Belongs )
          , ( Doris, Adult, Belongs )
          ]
        )
        ( sep 2 7 )
        "Agnes time-travels, leaving Tronte and Doris without an explanation"
    -- Sep 24
    , Event
        Adam
        ( exact 24 Sep 1954 )
        ( theUnknowns ++ [ ( Tronte, Teen, Belongs ) ]
        )
        ( sep 3 4 )
        "The Unknowns give Tronte the silver snake bracelet"
    , Event
        Adam
        ( exact 24 Sep 1954 )
        ( [ ( Hannah, Adult, from26Jun2020 )
          , ( Egon, Adult, Belongs )
          ]
        )
        ( sep 3 4 )
        "Egon and Hannah continue their affair and he gives her the St.Christopher necklace"
    , Event
        Adam
        ( exact 24 Sep 1954 )
        ( [ ( Hannah, Adult, from26Jun2020 )
          , ( Egon, Adult, Belongs )
          ]
        )
        ( sep 3 4 )
        "Hannah learns she's pregnant with Egon's baby"
    , Event
        Adam
        ( exact 24 Sep 1954 )
        ( theUnknowns ++ [ ( Bernd, Adult, Belongs ) ]
        )
        ( sep 3 4 )
        "The Unknowns coerce a goverment official into giving Bernd the building permits for the nuclear power plant"
    , Event
        Adam
        ( exact 24 Sep 1954 )
        ( [ ( Hannah, Adult, from26Jun2020 )
          , ( FObendorf, Adult, Belongs )
          , ( Helene, Teen, Belongs )
          ]
        )
        ( sep 3 4 )
        "Hannah goes to Fran Obendorf's for an abortion and meets young Helene Albers"
    , Event
        Adam
        ( exact 24 Sep 1954 )
        ( [ ( Hannah, Adult, from26Jun2020 )
          , ( Katharina, Child, Belongs )
          , ( Helene, Teen, Belongs )
          ]
        )
        ( sep 3 4 )
        "Hannah gives Helene Albers the idea for the name Katharina and leaves her the St.Christopher necklace"
    , Event
        Adam
        ( exact 24 Sep 1954 )
        ( [ ( Hannah, Adult, from26Jun2020 )
          , ( Silja, Child, Birth )
          ]
        )
        ( sep 3 4 )
        "Hannah decides to keep her baby and starts new life with her future daughter, Silja"
    ]



