module Timeline.Y2020 exposing (y2020)


import Time exposing (..)
import Person exposing (..)
import Event exposing (..)

import Timeline.Def exposing (..)
import Person exposing (PersonId(..))


{- 2020 -}

y2020 : Timeline
y2020 =

    {- Jun 21 -}

    [ Event
        Adam
        ( exact 21 Jun 2020 )
        ( [ ( Clausen, Adult, Belongs )
          ]
        )
        ( sep 2 1 )
        "Clausen is placed in charge of the Winden police task force"

    , Event
        Adam
        ( exact 21 Jun 2020 )
        ( [ ( Martha, Teen, Belongs )
          , ( Bartosz, Teen, Belongs )
          ]
        )
        ( sep 2 1 )
        "Martha breaks up with Bartosz"

    , Event
        Adam
        ( exact 21 Jun 2020 )
        ( [ ( Jonas, Adult, TraveledFromUnknown )
          , ( Hannah, Adult, Belongs )
          ]
        )
        ( sep 2 1 )
        "Stranger-Jonas reveals himself to Hannah and tells her about time travel"

    , Event
        Adam
        ( exact 21 Jun 2020 )
        ( [ ( Hanno_Noah, Adult, from21Jun1921 )
          , ( Hannah, Adult, Belongs )
          ]
        )
        ( sep 2 1 )
        "Adult-Noah arrives from 1921 and meets Bartosz with the suitcase containing the time machine"

    , Event
        Adam
        ( exact 21 Jun 2020 )
        ( [ ( Jonas, Adult, TraveledFromUnknown )
          , ( Hannah, Adult, Belongs )
          ]
        )
        ( sep 2 1 )
        "Stranger-Jonas shows Hannah his time machine and they use it to travel to 1987"

    , Event
        Adam
        ( exact 21 Jun 2020 )
        ( [ ( Claudia, Adult, TraveledFromUnknown )
          ]
        )
        ( sep 2 4 )
        "Claudia visits the Winden library and learns about Regina and Alexander's marriage, her own disappearance from 1987, and Egon's death"

    , Event
        Adam
        ( exact 21 Jun 2020 )
        ( [ ( Hannah, Adult, Belongs )
          , ( Charlotte, Adult, Belongs )
          , ( Peter, Adult, Belongs )
          , ( Katharina, Adult, Belongs )
          ]
        )
        ( sep 2 4 )
        "Hannah, Charlotte, and Peter tell Katharina about time travel and how Mikkel and Ulric are stuck in the past"

    , Event
        Adam
        ( exact 21 Jun 2020 )
        ( [ ( Martha, Teen, Belongs )
          , ( Magnus, Teen, Belongs )
          , ( Franziska, Teen, Belongs )
          , ( Bartosz, Teen, Belongs )
          ]
        )
        ( sep 2 4 )
        "Martha, Magnus, and Fransizka find Bartosz with the time machine in the caves"

    , Event
        Adam
        ( exact 21 Jun 2020 )
        ( [ ( Claudia, Adult, to21Jun1987 )
          ]
        )
        ( sep 2 4 )
        "Claudia travels back to 1987"


    {- Jun 25 -}

    , Event
        Adam
        ( exact 25 Jun 2020 )
        ( [ ( Hanno_Noah, Adult, TraveledFromUnknown )
          , ( Charlotte, Adult, Belongs )
          ]
        )
        ( sep 2 5 )
        "Adult-Noah arrives reveals Charlotte that he's her father"

    , Event
        Adam
        ( exact 25 Jun 2020 )
        ( [ ( Martha, Teen, Belongs )
          , ( Magnus, Teen, Belongs )
          , ( Franziska, Teen, Belongs )
          , ( Bartosz, Teen, Belongs )
          ]
        )
        ( sep 2 5 )
        "Martha, Magnus, Franziska, and Elisabeth take the time machine from Bartocz"

    , Event
        Adam
        ( exact 25 Jun 2020 )
        ( [ ( Jonas, Adult, TraveledFromUnknown )
          , ( Martha, Teen, Belongs )
          ]
        )
        ( sep 2 5 )
        "Stranger-Jonas leaves the St. Christopher necklace in Martha's room"

    {- Jun 26 -}

    , Event
        Adam
        ( exact 26 Jun 2020 )
        ( [ ( Hannah, Adult, to26Jun1954 )
          , ( Jonas, Adult, TraveledFromUnknown )
          ]
        )
        ( sep 2 7 )
        "Hannah steals the time machine from Stranger-Jonas and uses it to travel back to 1954"

    , Event
        Adam
        ( exact 26 Jun 2020 )
        ( [ ( Magnus, Teen, Belongs )
          , ( Bartosz, Teen, Belongs )
          , ( Katharina, Adult, Belongs )
          ]
        )
        ( sep 2 7 )
        "Magnus gives Bartosz's time machine to Katharina"

    {- Jun 27 -}

    , Event
        Adam
        ( exact 27 Jun 2020 )
        ( [ ( Jonas, Adult, TraveledFromUnknown )
          , ( Katharina, Adult, to27Jun1987 )
          ]
        )
        ( sep 2 8 )
        "Katharina leaves the Bartosz's time machine with Stranger-Jonas, and uses the caves to travel to 1987"

    , Event
        Adam
        ( exact 27 Jun 2020 )
        ( [ ( Hanno_Noah, Teen, TraveledFromUnknown )
          , ( Jonas, Adult, TraveledFromUnknown )
          , ( Martha_3, Teen, TraveledFromUnknown )
          ]
        )
        ( sep 2 8 )
        "Young-Noah gives Stranger-Jonas the letter from Martha-3 which says he must let her die"

    , Event
        Adam
        ( exact 27 Jun 2020 )
        ( [ ( Jonas, Adult, to27Jun1888 )
          , ( Magnus, Teen, to27Jun1888 )
          , ( Franziska, Teen, to27Jun1888 )
          , ( Bartosz, Teen, to27Jun1888 )
          ]
        )
        ( sep 2 8 )
        "Stranger-Jonas saves Magnus, Franziska, and Bartosz by using the time machine to bring them to 1888"

    , Event
        Adam
        ( exact 27 Jun 2020 )
        ( [ ( Martha, Teen, Belongs )
          ]
        )
        ( sep 2 8 )
        "Martha leaves the bunker and goes back to the Kahnwald house"

    , Event
        Adam
        ( exact 27 Jun 2020 )
        ( [ ( Martha, Teen, Belongs )
          , ( Jonas, Teen, Belongs ) -- Teen? Belongs?
          ]
        )
        ( sep 2 8 )
        "Martha finds Jonas in the Kahnwald house and they kiss"

    , Event
        Adam
        ( exact 27 Jun 2020 )
        ( [ ( Clausen, Adult, Belongs )
          , ( Charlotte, Adult, Belongs )
          ]
        )
        ( sep 2 8 )
        "Clausen finds the radioactive waste barrels and orders them opened, while Charlotte tries and fails to stop him"

    , Event
        Adam
        ( exact 27 Jun 2020 )
        ( [
          ]
        )
        ( sep 2 8 )
        "The God Particle is released, opening a wormhole"

    , Event
        Adam
        ( exact 27 Jun 2020 )
        ( [ ( Claudia, Adult, Belongs )
          , ( Regina, Adult, Belongs )
          ]
        )
        ( sep 2 8 )
        "Claudia brings adult-Regina into the bunker"

    , Event
        Adam
        ( exact 27 Jun 2020 )
        ( [ ( Peter, Adult, Belongs )
          , ( Elisabeth, Teen, Belongs )
          , ( Hanno_Noah, Teen, Belongs )
          ]
        )
        ( sep 2 8 )
        "Peter, Elisabeth, and young-Noah make it to the bunker"

    , Event
        Adam
        ( exact 27 Jun 2020 )
        ( [ ( Charlotte, Adult, TravelsToUnknown_ 2053 )
          , ( Elisabeth, Adult, Wormhole )
          ]
        )
        ( sep 2 8 )
        "Charlotte sees adult-Elisabeth through the wormhole, and reaches to touch her, transporting herself to 2053"

    , Event
        Adam
        ( exact 27 Jun 2020 )
        ( [ ( Jonas, Old, TraveledFromUnknown_ 1921 ) -- FIXME: we know wherefrom?
          , ( Martha, Teen, Death )
          ]
        )
        ( sep 2 8 )
        "Adam arrives from 1921 and kills Martha"

    , Event
        Adam
        ( exact 27 Jun 2020 )
        ( [ ( Jonas, Teen, to4Nov2019 )
          , ( Martha_2, Teen, to4Nov2019 )
          ]
        )
        ( sep 2 8 )
        "First reality: Martha-2 arrives in Jonas' world and uses her own time machine to bring them to November 4, 2019, in World Two"

    , Event
        Adam
        ( exact 27 Jun 2020 )
        ( [ ( Jonas, Teen, Belongs )
          , ( Claudia, Adult, Belongs )
          ]
        )
        ( sep 3 6 )
        "From killing Martha by Adam, a second reality forms where Jonas simply hides in the basement and survives on his own, eventually pairing up with Claudia and becoming Stranger-Jonas"

    , Event
        Adam
        ( exact 27 Jun 2020 )
        ( [ ( Martha_2, Teen, TraveledFromUnknown ) -- FIXME: we know wherefrom?
          , ( Bartosz, Teen, Belongs ) -- FIXME: this Bartosz is from the spin-world
          , ( Martha_3, Old, TraveledFromUnknown )  -- FIXME: we know where she is?
          ]
        )
        ( sep 3 7 )
        "In the second reality formed From killing Martha by Adam, Martha-2 is intercepted by Bartosz-2 and brought to Eva, making her Martha-3"

    , Event
        Adam
        ( exact 27 Jun 2020 )
        ( [ ( Jonas, Teen, Belongs ) -- FIXME: travels to origin world
          , ( Jonas, Old, TraveledFromUnknown_ 1921 ) -- FIXME: we know wherefrom?
          ]
        )
        ( sep 3 8 )
        "In a third reality, formed after the killing of Martha by Adam, Adam saves Jonas and explains how he needs to him to travel to the origin world and save Tannhaus family"

    , Event
        Adam
        ( exact 27 Jun 2020 )
        ( [
          ]
        )
        ( sep 2 8 )
        "The apocalypse happens in world one"

    {- Sep 22 -}

    , Event
        Adam
        ( exact 22 Sep 2020 )
        ( [ ( Regina, Adult, Belongs )
          , ( Claudia, Adult, Belongs )
          ]
        )
        ( sep 3 2 )
        "Claudia is living in the abandoned police station with Regina"

    , Event
        Adam
        ( exact 22 Sep 2020 )
        ( [ ( Peter, Adult, Belongs )
          , ( Elisabeth, Teen, Belongs )
          , ( Benni, Adult, Death ) -- Death?
          , ( Charlotte, Adult, TravelsToUnknown ) -- Unknown?
          , ( Franziska, Adult, TravelsToUnknown ) -- Unknown?
          ]
        )
        ( sep 3 2 )
        "Peler and Elisabeth are living in Benni's old trailer searching for Charlotte and Franziska among the reports of the dead bodied found"

    , Event
        Adam
        ( exact 22 Sep 2020 )
        ( [ ( Tronte, Old, to22Sep2020 )
          , ( Regina, Old, Death )
          ]
        )
        ( sep 3 2 )
        "Old-Tronte travels to 2020 and kills Regina on Old-Claudia's orders"

    {- Sep 23 -}

    , Event
        Adam
        ( exact 23 Sep 2020 )
        ( [ ( Claudia_2, Old, Belongs )
          , ( Claudia, Old, TraveledFromUnknown )
          ]
        )
        ( sep 3 5 )
        "Claudia-2 (from World Two) visits Claudia and gives her the brand new Trinity notebook"

    , Event
        Adam
        ( exact 23 Sep 2020 )
        ( [ ( Claudia, Old, TraveledFromUnknown )
          ]
        )
        ( sep 3 5 )
        "Claudia begins working for Eva and ensuring the cycle of events stays the same"

    , Event
        Adam
        ( exact 23 Sep 2020 )
        ( [ ( Elisabeth, Teen, Belongs )
          , ( Peter, Adult, Death )
          ]
        )
        ( sep 3 5 )
        "Elisabeth is attacked by a stranger, who kills Peter before Elisabeth kills him"

    , Event
        Adam
        ( exact 23 Sep 2020 )
        ( [ ( Elisabeth, Teen, Belongs )
          , ( Hanno_Noah, Teen, Belongs ) -- Belongs?
          ]
        )
        ( sep 3 5 )
        "Elisabeth goes to live with young-Noah in the caves"

     {- Sep 24 -}

    , Event
        Adam
        ( exact 23 Sep 2020 )
        ( [ ( Claudia, Adult, Belongs )
          , ( Jonas, Teen, Belongs )
          ]
        )
        ( sep 3 6 )
        "Claudia goes to the power plant, where Jonas finds her and starts working with her to try and turn the God Particle into a time travel portal"

    ]
