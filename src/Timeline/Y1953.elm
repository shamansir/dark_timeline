module Timeline.Y1953 exposing (y1953)


import Time exposing (..)
import World exposing (..)
import Person exposing (..)
import Event exposing (..)

import Timeline.Helpers exposing (..)


{- 1953 -}

y1953 : Timeline
y1953 =
    [ Event
        Adam
        ( throughout 1953 )
        ( [ ( Claudia, Old, TraveledFromUnknown )
          ]
        )
        ( sep 2 2 )
        "Old Claudia buries the suitcase with the time machine in her own future backyard"
    -- Nov 9
    , Event
        Adam
        ( exact 9 Nov 1953 )
        ( [ ( Helge, Adult, TraveledFromUnknown )
          , ( Yasin, Child, Death )
          ]
        )
        ( sep 1 8 )
        "Adult-Helge takes Yasin's body out of the bunker and drops it at construction site"
    -- Nov 10
    , Event
        Adam
        ( exact 10 Nov 1953 )
        ( [ ( Ulrich, Adult, from8Nov2019 )
          ]
        )
        ( sep 1 8 )
        "Adult-Ulrich arrives from 2019 after entering the caves"
    , Event
        Adam
        ( exact 10 Nov 1953 )
        ( [ ( Egon, Adult, Belongs )
          ]
        )
        ( sep 1 8 )
        "Egon investigates the boy's murders"
    , Event
        Adam
        ( exact 10 Nov 1953 )
        ( [ ( Egon, Adult, Belongs )
          , ( Agnes, Adult, Belongs )
          , ( Claudia, Child, Belongs )
          , ( Doris, Adult, Belongs )
          ]
        )
        ( sep 1 8 )
        "Adult-Agnes and her son Tronte arrive in Winden and start living with Egon, young-Claudia and Doris"
    , Event
        Adam
        ( exact 10 Nov 1953 )
        ( [ ( Gretchen, Adult, Belongs )
          ]
        )
        ( sep 1 8 )
        "Gretchen the poodle gets lost inside the Winden caves"
    , Event
        Adam
        ( exact 10 Nov 1953 )
        ( [ ( Bernd, Adult, Belongs )
          ]
        )
        ( sep 1 8 )
        "Bernd picthes the power plant to local investors and the government"
    , Event
        Adam
        ( exact 10 Nov 1953 )
        ( [ ( Ulrich, Adult, from8Nov2019 )
          , ( HGTannhaus, Adult, Belongs )
          ]
        )
        ( sep 1 8 )
        "Adult-Ulrich visits H.G.Tannhaus"
    , Event
        Adam
        ( exact 10 Nov 1953 )
        ( [ ( Ulrich, Adult, from8Nov2019 )
          , ( Helge, Teen, Belongs )
          ]
        )
        ( sep 1 8 )
        "Adult-Ulrich attacks young-Helge, scarring his face and ear, and leaves him in the bunker"
    , Event
        Adam
        ( exact 10 Nov 1953 )
        ( [ ( Ulrich, Adult, from8Nov2019 )
          , ( HGTannhaus, Adult, Belongs )
          ]
        )
        ( sep 1 8 )
        "Tannhaus finds Ulrich's cell phone and keeps it"
    , Event
        Adam
        ( exact 10 Nov 1953 )
        ( [ ( Ulrich, Adult, from8Nov2019 )
          ]
        )
        ( sep 1 9 )
        "Adult Ulrich is arrested and imprisoned"
    -- Nov 11
    , Event
        Adam
        ( exact 11 Nov 1953 )
        ( [ ( Claudia, Old, TraveledFromUnknown )
          , ( HGTannhaus, Adult, Belongs )
          ]
        )
        ( sep 1 9 )
        "Old-Claudia visits Tannhaus and gives him the blueprint for the time machine"
    -- Nov 12
    , Event
        Adam
        ( exact 12 Nov 1953 )
        ( [ ( Helge, Teen, Belongs )
          , ( Jonas, Teen, from12Nov1986 )
          -- ? , ( Jonas, Teen, from12Nov2019 )
          ]
        )
        ( sep 1 10 )
        "Helge sees the wormhole in the bunker and reaches to touch Jonas"
    , Event
        Adam
        ( exact 12 Nov 1953 )
        ( [ ( Helge, Teen, to12Nov1986 )
          ]
        )
        ( sep 1 10 )
        "Helge is transported to 1986 inside the bunker, where Adult-Noah finds him"
    ]



