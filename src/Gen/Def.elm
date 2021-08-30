module Gen.Def exposing (..)


import Person exposing (..)
import Event exposing (World(..))


type Relationship
    = Father
    | Mother
    | Child
    | AdoptFather
    | AdoptMother
    | Affection


type alias Fact = ( PersonId, Relationship, PersonId )


type alias WorldRelationships = ( World, List Fact )


type alias Relationships = List WorldRelationships



fatherTo = Father


motherTo = Mother


childOf = Child


adoptFatherTo = AdoptFather


adoptMotherTo = AdoptMother


affectedTo = Affection



fact : PersonId -> Relationship -> PersonId -> Fact
fact from rel to = ( from, rel, to )



{- type alias Relationship =
    { father : Maybe PersonId
    , mother : Maybe PersonId
    , children : List PersonId
    }


type alias BoundRelationship = ( World, Relationship )


type alias Tree = List BoundRelationship


childOf : PersonId -> ( PersonId, PersonId ) -> Relationship
childOf child = family [ child ]


family : List PersonId -> ( PersonId, PersonId ) -> Relationship
family children ( father, mother ) =
    { father = Just father
    , mother = Just mother
    , children = children
    }


fatherIs : PersonId -> PersonId -> Relationship
fatherIs child father =
    { father = Just father
    , mother = Nothing
    , children = [ child ]
    }


motherIs : PersonId -> PersonId -> Relationship
motherIs child mother =
    { father = Nothing
    , mother = Just mother
    , children = [ child ]
    }


brothers : PersonId -> PersonId -> Relationship
brothers brotherOne brotherTwo =
    { father = Nothing
    , mother = Nothing
    , children = [ brotherOne, brotherTwo]
    }


addChild : PersonId -> Relationship -> Relationship
addChild child relationship =
    { relationship
    | children = child :: relationship.children
    }


in_ : World -> Relationship -> BoundRelationship
in_ = Tuple.pair


allIn : World -> List Relationship -> List BoundRelationship
allIn = List.map << in_
-}