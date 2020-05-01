/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import Property, { types } from "@ff/graph/Property";

import CustomElement, { customElement, html, property } from "@ff/ui/CustomElement";

//import * as Benchmark from "benchmark";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-benchmarks")
export class Application extends CustomElement
{
    render()
    {
        return html`Benchmarks!`;
    }
}


