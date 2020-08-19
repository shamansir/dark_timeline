module Render.Label exposing (..)


import Svg exposing (Svg)
import Svg as S
import Svg.Attributes as SA
import Render.Util exposing (Label(..), Sized, translate)


height = 20


add : Label -> Sized (Svg msg) -> Sized (Svg msg)
add (Label label) ( size, to ) =
    (
        { width = size.width
        , height = size.height + height
        }
    , S.g
        [ ]
        [ S.text_ [ SA.dominantBaseline "hanging" ] [ S.text label ]
        , S.g
            [ SA.style <| translate 0 height ]
            [ to ]
        ]
    )
