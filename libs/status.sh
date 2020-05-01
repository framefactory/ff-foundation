#!/bin/bash
# CHECK STATUS OF ALL LIBRARIES

function status {
    echo "----- status $1 -----"
    cd $PWD/$1
    git status -s -b
    cd ..
}

status ff-browser
status ff-core
status ff-gl
status ff-graph
status ff-react
status ff-scene
status ff-three
status ff-ui
