/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import Commander from "@ff/core/Commander";
import System from "@ff/graph/System";
import CGraph from "@ff/graph/components/CGraph";
import CPulse from "@ff/graph/components/CPulse";
import COscillator from "@ff/graph/components/COscillator";

import { componentTypes } from "@ff/graph/components";
import { componentTypes as componentTypes3D } from "@ff/scene/components";

import CRenderer from "@ff/scene/components/CRenderer";
import CPickSelection from "@ff/scene/components/CPickSelection";
import CTransform from "@ff/scene/components/CTransform";
import CCamera from "@ff/scene/components/CCamera";
import CDirectionalLight from "@ff/scene/components/CDirectionalLight";
import CPointLight from "@ff/scene/components/CPointLight";
import CSpotLight from "@ff/scene/components/CSpotLight";
import CBackground from "@ff/scene/components/CBackground";
import CFloor from "@ff/scene/components/CFloor";
import CGrid from "@ff/scene/components/CGrid";
import CNavigator from "@ff/scene/components/CNavigator";
import CPhongMaterial from "@ff/scene/components/CPhongMaterial";
import CImageTexture from "@ff/scene/components/CImageTexture";
import CVideoTexture from "@ff/scene/components/CVideoTexture";

import * as helper from "@ff/scene/helper";

import DockView, { DockContentRegistry } from "@ff/ui/DockView";
import HierarchyTreeView from "@ff/scene/ui/HierarchyTreeView";

import ContentView from "./editor/ContentView";
import PropertyTreeView from "./editor/PropertyTreeView";

import CustomElement, { customElement } from "@ff/ui/CustomElement";

import "./styles.scss";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-foundation-editor")
export class Application extends CustomElement
{
    protected system: System;
    protected commander: Commander;

    constructor()
    {
        super();

        this.system = new System();
        this.system.registry.add(componentTypes);
        this.system.registry.add(componentTypes3D);

        const inflate = false;

        if (inflate) {
            const scene = `{"nodes":[{"id":"UJ4IWJpabcfG","name":"Main","components":[{"type":"CPulse","id":"SXPk5uqCgbsp"},{"type":"CRenderer","id":"Zo0K9vvSg2AV"},{"type":"CPickSelection","id":"50RBEnGvGPd8"}]},{"id":"9ggZqqMZjDWp","name":"Scene","components":[{"type":"CScene","id":"bYRqFzWbVblB","children":["0OlnMh516Lx9","e2ySCKYfcOo6","TYkqAWqXplyG"]}]},{"id":"TEBQ0qjRaMx5","name":"Camera","components":[{"type":"CTransform","id":"0OlnMh516Lx9","children":[]},{"type":"CCamera","id":"rPUNPouSOcUa","ins":{"position":{"value":[0,0,50]}}}]},{"id":"ajxEwrVkTHNZ","name":"Light","components":[{"type":"CTransform","id":"e2ySCKYfcOo6","children":[]},{"type":"CDirectionalLight","id":"s7UZWkIIqUAl","ins":{"position":{"value":[0,0,1]}}}]},{"id":"6JIx1ag93XPw","name":"Box","components":[{"type":"CTransform","id":"TYkqAWqXplyG","ins":{"rotation":{"value":[0.00002542283673365414,0,0.00002542283673365414]}},"children":[]},{"type":"CMesh","id":"3FTunnxVE778"},{"type":"CBox","id":"lwwmglkiJy9C"},{"type":"CPhongMaterial","id":"mZYsiYq1VjN1"}]},{"id":"PS6bFC2ZW0Wp","name":"Aux","components":[{"type":"COscillator","id":"zYRh97yLkTuQ","name":"Rotator","ins":{"run":{"value":true},"max":{"value":90},"curve":{"value":11},"mode":{"value":2},"duration":{"value":2}},"outs":{"value":{"links":[{"id":"TYkqAWqXplyG","key":"rotation","dstIndex":0},{"id":"TYkqAWqXplyG","key":"rotation","dstIndex":2}]}}}]}]}`;
            this.system.inflate(JSON.parse(scene));
        }
        else {
            this.commander = new Commander();
            const mainGraph = this.system.graph;

            const main = mainGraph.createNode("Main");
            main.createComponent(CPulse);
            main.createComponent(CRenderer);
            main.createComponent(CPickSelection).createActions(this.commander);
            const sceneGraph = main.createComponent(CGraph).innerGraph;

            const scene = helper.createScene(sceneGraph, "Scene");
            scene.createComponent(CBackground);
            scene.createComponent(CFloor);
            scene.createComponent(CGrid);


            const camera = helper.createCamera(scene, "Camera");
            camera.components.get(CCamera).ins.position.setValue([ 0, 0, 50 ]);
            camera.createComponent(CNavigator);

            const light = helper.createSpotLight(scene, "Light");
            light.components.get(CSpotLight).ins.position.setValue([ 0, 10, 1 ]);

            const box = helper.createBox(scene, "Box");
            const boxTransform = box.components.get(CTransform);
            const tex = box.createComponent(CVideoTexture);
            box.getComponent(CPhongMaterial).ins.colorMap.linkFrom(tex.outs.self);

            const aux = sceneGraph.createNode("Aux");
            const osc = aux.createComponent(COscillator, "Rotator");

            osc.ins.max.setValue(180);
            osc.ins.duration.setValue(2);
            osc.ins.start.set();
            osc.outs.value.linkTo(boxTransform.ins.rotation, undefined, 0);
            osc.outs.value.linkTo(boxTransform.ins.rotation, undefined, 2);
        }


        this.system.findNodeByName("Main").components.get(CPulse).start();
        //setTimeout(() => console.log(this.system.graph.toString(true)), 100);

        window["dump"] = () => console.log(JSON.stringify(this.system.deflate()));
    }

    firstUpdated()
    {
        const registry: DockContentRegistry = new Map();
        registry.set("renderer", () => new ContentView(this.system));
        registry.set("hierarchy", () => new HierarchyTreeView(this.system));
        registry.set("properties", () => new PropertyTreeView(this.system));

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