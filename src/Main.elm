module Main exposing (..)


import Browser

import Html exposing (Html)
import Html as H


type alias Model = ()


type alias Msg = ()


init : () -> ( Model, Cmd Msg )
init _ = ( (), Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update _ model = ( model, Cmd.none )


subscription : Model -> Sub Msg
subscription _ = Sub.none



view : Model -> Html Msg
view _ = H.div [] []


main : Program () () ()
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscription
        , view = view
        }


