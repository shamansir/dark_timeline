module Gen.Def exposing (..)


import Person exposing (..)
import Event exposing (World(..))

import List.Unique as UniqueList exposing (filterDuplicates)

import Graph exposing (Graph)
import Graph as Graph


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


participantsOf : Fact -> ( PersonId, PersonId )
participantsOf ( from, _, to ) = ( from, to )


-- relationshipsFor : World -> Relationsips



toGraph : WorldRelationships -> Graph PersonId Relationship
toGraph (_, facts) =
    let
        uniquePersons =
            List.map participantsOf facts
                |> List.foldl (\(p1, p2) list -> p1 :: p2 :: list) []
                |> UniqueList.filterDuplicates
        indexedUniquePersons =
            uniquePersons
                |> List.indexedMap Tuple.pair
        indexOf person =
            indexedUniquePersons
                |> List.filterMap (\(idx, otherPerson) -> if otherPerson == person then Just idx else Nothing)
                |> List.head
        toNode (idx, person) = Graph.Node idx person
        toEdge (personA, rel, personB) =
            Graph.Edge
                (indexOf personA |> Maybe.withDefault -1)
                (indexOf personB |> Maybe.withDefault -1)
                rel
    in
        Graph.fromNodesAndEdges
            (indexedUniquePersons |> List.map toNode)
            (facts |> List.map toEdge)