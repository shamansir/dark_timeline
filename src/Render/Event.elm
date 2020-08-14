module Render.Event exposing (view)


import Svg as Svg
import Svg exposing (Svg)

import Msg exposing (Msg)

import Person exposing (..)
import Event exposing (..)


view : Event -> Svg Msg
view event = Svg.g [] [ Svg.text_ [] [ Svg.text event.description ] ]
