#!/bin/bash

export NPM_SCRIPT=watch
export WATCH_COMPONENT=$(echo $1)
echo "starting container in watch mode, watching component $WATCH_COMPONENT"

npm run up
