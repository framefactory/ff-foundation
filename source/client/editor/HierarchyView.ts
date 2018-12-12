/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import RenderSystem from "@ff/three/ecs/RenderSystem";

import CustomElement, { customElement } from "@ff/ui/CustomElement";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-hierarchy-view")
export default class HierarchyView extends CustomElement
{
    protected system: RenderSystem;

    constructor(system: RenderSystem)
    {
        super();
        this.system = system;
    }

}