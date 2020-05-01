#!/bin/bash
# PULL ALL LIBRARIES

function pull {
    echo "----- pull $1 -----"
    cd $PWD/$1
    git pull
    cd ..
}

pull ff-browser
pull ff-core
pull ff-gl
pull ff-graph
pull ff-react
pull ff-scene
pull ff-three
pull ff-ui
