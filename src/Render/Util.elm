module Render.Util exposing (..)


import List.Extra as List exposing (gatherWith)

import Svg exposing (Svg)
import Svg as S exposing (..)
import Svg.Attributes as SA exposing (..)
import Html as H exposing (..)
import Html.Attributes as HA exposing (..)

import Compare exposing (Comparator)


type Label = Label String


labelAs : String -> Label
labelAs = Label


type alias Sized a = ( { width : Float, height : Float }, a )


noSize : a -> Sized a
noSize = sized 0 0


withoutSize : Sized a -> a
withoutSize = Tuple.second


sized : Float -> Float -> a -> Sized a
sized w h = Tuple.pair { width = w, height = h }


translate : Float -> Float -> String
translate x y
    = "transform: translate("
        ++ String.fromFloat x ++ "px, "
        ++ String.fromFloat y ++ "px);"


distribute : Float -> List a -> List ( Float, a )
distribute margin = List.indexedMap (\idx val -> ( toFloat idx * margin, val ))


wrapText : Int -> Int -> String -> Svg msg
wrapText width height stringToWrap =
    S.foreignObject
        [ SA.width <| String.fromInt width
        , SA.height <| String.fromInt height
        ]
        [ H.p
            [ HA.style "font-family" "sans-serif"
            , HA.style "font-size" "13px"
            ]
            [ H.text stringToWrap ]
        ]


{- based on `mapAccuml` from `list-extra` -}
mapAccum : ( a -> b -> ( b, c ) ) -> b -> List a -> ( b, List c )
mapAccum f acc0 list =
    let
        ( accFinal, generatedList ) =
            List.foldl
                (\x ( acc1, ys ) ->
                    let ( acc2, y ) = f x acc1
                    in ( acc2, y :: ys )
                )
                ( acc0, [] )
                list
    in
    ( accFinal, List.reverse generatedList )


{-| Acts like `List.Extra.gatherWith`, but stores all the matched elements in the second part of the tuple and uses `(a -> b)` function to create "markers" for equal elements.

    groupBy (==) String.fromInt [1,2,1,3,2]
    --> [("1",[1,1]),("2",[2,2]),("3",[3])]
    groupBy
        (==)
        (String.fromInt >> String.toList >> List.head >> Maybe.withDefault '-')
        [11,21,11,30,22]
    --> [('1',[11,11]),('2',[21]),('2',[22]),('3',[30])]

-}
groupBy : (a -> a -> Bool) -> (a -> b) -> List a -> List (b, List a)
groupBy comparator convert =
    List.gatherWith comparator
        >> List.map (\(head, tail) -> ( convert head, head::tail ))


{-| Same as `groupBy`, but uses equalilty operator for comparison. NB: Be aware that comparison
is done by `a` and not by `b`! Unfortunatelty, in this case Elm can not guarantee that with its type system, so this thing can easily pass unnoticed. If you want the comparison by `b`, use `groupByEquals1` with the same signature. Pay attention to the difference in the second example.

    groupByEquals String.fromInt [1,2,1,3,2]
    --> [("1",[1,1]),("2",[2,2]),("3",[3])]
    groupByEquals1
        (String.fromInt >> String.toList >> List.head >> Maybe.withDefault '-')
        [11,21,11,30,22]
    --> [('1',[11,11]),('2',[21]),('2',[22]),('3',[30])]

-}
groupByEquals : (a -> b) -> List a -> List (b, List a)
groupByEquals = groupBy (==)


{-| Like `List.Extra.gatherWith`, but uses `(a -> b)` function to create "markers" for equal elements and compare them for equality instead of `a`s, also stores all the matched elements in the second part of the tuple.

    groupBy1 (==) String.fromInt [1,2,1,3,2]
    --> [("1",[1,1]),("2",[2,2]),("3",[3])]
    groupBy1
        (==)
        (String.fromInt >> String.toList >> List.head >> Maybe.withDefault '-')
        [11,21,11,30,22]
    --> [('1',[11,11]),('2',[21,22]),('3',[30])]

-}
groupBy1 : (b -> b -> Bool) -> (a -> b) -> List a -> List (b, List a)
groupBy1 comparator convert = groupBy (\a b -> comparator (convert a) (convert b)) convert


{-| Same as `groupBy1`, but uses equalilty operator for comparison. NB: Be aware that comparison
is done by `b` and not by `a`! Unfortunatelty, in this case Elm can not guarantee that with its type system, so this thing can easily pass unnoticed. If you want the comparison by `a`, use `groupByEquals` with the same signature. Pay attention to the difference in the second example.

    groupByEquals1 String.fromInt [1,2,1,3,2]
    --> [("1",[1,1]),("2",[2,2]),("3",[3])]
    groupByEquals1
        (String.fromInt >> String.toList >> List.head >> Maybe.withDefault '-')
        [11,21,11,30,22]
    --> [('1',[11,11]),('2',[21,22]),('3',[30])]

-}
groupByEquals1 : (a -> b) -> List a -> List (b, List a)
groupByEquals1 = groupBy1 (==)


groupSplitBy : (a -> a -> Bool) -> (a -> Maybe b) -> List a -> ( List a, List ( b, List a ) )
groupSplitBy comparator convertToMaybe =
    List.partition
            (\a -> case convertToMaybe a of
                Just _ -> True
                _ -> False)
        >> flip
        >> Tuple.mapSecond
            (groupBy comparator convertToMaybe
                >> List.filterMap
                    (\( maybeMarker, item ) ->
                        case maybeMarker of
                            Just marker -> Just ( marker, item )
                            Nothing -> Nothing
                    ))


groupSplitByEquals : (a -> Maybe b) -> List a -> ( List a, List ( b, List a ) )
groupSplitByEquals = groupSplitBy (==)


groupSplitBy1 : (b -> b -> Bool) -> (a -> Maybe b) -> List a -> ( List a, List ( b, List a ) )
groupSplitBy1 comparator convert =
    groupSplitBy
        (\a b -> case ( convert a, convert b ) of
            ( Just v1, Just v2 ) -> comparator v1 v2
            _ -> False
        )
        convert


groupSplitByEquals1 : (a -> Maybe b) -> List a -> ( List a, List ( b, List a ) )
groupSplitByEquals1 = groupSplitBy1 (==)


{-| Helps when one needs to group events by participants, or artworks by artists, who could possibly be multiple for each artwork, all this w/o caring that the items could repeat in each group. -}
participants : (b -> comparable) -> (a -> List b) -> List a -> List (b, List a)
participants toComparable extract =
    List.concatMap
            (\item ->
                item
                    |> extract
                    |> List.map (\marker -> ( (toComparable marker, marker), item ))
            )
        >> groupBy1 (\a b -> Tuple.first a == Tuple.first b) Tuple.first
        >> List.map (Tuple.mapBoth Tuple.second (List.map Tuple.second))


flip : ( a, b ) -> ( b, a )
flip ( a, b ) = ( b, a )


firstInTriplet : ( a, b, c ) -> a
firstInTriplet (a, _, _ ) = a


secondInTriplet : ( a, b, c ) -> ( b, c )
secondInTriplet (_, b, c ) = ( b, c )


triplet : a -> ( b, c ) -> ( a, b, c )
triplet a ( b, c ) = ( a, b, c )


mapSecondInTriplet : (( b, c ) -> ( d, e )) -> ( a, b, c ) -> ( a, d, e )
mapSecondInTriplet f ( a, b, c ) =
    case f (b, c) of
        ( d, e ) -> ( a, d, e )


mapSecondToTuple : ( b -> ( c, d ) ) -> ( a, b ) -> ( a, c, d )
mapSecondToTuple f ( a, b ) =
    case f b of
        ( c, d ) -> ( a, c, d )


mapThird : (c -> d) -> ( a, b, c ) -> ( a, b, d )
mapThird f ( a, b, c ) = ( a, b, f c )
