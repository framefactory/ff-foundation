/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

"use strict";

const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

////////////////////////////////////////////////////////////////////////////////

const projectDir = path.resolve(__dirname, "../..");
const targetDir = path.resolve(projectDir, "services/server/static/app");

////////////////////////////////////////////////////////////////////////////////

module.exports = merge(common, {
    // build mode
    mode: "production",

    output: {
        path: targetDir,
        filename: "js/[name].min.js"
    },
});