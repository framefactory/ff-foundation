/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import RenderSystem from "@ff/three/ecs/RenderSystem";

import {
    registerComponents,
    BasicMaterial,
    Box,
    Camera,
    Mesh,
    Oscillator,
    Scene,
    Torus,
    Transform
} from "@ff/three/ecs/components";

import * as helper from "@ff/three/ecs/helper";

import DockView, { DockContentRegistry } from "@ff/ui/DockView";
import ContentView from "./editor/ContentView";
import HierarchyView from "./editor/HierarchyView";
import PropertyView from "./editor/PropertyView";

import CustomElement, { customElement } from "@ff/ui/CustomElement";

import "./styles.scss";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-application")
export class Application extends CustomElement
{
    protected system: RenderSystem;

    constructor()
    {
        super();

        this.system = new RenderSystem();
        registerComponents(this.system.registry);

        this.system.start();

        const scene = helper.createScene(this.system.module, "Scene");
        const camera = helper.createCamera(scene, "Camera");
        camera.setValue("Transform:Position", [ 0, 0, 50 ]);

        const light = helper.createDirectionalLight(scene, "Light");
        light.setValue("DirectionalLight:Position", [ 0, 0, 1 ]);

        const box = helper.createBox(scene, "Box");
        const boxTransform = box.components.get(Transform);

        const aux = this.system.module.createEntity("Aux");
        const osc = aux.createComponent(Oscillator);
        //osc.outs.result.linkTo(boxTransform.ins.rotation, undefined, 0);
        osc.outs.linkTo("Result", boxTransform.ins, "Rotation[0]");
        osc.outs.linkTo("Result", boxTransform.ins, "Rotation[2]");

        setTimeout(() => console.log(this.system.module.toString(true)), 100);
        //setTimeout(() => console.log(scene.components.get(Scene).scene), 100);
    }

    firstUpdated()
    {
        const registry: DockContentRegistry = new Map();
        registry.set("renderer", () => new ContentView(this.system));
        registry.set("hierarchy", () => new HierarchyView(this.system));
        registry.set("inspector", () => new PropertyView(this.system));

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
                        contentId: "inspector",
                        text: "Inspector"
                    }]
                }]
            }]
        }, registry);

        dockView.setPanelsMovable(true);
    }
}