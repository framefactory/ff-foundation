/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import System from "@ff/graph/System";

import HierarchyTree from "@ff/ui/graph/HierarchyTree";
import SelectionView, { customElement } from "@ff/ui/graph/SelectionView";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-hierarchy-tree-view")
export default class HierarchyTreeView extends SelectionView
{
    constructor(system?: System)
    {
        super(system);

        this.onClick = this.onClick.bind(this);
        this.addEventListener("click", this.onClick);
    }

    protected firstConnected()
    {
        super.firstConnected();

        this.setStyle({
            position: "absolute",
            top: "0", left: "0", bottom: "0", right: "0",
            overflowY: "auto"
        });

        this.classList.add("ff-tree-view");

        this.appendChild(new HierarchyTree(this.system));
    }

    protected onClick()
    {
        this.selection.clearSelection();
    }
}