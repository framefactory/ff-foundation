/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import * as sourceMapSupport from "source-map-support";
sourceMapSupport.install();

import * as path from "path";
import * as http from "http";

import * as express from "express";
import * as morgan from "morgan";

////////////////////////////////////////////////////////////////////////////////
// CONFIGURATION

const port: number = parseInt(process.env["FOUNDATION_SERVER_PORT"]) || 8000;
const devMode: boolean = process.env["NODE_ENV"] !== "production";

const rootDir = path.resolve(__dirname, "../../..");
const staticDir = path.resolve(rootDir, "dist/");
const docDir = path.resolve(rootDir, "docs/_site/");

////////////////////////////////////////////////////////////////////////////////
// CONFIGURE, START SERVER

console.log(`

--------------------------------",
FF Foundation Development Server",
--------------------------------",
Port:              ${port}
Root Directory:    ${rootDir}
Development Mode:  ${devMode}

`);

////////////////////////////////////////////////////////////////////////////////

const app = express();
app.disable('x-powered-by');

// logging
if (devMode) {
    app.use(morgan("tiny"));
}

// static file server
app.use("/", express.static(staticDir));

// error handling
app.use((error, req, res, next) => {
    console.error(error);

    if (res.headersSent) {
        return next(error);
    }

    if (req.accepts("json")) {
        // send JSON formatted error
        res.status(500).send({ error: `${error.name}: ${error.message}` });
    }
    else {
        // send error page
        res.status(500).render("errors/500", { error });
    }
});

const server = new http.Server(app);
server.listen(port, () => {
    console.info(`Server ready and listening on port ${port}\n`);
});
