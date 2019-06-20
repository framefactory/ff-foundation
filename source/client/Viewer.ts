/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import CustomElement, { customElement, property, html, PropertyValues } from "@ff/ui/CustomElement";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-viewer")
export class Viewer extends CustomElement
{
    protected render()
    {
        return html`<h1>Viewer</h1>`;
    }
}