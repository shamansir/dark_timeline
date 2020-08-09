module Timeline.Y1987 exposing (y1987)


import Time exposing (..)
import Person exposing (..)
import Event exposing (..)

import Timeline.Def exposing (..)


{- 1987 -}

y1987 : Timeline
y1987 =
    -- Jun 22
    [ Event
        Adam
        ( exact 22 Jun 1987 )
        ( [ ( Claudia, Adult, Belongs )
          , ( Claudia, Old, TraveledFromUnknown )
          ]
        )
        ( sep 2 2 )
        "Old-Claudia visits Claudia in the office and tells her about time travel"
    , Event
        Adam
        ( exact 22 Jun 1987 )
        ( [ ( Egon, Old, Belongs )
          , ( Mads, Teen, Belongs )
          ]
        )
        ( sep 2 2 )
        "Old-Egon is diagnosed with cancer and decides to reivestigate Mads' disappearance"
    , Event
        Adam
        ( exact 22 Jun 1987 )
        ( [ ( Egon, Old, Belongs )
          , ( Ulrich, Old, from8Nov2019 )
          ]
        )
        ( sep 2 2 )
        "Old-Egon visits Ulrich, who is now an old man, in the psychatric hospital"
    , Event
        Adam
        ( exact 22 Jun 1987 )
        ( [ ( Hannah, Adult, TraveledFromUnknown_ 2019 )
          , ( Jonas, Adult, TraveledFromUnknown_ 2018 )
          , ( Mikkel, Child, from4Nov2019 )
          ]
        )
        ( sep 2 2 )
        "Adult-Hanna and Stranger-Jonas arrive from 2019 and Hanna relizes her husband was Mikkel"
    , Event
        Adam
        ( exact 22 Jun 1987 )
        ( [ ( Claudia, Adult, Belongs )
          ]
        )
        ( sep 2 2 )
        "Claudia digs up the time machine in her backyard"
    -- Jun 23
    , Event
        Adam
        ( exact 23 Jun 1987 )
        ( [ ( Hanno_Noah, Adult, TraveledFromUnknown )
          , ( Helge, Teen, to12Nov1953 )
          ]
        )
        ( sep 2 3 )
        "Adult-Noah sends young-Helge back to 1953 using the time machine in the bunker"
    , Event
        Adam
        ( exact 23 Jun 1987 )
        ( [ ( Hanno_Noah, Adult, to12Nov1953 )
          ]
        )
        ( sep 2 3 )
        "Adult-Noah also travels back to 1953"
    , Event
        Adam
        ( exact 23 Jun 1987 )
        ( [ ( Claudia, Adult, Belongs )
          , ( HGTannhaus, Old, Belongs )
          ]
        )
        ( sep 2 3 )
        "Claudia visits old-Tannhaus and he further explains how the time machine works"
    -- Jun 25
    , Event
        Adam
        ( exact 25 Jun 1987 )
        ( [ ( Ulrich, Old, from8Nov2019 )
          , ( Mikkel, Child, from4Nov2019 )
          , ( Ines, Adult, Belongs )
          ]
        )
        ( sep 2 5 )
        "Old-Ulrich escapes from psychiatric hospital and finds Mikkel at Ines' house"
    , Event
        Adam
        ( exact 25 Jun 1987 )
        ( [ ( Ulrich, Old, from8Nov2019 )
          , ( Mikkel, Child, from4Nov2019 )
          ]
        )
        ( sep 2 5 )
        "Mikkel recognizes his father in old-Ulrich and they try to escape through caves but get caught"
    , Event
        Adam
        ( exact 25 Jun 1987 )
        ( [ ( Ulrich, Old, from8Nov2019 )
          , ( Mikkel, Child, from4Nov2019 )
          , ( Ines, Adult, Belongs )
          ]
        )
        ( sep 2 5 )
        "Mikkel returns to Ines' home, Ulrich is imprisoned once again"
    -- Jun 26
    , Event
        Adam
        ( exact 26 Jun 1987 )
        ( [ ( Claudia, Adult, Belongs )
          , ( Egon, Old, Belongs )
          ]
        )
        ( sep 2 7 )
        "Old-Egon tells Claudia that he thinks time travel is real, and he realizes that she already knows"
    , Event
        Adam
        ( exact 26 Jun 1987 )
        ( [ ( Claudia, Adult, Belongs )
          , ( Egon, Old, Death )
          ]
        )
        ( sep 2 7 )
        "Claudia fights with Egon and she accidentally kills him"
    , Event
        Adam
        ( exact 26 Jun 1987 )
        ( [ ( Claudia, Adult, Belongs )
          , ( Jonas, Teen, TraveledFromUnknown_ 2019 )
          -- , ( Claudia, Old, ... )
          ]
        )
        ( sep 2 7 )
        "Jonas arrives from 2019 and meets Claudia for the first time (on old-Claudia's orders)"
    , Event
        Adam
        ( exact 26 Jun 1987 )
        ( [ ( Claudia, Adult, TravelsToUnknown )
          , ( Jonas, Teen, TravelsToUnknown )
          ]
        )
        ( sep 2 7 )
        "Jonas tells Claudia there's a way to change everything and brings Claudia with him to the future"
    -- Jun 27
    , Event
        Adam
        ( exact 27 Jun 1987 )
        ( [ ( Claudia, Adult, TravelsToUnknown_ 2020 )
          , ( Jonas, Teen, TravelsToUnknown_ 2020 )
          ]
        )
        ( sep 2 8 )
        "Jonas and Claudia reopen the passageway in the caves and then travel to 2020"
    , Event
        Adam
        ( exact 27 Jun 1987 )
        ( [ ( Katharina, Adult, from27Jun2020 )
          , ( Mikkel, Child, from4Nov2019 )
          ]
        )
        ( sep 2 8 )
        "Katharina arrives from 2020 using the caves, planning to find Mikkel"
    -- Sep 21
    , Event
        Adam
        ( exact 21 Sep 1987 )
        ( theUnknowns ++ [ ( Bernd, Old, Death ) ]
        )
        ( sep 3 1 )
        "The Unknowns kill Bernd and steal the master keys for the power plant"
    -- Sep 22
    , Event
        Adam
        ( exact 22 Sep 1987 )
        ( [ ( Katharina, Adult, from27Jun2020 )
          , ( Mikkel, Child, from4Nov2019 )
          ]
        )
        ( sep 3 2 )
        "Katharina continues her search for Mikkel"
    , Event
        Adam
        ( exact 22 Sep 1987 )
        ( [ ( Claudia, Adult, Missing )
          ]
        )
        ( sep 3 2 )
        "Claudia is considered 'missing' after she disappeared following Egon's death"
    , Event
        Adam
        ( exact 22 Sep 1987 )
        ( [ ( Katharina, Adult, from27Jun2020 )
          , ( Helene, Adult, Belongs )
          ]
        )
        ( sep 3 2 )
        "Katharina goes to the psychiatric hospital and sees mother Helene at the reception desk"
    , Event
        Adam
        ( exact 22 Sep 1987 )
        ( [ ( Katharina, Adult, from27Jun2020 )
          , ( Ulrich, Old, from8Nov2019 )
          ]
        )
        ( sep 3 2 )
        "Katharina meets old-Ulrich and vows to get him back to 2020"
    , Event
        Adam
        ( exact 22 Sep 1987 )
        ( theUnknowns
        )
        ( sep 3 2 )
        "The Unknowns go to the power-plant and steal the schematics for the volume control after killing Claudia's assistant"
    -- Sep 23
    , Event
        Adam
        ( exact 23 Sep 1987 )
        ( [ ( Katharina, Adult, from27Jun2020 )
          , ( Ulrich, Old, from8Nov2019 )
          ]
        )
        ( sep 3 5 )
        "Katharina tells old-Ulrich to meet her that night in the hospital so he can escape"
    , Event
        Adam
        ( exact 23 Sep 1987 )
        ( [ ( Katharina, Adult, Death )
          , ( Helene, Adult, Belongs )
          ]
        )
        ( sep 3 5 )
        "Katharina tries to steal a keycard from Helene, but Helene kills Katharina and drags her body into the lake"
    , Event
        Adam
        ( exact 23 Sep 1987 )
        ( [ ( Helene, Adult, Belongs )
          ]
        )
        ( sep 3 5 )
        "Helene's St.Cristopher necklase is left in the sand on the lakeshore"
    ]

