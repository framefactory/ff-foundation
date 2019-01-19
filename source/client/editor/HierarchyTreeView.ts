/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import System from "@ff/graph/System";
import Graph from "@ff/graph/Graph";

import HierarchyTree from "@ff/ui/graph/HierarchyTree";
import SelectionView, { customElement } from "@ff/ui/graph/SelectionView";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-hierarchy-tree-view")
export default class HierarchyTreeView extends SelectionView
{
    protected tree: HierarchyTree = null;

    constructor(system?: System)
    {
        super(system);

        this.addEventListener("click", this.onClick.bind(this));
        this.addEventListener("dblclick", this.onDblClick.bind(this));
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

        this.tree = new HierarchyTree(this.system, this.system.graph);
        this.appendChild(this.tree);
    }

    protected onClick()
    {
        this.selection.clearSelection();
    }

    protected onDblClick()
    {
        const graph = this.tree.root as Graph;
        if (graph.parent) {
            this.tree.root = graph.parent.graph;
        }
    }
}