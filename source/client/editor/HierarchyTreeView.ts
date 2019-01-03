/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import Selection from "@ff/graph/Selection";

import HierarchyTree from "@ff/ui/graph/HierarchyTree";
import CustomElement, { customElement } from "@ff/ui/CustomElement";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-hierarchy-tree-view")
export default class HierarchyTreeView extends CustomElement
{
    protected controller: Selection;

    constructor(controller: Selection)
    {
        super();

        this.onClick = this.onClick.bind(this);

        this.controller = controller;
        this.addEventListener("click", this.onClick);
    }

    protected firstConnected()
    {
        this.setStyle({
            position: "absolute",
            top: "0", left: "0", bottom: "0", right: "0",
            overflowY: "auto"
        });

        this.classList.add("ff-tree-view");

        this.appendChild(new HierarchyTree(this.controller));
    }

    protected onClick()
    {
        this.controller.clearSelection();
    }
}