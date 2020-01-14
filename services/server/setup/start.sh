#!/bin/bash
# DOCKER IMAGE STARTUP SCRIPT
# NODE SERVER ENTRYPOINT

# make sure path for node, npm and module binaries is registered
source /root/.nvm/nvm.sh

# application root directory
cd /app

# first time installation of node modules
if [ ! -d "node_modules" ]; then
  npm install
fi

# build client and server code
npm run build

# start server in debug/development mode, watching source code changes
npm run watch

