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


y1888 : Timeline
y1888 =
    -- June 27
    [ Event
        Adam
        ( exact 27 Jun 1888 )
        strangerTeamFrom2020
        ( season 3 )
        "*Stranger-Jonas*, and young *Bartosz*, *Franziska*, and *Magnus* arrive from 2020"
    , Event
        Adam
        ( exact 27 Jun 1888 )
        ( (strangerTeamFrom2020 |> theyAll_ Belongs) ++ [ gustav ] )
        ( season 3 )
        "The team of Stranger-Jonas meet Gustav Tannhaus and become new *Sic Mundus* group"
    , Event
        Adam
        ( exact 21 Sep 1888 )
        [ martha2from2019 ]
        ( sep 3 1 )
        "*Martha-2* arrives to the Tannhaus factory"
    -- Sep 21
    , Event
        Adam
        ( exact 21 Sep 1888 )
        ( theUnknowns ++ [ gustav ] )
        ( sep 3 3 )
        "*The Unknowns* travel to 1988 and kill Gustav Tannhaus"
    , Event
        Adam
        ( exact 21 Sep 1888 )
        ( [ martha2from2019, strangerJonasFrom2020 ] )
        ( sep 3 3 )
        "Martha-2 gives Stranger-Jonas the God Particle material so he can make a time-travel portal"
    , Event
        Adam
        ( exact 21 Sep 1888 )
        ( [ martha2from2019 |> changeExistense (TravelsTo (exact 22 Sep 2053) Adam <| sep 3 4) ] )
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
        "*Adult-Martha-3* travels to 1988 and leaves a new letter on Stranger-Jonas' desk"
    ]


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
        "Bartosz begins to break faith with Jonas and meets *Silja* when she arrives from 2053"
    ]


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
        "Adult-Silja gives birth to a baby boy and names him *Hanno* (aka *Noah*)"
    ]


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
        "Adult-Silja gives birth to a baby girl and names her *Agnes*"
    ]


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
        "Adult-*Hanna* arrives from the future with Young Silja"
    , Event
        Adam
        ( throughout 1911 )
        ( [ adamAtStartOf19xx
          , ( Hannah, Adult, Death )
          ]
        )
        ( sep 3 7 )
        "Stranger-Jonas, who has now become *Adam*, kills adult-Hannah"
    , Event
        Adam
        ( throughout 1911 )
        ( [ adamAtStartOf19xx
          , ( Silja, Child, TravelsToUnknown )
          ]
        )
        ( sep 3 7 )
        "Stranger-Jonas, who has now become *Adam*, sends Silja to the future with the working time portal"
    ]


y1920 : Timeline
y1920 =
    [ Event
        Adam
        ( throughout 1910 )
        ( [ adamAtStartOf19xx
          , ( Hanno_Noah, Adult, TraveledFrom (throughout 2040) Adam <| sep 3 7 )
          ]
        )
        ( sep 3 7 )
        "Adult-*Noah* arrives from 2040 and starts working for Adam"
    ]
