module Timeline exposing (..)


import Time exposing (..)
import World exposing (..)
import Person exposing (..)
import Event exposing (..)


type alias Timeline = List Event

travelOfStrangerTeam : Existence
travelOfStrangerTeam = TraveledFrom (exact 27 Jun 2020) Adam <| sep 2 8


strangerTeamFrom2020 : Participants
strangerTeamFrom2020 =
    [ ( Jonas, Adult )
    , ( Magnus, Teen )
    , ( Franziska, Teen )
    , ( Bartosz, Teen )
    ] |> theyAll travelOfStrangerTeam


theUnknowns : Participants
theUnknowns =
    [ ( Unknown, Child )
    , ( Unknown, Adult )
    , ( Unknown, Old )
    ] |> theyAll TraveledFromUnknown


adamAtStartOf19xx : Participant
adamAtStartOf19xx =
    ( Jonas, Old, travelOfStrangerTeam )


gustav : Participant
gustav = ( Gustav, Old, Belongs )


martha2from2019 : Participant
martha2from2019 =
    ( Martha_2
    , Teen
    , TraveledFrom ( exact 4 Nov 2019 ) Eva ( sep 3 1 ) -- also episode 2
    )


strangerJonasFrom2020 : Participant
strangerJonasFrom2020 =
    ( Jonas
    , Adult
    , TraveledFrom (exact 27 Jun 2020) Adam <| sep 2 8
    )


siljaFrom2053 : Participant
siljaFrom2053 =
    ( Silja
    , Teen
    , TraveledFrom_ (throughout 2053)
    )


to22Sep2053 : Existence
to22Sep2053 = TravelsTo (exact 22 Sep 2053) Adam <| sep 3 4


from2040 : Existence
from2040 = TraveledFrom (throughout 2040) Adam <| sep 3 7


to20Jun2019 : Existence
to20Jun2019 = TravelsTo (exact 20 Jun 2019) Adam <| sep 2 6


to27Jun2020 : Existence
to27Jun2020 = TravelsTo (exact 27 Jun 2020) Adam <| sep 2 8


from8Nov2019 : Existence
from8Nov2019 = TraveledFrom (exact 8 Nov 2019 ) Adam <| sep 1 8


from12Nov2019 : Existence
from12Nov2019 = TraveledFrom (exact 12 Nov 2019 ) Adam <| sep 1 10


from12Nov1986 : Existence
from12Nov1986 = TraveledFrom (exact 12 Nov 1986 ) Adam <| sep 1 10


to12Nov1986 : Existence
to12Nov1986 = TravelsTo (exact 12 Nov 1986 ) Adam <| sep 1 10


from23Jun1987 : Existence
from23Jun1987 = TraveledFrom (exact 23 Jun 1987 ) Adam <| sep 2 3


to23Jun1921 : Existence
to23Jun1921 = TravelsTo (exact 23 Jun 1921) Adam <| sep 2 3


from23Jun1954 : Existence
from23Jun1954 = TraveledFrom (exact 23 Jun 1954) Adam <| sep 2 3



{- 1888 -}

y1888 : Timeline
y1888 =
    -- June 27
    [ Event
        Adam
        ( exact 27 Jun 1888 )
        strangerTeamFrom2020
        ( season 3 )
        "Stranger-Jonas, and young Bartosz, Franziska, and Magnus arrive from 2020"
    , Event
        Adam
        ( exact 27 Jun 1888 )
        ( (strangerTeamFrom2020 |> theyAll_ Belongs) ++ [ gustav ] )
        ( season 3 )
        "The team of Stranger-Jonas meet Gustav Tannhaus and become new Sic Mundus group"
    , Event
        Adam
        ( exact 21 Sep 1888 )
        [ martha2from2019 ]
        ( sep 3 1 )
        "Martha-2 arrives to the Tannhaus factory"
    -- Sep 21
    , Event
        Adam
        ( exact 21 Sep 1888 )
        ( theUnknowns ++ [ gustav ] )
        ( sep 3 3 )
        "The Unknowns travel to 1988 and kill Gustav Tannhaus"
    , Event
        Adam
        ( exact 21 Sep 1888 )
        ( [ martha2from2019, strangerJonasFrom2020 ] )
        ( sep 3 3 )
        "Martha-2 gives Stranger-Jonas the God Particle material so he can make a time-travel portal"
    , Event
        Adam
        ( exact 21 Sep 1888 )
        ( [ martha2from2019 |> changeExistense to22Sep2053 ] )
        ( sep 3 3 )
        "Martha-2 uses her own time-travel device to return to 2053"
    -- Sep 22
    , Event
        Adam
        ( exact 22 Sep 1888 )
        ( [ strangerJonasFrom2020 ] )
        ( sep 3 6 )
        "Stranger-Jonas burns the letter from Martha-3"
    , Event
        Adam
        ( exact 22 Sep 1888 )
        ( [ strangerJonasFrom2020
          , ( Martha_2, Adult, TraveledFromUnknown )
          ]
        )
        ( sep 3 6 )
        "Adult-Martha-3 travels to 1988 and leaves a new letter on Stranger-Jonas' desk"
    ]


{- 1890 -}

y1890 : Timeline
y1890 =
    [ Event
        Adam
        ( throughout 1890 )
        ( [ strangerJonasFrom2020
          ]
        )
        ( sep 3 7 )
        "Stranger-Jonas continues working on portal"
    , Event
        Adam
        ( throughout 1890 )
        ( [ strangerJonasFrom2020
          , siljaFrom2053
          , ( Bartosz, Adult, travelOfStrangerTeam )
          ]
        )
        ( sep 3 7 )
        "Bartosz begins to break faith with Jonas and meets Silja when she arrives from 2053"
    ]


{- 1904 -}

y1904 : Timeline
y1904 =
    [ Event
        Adam
        ( throughout 1904 )
        ( [ siljaFrom2053 |> changeAge Adult
          , ( Hanno_Noah, Child, Birth )
          ]
        )
        ( sep 3 7 )
        "Adult-Silja gives birth to a baby boy and names him Hanno (aka Noah)"
    ]



{- 1910 -}

y1910 : Timeline
y1910 =
    [ Event
        Adam
        ( throughout 1910 )
        ( [ siljaFrom2053 |> changeAge Adult
          , ( Agnes, Child, Birth )
          ]
        )
        ( sep 3 7 )
        "Adult-Silja gives birth to a baby girl and names her Agnes"
    ]


{- 1911 -}

y1911 : Timeline
y1911 =
    [ Event
        Adam
        ( throughout 1911 )
        ( [ ( Hannah, Adult, TraveledFromUnknown )
          , ( Silja, Teen, TraveledFromUnknown )
          ]
        )
        ( sep 3 7 )
        "Adult-Hanna arrives from the future with Young Silja"
    , Event
        Adam
        ( throughout 1911 )
        ( [ adamAtStartOf19xx
          , ( Hannah, Adult, Death )
          ]
        )
        ( sep 3 7 )
        "Stranger-Jonas, who has now become Adam, kills adult-Hannah"
    , Event
        Adam
        ( throughout 1911 )
        ( [ adamAtStartOf19xx
          , ( Silja, Child, TravelsToUnknown )
          ]
        )
        ( sep 3 7 )
        "Stranger-Jonas, who has now become Adam, sends Silja to the future with the working time portal"
    ]



{- 1920 -}

y1920 : Timeline
y1920 =
    [ Event
        Adam
        ( throughout 1910 )
        ( [ adamAtStartOf19xx
          , ( Hanno_Noah, Adult, from2040 )
          ]
        )
        ( sep 3 7 )
        "Adult-Noah arrives from 2040 and starts working for Adam"
    ]


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
    ]
