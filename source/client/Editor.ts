/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import Commander from "@ff/core/Commander";

import RenderSystem from "@ff/scene/RenderSystem";
import SelectionController from "@ff/scene/SelectionController";

import Oscillator from "@ff/graph/components/Oscillator";

import { componentTypes as componentTypes3D } from "@ff/scene/components";
import Transform from "@ff/scene/components/Transform";
import Camera from "@ff/scene/components/Camera";

import * as helper from "@ff/scene/helper";

import DockView, { DockContentRegistry } from "@ff/ui/DockView";
import ContentView from "./editor/ContentView";
import HierarchyTreeView from "./editor/HierarchyTreeView";
import PropertyTreeView from "./editor/PropertyTreeView";

import CustomElement, { customElement } from "@ff/ui/CustomElement";

import "./styles.scss";
import DirectionalLight from "@ff/scene/components/DirectionalLight";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-foundation-editor")
export class Application extends CustomElement
{
    protected system: RenderSystem;
    protected commander: Commander;
    protected selectionController: SelectionController;

    constructor()
    {
        super();

        this.system = new RenderSystem();
        this.system.registry.registerComponentType(Oscillator);
        this.system.registry.registerComponentType(componentTypes3D);

        this.commander = new Commander();
        this.selectionController = new SelectionController(this.system, this.commander);

        this.system.start();

        const scene = helper.createScene(this.system.graph, "Scene");
        const camera = helper.createCamera(scene, "Camera");
        camera.components.get(Camera).ins.offset.setValue([ 0, 0, 50 ]);

        const light = helper.createDirectionalLight(scene, "Light");
        light.components.get(DirectionalLight).ins.position.setValue([ 0, 0, 1 ]);

        const box = helper.createBox(scene, "Box");
        const boxTransform = box.components.get(Transform);

        const aux = this.system.graph.createNode("Aux");
        const osc = aux.createComponent(Oscillator, "Rotator");

        osc.ins.max.setValue(180);
        osc.ins.duration.setValue(2);
        osc.outs.value.linkTo(boxTransform.ins.rotation, undefined, 0);
        osc.outs.value.linkTo(boxTransform.ins.rotation, undefined, 2);

        setTimeout(() => console.log(this.system.graph.toString(true)), 100);
        //setTimeout(() => console.log(scene.components.get(Scene).scene), 100);
    }

    firstUpdated()
    {
        const registry: DockContentRegistry = new Map();
        registry.set("renderer", () => new ContentView(this.system));
        registry.set("hierarchy", () => new HierarchyTreeView(this.selectionController));
        registry.set("properties", () => new PropertyTreeView(this.selectionController));

        const dockView = this.appendElement(DockView, {
            position: "absolute",
            top: "0", left: "0", bottom: "0", right: "0"
        });

        dockView.setLayout({
            type: "strip",
            direction: "horizontal",
            size: 1,
            elements: [{
                type: "stack",
                size: 0.7,
                activePanelIndex: 0,
                panels: [{
                    contentId: "renderer",
                    text: "Renderer"
                }]
            }, {
                type: "strip",
                direction: "vertical",
                size: 0.3,
                elements: [{
                    type: "stack",
                    size: 0.5,
                    activePanelIndex: 0,
                    panels: [{
                        contentId: "hierarchy",
                        text: "Hierarchy"
                    }]
                }, {
                    type: "stack",
                    size: 0.5,
                    activePanelIndex: 0,
                    panels: [{
                        contentId: "properties",
                        text: "Inspector"
                    }]
                }]
            }]
        }, registry);

        dockView.setPanelsMovable(true);
    }
}