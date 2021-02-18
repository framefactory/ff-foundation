/**
 * Webpack configuration
 * Typescript / SCSS
 */

"use strict";

require("dotenv").config();

const path = require("path");
const mkdirp = require("mkdirp");
const childProcess = require("child_process");
const webpack = require("webpack");

const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

let projectVersion = "v0.0.0";
try {
    projectVersion = childProcess.execSync("git describe --tags").toString().trim();
}
catch {}

////////////////////////////////////////////////////////////////////////////////
// PROJECT / COMPONENTS

const projectDir = path.resolve(__dirname, "../..");

const dirs = {
    source: path.resolve(projectDir, "source"),
    assets: path.resolve(projectDir, "assets"),
    output: path.resolve(projectDir, "services/server"),
    modules: path.resolve(projectDir, "node_modules"),
    libs: path.resolve(projectDir, "libs"),
};

// create folders if necessary
mkdirp.sync(dirs.output)

// module search paths
const modules = [
    dirs.libs,
    dirs.modules,
];

// import aliases
const alias = {
    "client": path.resolve(dirs.source, "client"),
    "@ff/core": "@framefactory/core/source",
    "@ff/browser": "ff-browser/source",
    "@ff/gl": "ff-gl/source",
    "@ff/graph": "ff-graph/source",
    "@ff/react": "ff-react/source",
    "@ff/scene": "ff-scene/source",
    "@ff/two": "ff-two/source",
    "@ff/three": "ff-three/source",
    "@ff/ui": "ff-ui/source",
};

// static assets to be copied to build output
const assets = [
    // { source: path.resolve(dirs.assets, "image.jpg"), target: path.resolve(dirs.output, "images/image.jpg") }
];

////////////////////////////////////////////////////////////////////////////////

const components = {
    // Lib ff-ui web component development
    "default": {
        name: "editor",
        title: "FF Editor",
        version: projectVersion,
        subdir: "public/built",
        entry: "client/editor/index.ts",
        template: "client/index.hbs",
        element: "ff-application",
    },
    "elements": {
        name: "elements",
        title: "FF Elements",
        version: projectVersion,
        subdir: "public/built",
        entry: "client/elements/index.ts",
        template: "client/index.hbs",
        element: "ff-application",
    },
    // Lib ff-ui docking panels
    "panels": {
        name: "panels",
        title: "FF Panels",
        version: projectVersion,
        subdir: "public/built",
        entry: "client/panels/index.ts",
        template: "client/index.hbs",
        element: "ff-application",
    },
    "trees": {
        name: "trees",
        title: "FF Trees",
        version: projectVersion,
        subdir: "public/built",
        entry: "client/trees/index.ts",
        template: "client/index.hbs",
        element: "ff-application",
    },
    "transition": {
        name: "transition",
        title: "FF Transition",
        version: projectVersion,
        subdir: "public/built",
        entry: "client/transitions/index.ts",
        template: "client/index.hbs",
        element: "ff-application",
    },
};

////////////////////////////////////////////////////////////////////////////////

module.exports = function(env, argv)
{
    const environment = {
        isDevMode: argv.mode !== undefined ? argv.mode !== "production" : process.env["NODE_ENV"] !== "production",
    };

    console.log(`
WEBPACK - PROJECT BUILD CONFIGURATION
      build mode: ${environment.isDevMode ? "development" : "production"}
   source folder: ${dirs.source}
   output folder: ${dirs.output}
  modules folder: ${dirs.modules}
  library folder: ${dirs.libs}`);

    // copy assets
    assets.forEach(asset => {
        fs.copySync(asset.source, asset.target, { overwrite: true });
    });

    const componentKey = argv.component !== undefined ? argv.component : "default";

    if (componentKey === "all") {
        return Object.keys(components).map(key => createBuildConfiguration(environment, dirs, components[key]));
    }

    const component = components[componentKey];
    if (component === undefined) {
        throw new Error(`[webpack.config.js] can't build, component not existing: '${componentKey}'`);
    }

    return createBuildConfiguration(environment, dirs, components[componentKey]);
}

////////////////////////////////////////////////////////////////////////////////

function createBuildConfiguration(environment, dirs, component)
{
    const isDevMode = environment.isDevMode;
    const buildMode = isDevMode ? "development" : "production";
    const devTool = isDevMode ? "source-map" : undefined;

    const displayTitle = `${component.title} ${component.version} ${isDevMode ? "DEV" : "PROD"}`;

    const outputDir = path.resolve(dirs.output, component.subdir);
    mkdirp.sync(outputDir);

    const jsOutputFileName = isDevMode ? "js/[name].dev.js" : "js/[name].min.js";
    const cssOutputFileName = isDevMode ? "css/[name].dev.css" : "css/[name].min.css";
    const htmlOutputFileName = isDevMode ? `${component.name}.dev.html` : `${component.name}.html`;
    const htmlElement = component.element ? `<${component.element}></${component.element}>` : undefined;

    console.log(`
WEBPACK - COMPONENT BUILD CONFIGURATION
     component: ${component.name}
         title: ${displayTitle}
       version: ${component.version}
 output folder: ${outputDir}
       js file: ${jsOutputFileName}
      css file: ${cssOutputFileName}
     html file: ${htmlOutputFileName}
  html element: ${htmlElement}`);

    return {
        mode: buildMode,
        devtool: devTool,

        entry: {
            [component.name]: path.resolve(dirs.source, component.entry),
        },

        output: {
            path: outputDir,
            filename: jsOutputFileName,
        },

        resolve: {
            // module search paths
            modules,
            // library aliases
            alias,
            // Resolvable extensions
            extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs", ".json"],
        },


        optimization: {
            minimize: !isDevMode,

            minimizer: [
                new TerserPlugin({ parallel: true }),
                new OptimizeCSSAssetsPlugin({}),
            ]
        },

        plugins: [
            new webpack.DefinePlugin({
                ENV_PRODUCTION: JSON.stringify(!isDevMode),
                ENV_DEVELOPMENT: JSON.stringify(isDevMode),
                ENV_VERSION: JSON.stringify(component.version),
            }),
            new MiniCssExtractPlugin({
                filename: cssOutputFileName,
            }),
            new HTMLWebpackPlugin({
                filename: htmlOutputFileName,
                template: path.resolve(dirs.source, component.template),
                title: displayTitle,
                version: component.version,
                isDevelopment: isDevMode,
                element: htmlElement,
                chunks: [ component.name ],
            })
        ],

        module: {
            rules: [
                {
                    // Enforce source maps for all javascript files
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader",
                },
                {
                    // Typescript
                    test: /\.tsx?$/,
                    use: [{
                        loader: "ts-loader",
                        options: { compilerOptions: { noEmit: false } },
                    }],
                },
                {
                    // Raw text and shader files
                    test: /\.(txt|glsl|hlsl|frag|vert|fs|vs)$/,
                    loader: "raw-loader"
                },
                {
                    // SCSS
                    test: /\.s[ac]ss$/i,
                    use: [
                        isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    // CSS
                    test: /\.css$/,
                    use: [
                        isDevMode ? "style-loader" : MiniCssExtractPlugin.loader,
                        "css-loader",
                    ]
                },
                {
                    // Handlebars templates
                    test: /\.hbs$/,
                    loader: "handlebars-loader",
                },
            ],
        },
    };
}
