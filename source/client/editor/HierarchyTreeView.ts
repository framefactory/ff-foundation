/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import SelectionController from "@ff/graph/SelectionController";

import HierarchyTree from "@ff/ui/graph/HierarchyTree";
import CustomElement, { customElement } from "@ff/ui/CustomElement";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-hierarchy-tree-view")
export default class HierarchyTreeView extends CustomElement
{
    protected controller: SelectionController;

    constructor(controller: SelectionController)
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

        this.appendChild(new HierarchyTree(this.controller));
    }
}