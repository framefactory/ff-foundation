#!/bin/bash

export NPM_SCRIPT=watch:component
export WATCH_COMPONENT=$(echo ${1:-default})
echo "starting container in watch mode, watching component '$WATCH_COMPONENT'"

npm run up
