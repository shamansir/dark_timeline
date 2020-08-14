module Timeline exposing (timeline)


import Event exposing (Event)


import Timeline.Y1888 exposing (y1888)
import Timeline.Y1890 exposing (y1890)
import Timeline.Y1904 exposing (y1904)
import Timeline.Y1910 exposing (y1910)
import Timeline.Y1911 exposing (y1911)
import Timeline.Y1920 exposing (y1920)
import Timeline.Y1921 exposing (y1921)
import Timeline.Y1953 exposing (y1953)
import Timeline.Y1954 exposing (y1954)
import Timeline.Y1971 exposing (y1971)
import Timeline.Y1974 exposing (y1974)
import Timeline.Y1986 exposing (y1986)
import Timeline.Y1987 exposing (y1987)
import Timeline.Y2019 exposing (y2019)
import Timeline.Y2020 exposing (y2020)
import Timeline.Y2023 exposing (y2023)
import Timeline.Y2040 exposing (y2040)
import Timeline.Y2052 exposing (y2052)
import Timeline.Y2053 exposing (y2053)


type alias Timeline = List Event


timeline : Timeline
timeline
    =  y1888
    ++ y1890
    ++ y1904
    ++ y1910
    ++ y1911
    ++ y1920
    ++ y1921
    ++ y1953
    ++ y1954
    ++ y1971
    ++ y1974
    ++ y1986
    ++ y1987
    ++ y2019
    ++ y2020
    ++ y2023
    ++ y2040
    ++ y2052
    ++ y2053
