module Timeline exposing (..)


import Time exposing (..)
import World exposing (..)
import Person exposing (..)
import Event exposing (..)


type alias Timeline = List Event


strangerTeamFrom2020 : Participants
strangerTeamFrom2020 =
    [ ( Jonas, Adult )
    , ( Magnus, Teen )
    , ( Franziska, Teen )
    , ( Bartocz, Teen )
    ] |> theyAll (TraveledFrom (exact 27 Jun 2020) Adam <| sep 2 8)


theUnknowns : Participants
theUnknowns =
    [ ( Unknown, Child )
    , ( Unknown, Adult )
    , ( Unknown, Old )
    ] |> theyAll TraveledFromUnknown



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


y1988 : Timeline
y1988 =
    -- June 27
    [ Event
        Adam
        ( exact 27 Jun 1888 )
        strangerTeamFrom2020
        ( season 3 )
        "*Stranger-Jonas*, and young *Bartocz*, *Franziska*, and *Magnus* arrive from 2020"
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
