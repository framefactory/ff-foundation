/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

"use strict";

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

////////////////////////////////////////////////////////////////////////////////

module.exports = merge(common, {
    // build mode
    mode: "development",

    // Enable source maps for debugging webpack's output.
    devtool: "source-map",
});