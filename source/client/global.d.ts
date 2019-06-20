/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

declare module '!raw-loader!*' {
    const contents: string;
    export = contents;
}

// Webpack constant: build version
declare const ENV_VERSION: string;
// Webpack constant: true during development build
declare const ENV_DEVELOPMENT: boolean;
// Webpack constant: true during production build
declare const ENV_PRODUCTION: boolean;