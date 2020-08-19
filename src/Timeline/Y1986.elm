module Timeline.Y1986 exposing (y1986)


import Time exposing (..)
import Person exposing (..)
import Event exposing (..)

import Timeline.Def exposing (..)


{- 1986 -}

y1986 : Timeline
y1986 =

    {- Jun 21 -}

    [ Event
        Adam
        ( exact 21 Jun 1986 )
        ( [ ( Unknown, Adult, TraveledFromUnknown )
          ]
        )
        ( sep 3 6 )
        "The adult-Unknown sets off the nuclear accident by altering the volume control system, creating the radioactive material that will become God Particle"

    , Event
        Eva
        ( exact 21 Jun 1986 )
        ( [ ( Unknown, Old, TraveledFromUnknown )
          , ( Unknown, Teen, TraveledFromUnknown )
          ]
        )
        ( sep 3 6 )
        "The young- and old-Unknown sets off the nuclear accident by altering the volume control system, creating the radioactive material that will become God Particle"

    , Event
        Origin_1
        ( exact 21 Jun 1986 )
        ( [ ( HGTannhaus, Adult, Belongs )
          ]
        )
        ( sep 3 7 )
        "In first reality, Tannhaus completes time machine and creates Martha and Jonas' separate worlds"

    {- Nov 5 -}

    , Event
        Adam
        ( exact 5 Nov 1986 )
        ( [ ( Mikkel, Child, from4Nov2019 )
          ]
        )
        ( sep 1 2 )
        "Mikkel comes out of the caves and realizes he's in the past"

    , Event
        Adam
        ( exact 5 Nov 1986 )
        ( [ ( Mikkel, Child, from4Nov2019 )
          , ( Ines, Adult, Belongs )
          ]
        )
        ( sep 1 3 )
        "Ines starts to look after Mikkel"

    , Event
        Adam
        ( exact 5 Nov 1986 )
        ( [ ( Helge, Adult, Belongs )
          , ( Claudia, Adult, Belongs )
          ]
        )
        ( sep 1 3 )
        "Adult-Helge gives Claudia with 'Journey Through Time' book"

    , Event
        Adam
        ( exact 5 Nov 1986 )
        ( [ ( Bernd, Old, Belongs )
          , ( Claudia, Adult, Belongs )
          ]
        )
        ( sep 1 3 )
        "Old-Bernd tells Claudia about nuclear power plant accident that created God Particle material, shows her barrels hidden in caves"

    , Event
        Adam
        ( exact 5 Nov 1986 )
        ( [ ( Hanno_Noah, Adult, TraveledFromUnknown )
          , ( Mikkel, Child, from4Nov2019 )
          ]
        )
        ( sep 1 5 )
        "Adult-Noah visits Mikkel in the hospital"

    , Event
        Adam
        ( exact 5 Nov 1986 )
        ( [ ( Hannah, Teen, Belongs )
          , ( Mikkel, Child, from4Nov2019 )
          ]
        )
        ( sep 1 5 )
        "Young Hannah meets Mikkel"

    {- Nov 8 -}

    , Event
        Adam
        ( exact 8 Nov 1986 )
        ( [ ( Jonas, Teen, from8Nov2019_ )
          ]
        )
        ( sep 1 6 )
        "Jonas comes out from the caves and finds himself in the past"

    {- Nov 9 -}

    , Event
        Adam
        ( exact 9 Nov 1986 )
        ( [ ( Jonas, Teen, from8Nov2019_ )
          , ( Mikkel, Child, from4Nov2019 )
          , ( Hannah, Teen, Belongs )
          ]
        )
        ( sep 1 7 )
        "Jonas finds Mikkel at the hospital and sees him with young-Hannah"

    , Event
        Adam
        ( exact 9 Nov 1986 )
        ( [ ( Jonas, Teen, from8Nov2019_ )
          , ( Mikkel, Child, from4Nov2019 )
          , ( Jonas, Adult, TraveledFromUnknown )
          ]
        )
        ( sep 1 7 )
        "Stranger-Jonas stops Jonas from bringing Mikkel back to 2019"

    , Event
        Adam
        ( exact 9 Nov 1986 )
        ( [ ( Jonas, Adult, TraveledFromUnknown )
          , ( HGTannhaus, Old, Belongs )
          ]
        )
        ( sep 1 8 )
        "Stranger-Jonas visits Tannhaus and shows him the broken time travel machine"

    , Event
        Adam
        ( exact 9 Nov 1986 )
        ( [ ( HGTannhaus, Old, Belongs )
          , ( Claudia, Old, TraveledFromUnknown )
          ]
        )
        ( sep 1 8 )
        "Tannhaus reveals a brand-new time travel machine he built based on Claudia's blueprints"

    , Event
        Adam
        ( exact 9 Nov 1986 )
        ( [ ( Helge, Old, from8Nov2019 )
          , ( Helge, Adult, Belongs )
          ]
        )
        ( sep 1 9 )
        "Old-helge arrives from 2019 and follows his adult-self"

    , Event
        Adam
        ( exact 9 Nov 1986 )
        ( [ ( Boris_Aleksander, Teen, Belongs )
          , ( Regina, Teen, Belongs )
          ]
        )
        ( sep 1 9 )
        "Boris Niewald arrives in Winden and meets Young-Regina"

    , Event
        Adam
        ( exact 9 Nov 1986 )
        ( [ ( Boris_Aleksander, Teen, Belongs )
          ]
        )
        ( sep 1 9 )
        "Boris adopts the false identity of Aleksander Kohler (by killing him?)"

    , Event
        Adam
        ( exact 9 Nov 1986 )
        ( [ ( Hanno_Noah, Adult, TraveledFromUnknown )
          , ( Helge, Adult, Belongs )
          ]
        )
        ( sep 1 9 )
        "Adult-Noah and adult-Helge work in the bunker on the time machine"

    , Event
        Adam
        ( exact 9 Nov 1986 )
        ( [ ( Boris_Aleksander, Adult, Belongs )
          , ( Claudia, Adult, Belongs )
          ]
        )
        ( sep 1 9 )
        "Aleksander begins working with Claudia at the power plant"

    {- Nov 12 -}

    , Event
        Adam
        ( exact 12 Nov 1986 )
        ( [ ( Jonas, Adult, TraveledFromUnknown )
          , ( HGTannhaus, Old, Belongs )
          , ( Ulrich, Adult, from8Nov2019 )
          ]
        )
        ( sep 1 10 )
        "Tannhaus gives Stranger-Jonas the brand-new time machine and shows him how Ulrich's cell phone helps it work"

    , Event
        Adam
        ( exact 12 Nov 1986 )
        ( [ ( Jonas, Teen, from12Nov2019 )
          ]
        )
        ( sep 1 10 )
        "Jonas arrives from 2019 again"

    , Event
        Adam
        ( exact 12 Nov 1986 )
        ( [ ( Jonas, Teen, from12Nov2019 )
          , ( Hanno_Noah, Adult, TraveledFromUnknown )
          , ( Helge, Adult, Belongs )
          ]
        )
        ( sep 1 10 )
        "Adult-Helge and adult-Noah kidnap Jonas and bring him to the bunker"

    , Event
        Adam
        ( exact 12 Nov 1986 )
        ( [ ( Helge, Old, from8Nov2019 )
          , ( Helge, Adult, Belongs )
          ]
        )
        ( sep 1 10 )
        "Old-Helge crashes his car into his adult-Helge's car. The old-Helge dies but adult-Helge survives and is permanently hospotalized"

    , Event
        Adam
        ( exact 12 Nov 1986 )
        ( [ ( Jonas, Adult, Wormhole )
          ]
        )
        ( sep 1 10 )
        "Stranger-Jonas opens the wormhole using the time machine in the cave passage"

    , Event
        Adam
        ( exact 12 Nov 1986 )
        ( [ ( Jonas, Teen, from12Nov2019 )
          , ( Helge, Teen, Wormhole )
          ]
        )
        ( sep 1 10 )
        "Jonas sees the wormhole open inside the bunker and reaches through to touch Helge"

    , Event
        Adam
        ( exact 12 Nov 1986 )
        ( [ ( Jonas, Teen, to12Nov2052 )
          ]
        )
        ( sep 1 10 )
        "Jonas is transported to 2052"

    ]


