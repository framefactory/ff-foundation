#!/bin/bash
# PULL ALL LIBRARIES

function pull {
    echo "----- pull $1 -----"
    cd $PWD/$1
    git pull
    cd ..
}

pull ff-core
pull ff-browser
pull ff-graph
pull ff-ui
pull ff-react
pull ff-gl
pull ff-three
pull ff-scene
