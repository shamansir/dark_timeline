module Timeline.Def exposing (..)


import Time exposing (..)
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


from10Nov1953 : Existence
from10Nov1953 = TraveledFrom (exact 10 Nov 1953) Adam <| sep 1 8


to12Nov1953 : Existence
to12Nov1953 = TravelsTo (exact 12 Nov 1953) Adam <| sep 2 3


from12Nov1986 : Existence
from12Nov1986 = TraveledFrom (exact 12 Nov 1986) Adam <| sep 1 10


to12Nov1986 : Existence
to12Nov1986 = TravelsTo (exact 12 Nov 1986) Adam <| sep 1 10


from23Jun1987 : Existence
from23Jun1987 = TraveledFrom (exact 23 Jun 1987) Adam <| sep 2 3


to23Jun1921 : Existence
to23Jun1921 = TravelsTo (exact 23 Jun 1921) Adam <| sep 2 3


from23Jun1954 : Existence
from23Jun1954 = TraveledFrom (exact 23 Jun 1954) Adam <| sep 2 3


to20Jun2019 : Existence
to20Jun2019 = TravelsTo (exact 20 Jun 2019) Adam <| sep 2 6


from26Jun2020 : Existence
from26Jun2020 = TraveledFrom (exact 26 Jun 2020) Adam <| sep 2 7


to27Jun2020 : Existence
to27Jun2020 = TravelsTo (exact 27 Jun 2020) Adam <| sep 2 8


from27Jun2020 : Existence
from27Jun2020 = TraveledFrom (exact 27 Jun 2020) Adam <| sep 2 8


theWormhole : Existence
theWormhole = Wormhole -- == from27Jun2020?


from4Nov2019 : Existence
from4Nov2019 = TraveledFrom (exact 4 Nov 2019) Adam <| sep 1 1


from8Nov2019_ : Existence
from8Nov2019_ = TraveledFrom (exact 8 Nov 2019) Adam <| sep 1 6


from8Nov2019 : Existence
from8Nov2019 = TraveledFrom (exact 8 Nov 2019) Adam <| sep 1 8


from12Nov2019 : Existence
from12Nov2019 = TraveledFrom (exact 12 Nov 2019) Adam <| sep 1 10


from2040 : Existence
from2040 = TraveledFrom (throughout 2040) Adam <| sep 3 7


to12Nov2052 : Existence
to12Nov2052 = TravelsTo (exact 12 Nov 2052) Adam <| sep 1 10


to22Sep2053 : Existence
to22Sep2053 = TravelsTo (exact 22 Sep 2053) Adam <| sep 3 4




