/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import PropertyTree from "@ff/scene/ui/PropertyTree";
import SelectionView, { customElement } from "@ff/scene/ui/SelectionView";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-property-tree-view")
export default class PropertyTreeView extends SelectionView
{
    firstConnected()
    {
        super.firstConnected();

        this.setStyle({
            position: "absolute",
            top: "0", left: "0", bottom: "0", right: "0",
            overflowY: "auto"
        });

        this.classList.add("ff-tree-view");

        this.appendChild(new PropertyTree(this.system));
    }
}