/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import Selection from "@ff/graph/Selection";

import PropertyTree from "@ff/ui/graph/PropertyTree";
import CustomElement, { customElement } from "@ff/ui/CustomElement";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-property-tree-view")
export default class PropertyTreeView extends CustomElement
{
    protected controller: Selection;

    constructor(controller: Selection)
    {
        super();
        this.controller = controller;
    }

    firstConnected()
    {
        this.setStyle({
            position: "absolute",
            top: "0", left: "0", bottom: "0", right: "0",
            overflowY: "auto"
        });

        this.classList.add("ff-tree-view");

        this.appendChild(new PropertyTree(this.controller));
    }
}