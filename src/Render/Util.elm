module Render.Util exposing (..)


import Svg exposing (Svg)
import Svg as S exposing (..)
import Svg.Attributes as SA exposing (..)
import Html as H exposing (..)
import Html.Attributes as HA exposing (..)


type Label = Label String


labelAs : String -> Label
labelAs = Label


type alias Sized a = ( { width : Float, height : Float }, a )


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


{- the copy of `mapAccuml` from `list-extra` -}
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
