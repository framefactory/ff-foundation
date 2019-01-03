/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import * as sourceMapSupport from "source-map-support";
sourceMapSupport.install();

import * as path from "path";

import ExpressServer, { IExpressServerConfiguration } from "./ExpressServer";

////////////////////////////////////////////////////////////////////////////////
// CONFIGURATION

const port = parseInt(process.env["NODE_SERVER_PORT"]) || 8000;
const devMode = process.env.NODE_ENV !== "production";
const localMode = process.env.NODE_SERVER_LOCAL === "true";
const rootDir = process.env["NODE_SERVER_ROOT"] || path.resolve(__dirname, "../../..");
const staticDir = path.resolve(rootDir, "../../dist/");
const docDir = path.resolve(rootDir, "../../doc/code");

////////////////////////////////////////////////////////////////////////////////
// CONFIGURE, START SERVER

console.log([
    "",
    "--------------------",
    "FF Foundation Server",
    "--------------------",
    "Port: " + port,
    "Root Directory: " + rootDir,
    "Development Mode: " + devMode,
    "Local Mode: " + localMode
].join("\n"));

const expressServerConfig: IExpressServerConfiguration = {
    port,
    enableDevMode: devMode,
    enableLogging: devMode,
    staticRoute: "/",
    staticDir,
    docDir
};

const expressServer = new ExpressServer(expressServerConfig);

expressServer.start().then(() => {
    console.info(`\nServer ready and listening on port ${port}`);
});
