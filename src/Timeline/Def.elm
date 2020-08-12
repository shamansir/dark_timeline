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


to27Jun1888 : Existence
to27Jun1888 = TravelsTo (exact 27 Jun 1888) Adam <| sep 2 8


to21Sep1888 : Existence
to21Sep1888 = TravelsTo (exact 21 Sep 1888) Adam <| sep 3 3


from21Jun1921 : Existence
from21Jun1921 = TraveledFrom (exact 21 Jun 1921) Adam <| sep 2 1


to8Nov1953 : Existence
to8Nov1953 = TravelsTo (exact 8 Nov 1953) Adam <| sep 1 8


from10Nov1953 : Existence
from10Nov1953 = TraveledFrom (exact 10 Nov 1953) Adam <| sep 1 8


to11Nov1953 : Existence
to11Nov1953 = TravelsTo (exact 11 Nov 1953) Adam <| sep 1 9


to12Nov1953 : Existence
to12Nov1953 = TravelsTo (exact 12 Nov 1953) Adam <| sep 2 3


to26Jun1954 : Existence
to26Jun1954 = TravelsTo (exact 26 Jun 1954) Adam <| sep 2 7


to5Nov1986 : Existence
to5Nov1986 = TravelsTo (exact 5 Nov 1986) Adam <| sep 1 1


to8Nov1986 : Existence
to8Nov1986 = TravelsTo (exact 8 Nov 1986) Adam <| sep 1 6


from8Nov1986 : Existence
from8Nov1986 = TraveledFrom (exact 8 Nov 1986) Adam <| sep 1 6


from12Nov1986 : Existence
from12Nov1986 = TraveledFrom (exact 12 Nov 1986) Adam <| sep 1 10


to23Jun1921 : Existence
to23Jun1921 = TravelsTo (exact 23 Jun 1921) Adam <| sep 2 3


to12Nov1986 : Existence
to12Nov1986 = TravelsTo (exact 12 Nov 1986) Adam <| sep 1 10


to21Jun1987 : Existence
to21Jun1987 = TravelsTo (exact 21 Jun 1921) Adam <| sep 2 2


to27Jun1987 : Existence
to27Jun1987 = TravelsTo (exact 27 Jun 1921) Adam <| sep 2 8


from23Jun1987 : Existence
from23Jun1987 = TraveledFrom (exact 23 Jun 1987) Adam <| sep 2 3


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


to4Nov2019 : Existence
to4Nov2019 = TravelsTo (exact 4 Nov 2019) Eva <| sep 2 8


to6Nov2019 : Existence
to6Nov2019 = TravelsTo (exact 6 Nov 2019) Eva <| sep 3 3


from4Nov2019 : Existence
from4Nov2019 = TraveledFrom (exact 4 Nov 2019) Adam <| sep 1 1


from8Nov2019_ : Existence
from8Nov2019_ = TraveledFrom (exact 8 Nov 2019) Adam <| sep 1 6


from8Nov2019 : Existence
from8Nov2019 = TraveledFrom (exact 8 Nov 2019) Adam <| sep 1 8


from12Nov2019 : Existence
from12Nov2019 = TraveledFrom (exact 12 Nov 2019) Adam <| sep 1 10


from2040 : Existence
from2040 = TraveledFrom (throughout 2040) Eva <| sep 3 7


to22Sep2020 : Existence
to22Sep2020 = TravelsTo (exact 20 Sep 2020) Adam <| sep 3 2


to12Nov2052 : Existence
to12Nov2052 = TravelsTo (exact 12 Nov 2052) Adam <| sep 1 10


from5Nov2052 : Existence
from5Nov2052 = TraveledFrom (exact 5 Nov 2052) Eva <| sep 3 3


to5Nov2052 : Existence
to5Nov2052 = TravelsTo (exact 5 Nov 2052) Eva <| sep 3 3


to6Nov2052 : Existence
to6Nov2052 = TravelsTo (exact 6 Nov 2052) Eva <| sep 3 5


from6Nov2052 : Existence
from6Nov2052 = TravelsTo (exact 6 Nov 2052) Eva <| sep 3 3


to22Sep2053 : Existence
to22Sep2053 = TravelsTo (exact 22 Sep 2053) Adam <| sep 3 4


-- to7Nov2053 : Existence
-- to7Nov2053 = TravelsTo (exact 7 Nov 2053) Eva <| sep 3 6




