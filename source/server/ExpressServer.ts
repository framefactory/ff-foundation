

import * as http from "http";

import * as express from "express";
import { Router } from "express";

import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as handlebars from "express-handlebars";

////////////////////////////////////////////////////////////////////////////////

/** Configuration options for [[ExpressServer]] class */
export interface IExpressServerConfiguration
{
    port?: number;
    enableDevMode?: boolean;
    enableLogging?: boolean;
    staticRoute?: string;
    staticDir?: string;
    viewsDir?: string;
    defaultLayout?: string;
}

export default class ExpressServer
{
    static readonly defaultConfiguration: IExpressServerConfiguration = {
        port: 8000,
        enableDevMode: false,
        enableLogging: false,
        staticRoute: "/static",
    };

    readonly config: IExpressServerConfiguration;
    readonly app: express.Application;
    readonly server: http.Server;

    constructor(config?: IExpressServerConfiguration)
    {
        this.config = Object.assign({}, ExpressServer.defaultConfiguration, config);

        this.app = express();
        this.app.disable('x-powered-by');

        this.server = new http.Server(this.app);

        if (this.config.enableLogging) {
            this.app.use(morgan("tiny"));
        }

        // static file server
        if (this.config.staticDir) {
            this.app.use(this.config.staticRoute, express.static(this.config.staticDir));
        }

        // body parsing
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        // setup handlebars templates
        if (this.config.viewsDir) {
            this.app.engine(".hbs", handlebars({
                extname: ".hbs"
            }));
            this.app.set("view engine", ".hbs");
            this.app.set("views", this.config.viewsDir);
        }
    }

    use(baseRoute: string, router: { router: Router })
    {
        if (router.router) {
            this.app.use(baseRoute, router.router);
        }
    }

    start(): Promise<void>
    {
        this.addErrorHandling();

        const port = this.config.port;

        return new Promise((resolve, reject) => {
            this.server.listen(port, err => {
                if (err) {
                    return reject(new Error(err));
                }

                return resolve();
            });
        });
    }

    protected addErrorHandling()
    {
        this.app.use((error, req, res, next) => {

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
    }
}