module Render.Util exposing (..)


translate : Float -> Float -> String
translate x y
    = "transform: translate("
        ++ String.fromFloat x ++ "px, "
        ++ String.fromFloat y ++ "px);"


distribute : Float -> List a -> List ( Float, a )
distribute margin = List.indexedMap (\idx val -> ( toFloat idx * margin, val ))
