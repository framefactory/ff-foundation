/**
 * FF Typescript Foundation Library
 *
 * @author Ralph Wiedemeier <ralph@framefactory.io>
 * @copyright (c) 2020 Frame Factory GmbH
 */

import * as sourceMapSupport from "source-map-support";
sourceMapSupport.install();

import "module-alias/register";

import * as path from "path";
import * as http from "http";

import * as express from "express";
import * as morgan from "morgan";

////////////////////////////////////////////////////////////////////////////////
// CONFIGURATION

const port = parseInt(process.env["DOCKER_SERVER_PORT"]) || 8000;
const isDevMode = process.env["NODE_ENV"] !== "production";

const projectDir = path.resolve(__dirname, "../../..");
const builtDir = path.resolve(projectDir, "services/server/public/built");
const staticDir = path.resolve(projectDir, "services/server/public/static");

////////////////////////////////////////////////////////////////////////////////
// GREETING

console.log(`
--------------------------------------------------------------------------------
FF Typescript Foundation Library - Development Server
--------------------------------------------------------------------------------
Port:               ${port}
Development mode:   ${isDevMode}
Project directory:  ${projectDir}
Built files:        ${builtDir} 
Static files:       ${staticDir}
--------------------------------------------------------------------------------
`);

////////////////////////////////////////////////////////////////////////////////

const app = express();
app.disable('x-powered-by');

// logging
if (isDevMode) {
    app.use(morgan("tiny"));
}

// static file server
app.use("/", express.static(builtDir));
app.use("/", express.static(staticDir));

const server = new http.Server(app);
server.listen(port, () => {
    console.info(`Server ready and listening on port ${port}\n`);
});
