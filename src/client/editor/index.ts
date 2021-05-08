/**
 * FF Typescript Foundation Library
 * Copyright 2021 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import Commander from "@ff/core/Commander";
import System from "@ff/graph/System";
import Node from "@ff/graph/Node";
import CGraph from "@ff/graph/components/CGraph";
import CPulse from "@ff/graph/components/CPulse";
import COscillator from "@ff/graph/components/COscillator";

import { components as graphComponents } from "@ff/graph/components";
import { components as sceneComponents } from "@ff/scene/components";

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
import CScene from "@ff/scene/components/CScene";
import CRenderGraph from "@ff/scene/components/CRenderGraph";

import * as helper from "@ff/scene/helper";

import DockView, { DockContentRegistry } from "@ff/ui/DockView";
import HierarchyTreeView from "@ff/scene/ui/HierarchyTreeView";

import ContentView from "./ContentView";
import PropertyTreeView from "./PropertyTreeView";

import CustomElement, { customElement } from "@ff/ui/CustomElement";

import "../styles.scss";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-application")
export class Application extends CustomElement
{
    protected system: System;
    protected commander: Commander;

    constructor()
    {
        super();

        this.system = new System();
        this.system.registry.add(graphComponents);
        this.system.registry.add(sceneComponents);
        this.system.registry.add(Node);

        const inflate = true;

        if (inflate) {
            const scene = `{"nodes":[{"components":[{"type":"CPulse","id":"naC7kL7XrxJq"},{"type":"CRenderer","id":"uGypeASRFYMx"},{"type":"CPickSelection","id":"a8YKsoolG4rO"}],"type":"Node","id":"KQl8ynagkuUm","name":"Main"},{"components":[{"type":"CScene","id":"1q97JKvxk7xe"},{"graph":{"nodes":[{"components":[{"children":["fnZ2MS6BEtkv","tuHkbuym3Bp1","g78HaXRUwAxh"],"type":"CTransform","id":"8s3S04eGFtg7"},{"type":"CBackground","id":"VmpqV44ovNhS"},{"type":"CFloor","id":"g1sgoqbLTjjA"},{"type":"CGrid","id":"4DYqcxNcAk6O"}],"type":"Node","id":"G5ltjIUDqV4D","name":"Root"},{"components":[{"type":"CTransform","id":"fnZ2MS6BEtkv"},{"ins":{"position":{"value":[0,0,50]}},"type":"CCamera","id":"kq1vEHJvcOBJ"},{"type":"CNavigator","id":"4p3qzFZVM42H"}],"type":"Node","id":"GbSTNJr6UmOo","name":"Camera"},{"components":[{"type":"CTransform","id":"tuHkbuym3Bp1"},{"ins":{"position":{"value":[0,10,1]}},"type":"CSpotLight","id":"Tn9N4Shs416N"}],"type":"Node","id":"wmnM8WnhGvnQ","name":"Light"},{"components":[{"ins":{"rotation":{"value":[160.020010471344,0,160.020010471344]}},"type":"CTransform","id":"g78HaXRUwAxh"},{"type":"CMesh","id":"XMatZMrGfFbw"},{"outs":{"self":{"links":[{"id":"XMatZMrGfFbw","key":"geometry"}]}},"type":"CBox","id":"ZS75iMCkQA9m"},{"outs":{"self":{"links":[{"id":"XMatZMrGfFbw","key":"material"}]}},"type":"CPhongMaterial","id":"ntBkdbEoNSym"},{"ins":{"mipmaps":{"value":false}},"outs":{"self":{"links":[{"id":"ntBkdbEoNSym","key":"colorMap"}]}},"type":"CVideoTexture","id":"lXyJ488ckbRz"}],"type":"Node","id":"oVDu2VcEvDAA","name":"Box"},{"components":[{"ins":{"run":{"value":true},"max":{"value":180},"duration":{"value":2}},"outs":{"value":{"links":[{"id":"g78HaXRUwAxh","key":"rotation","dstIndex":0},{"id":"g78HaXRUwAxh","key":"rotation","dstIndex":2}]}},"type":"COscillator","id":"0yICxXjjo4je","name":"Rotator"}],"type":"Node","id":"nbaB0ro0CV07","name":"Aux"}]},"type":"CRenderGraph","id":"i0iFjHQdzy8c"}],"type":"Node","id":"ZguW1dsXcxeW","name":"Scene"}]}`;
            this.system.fromJSON(JSON.parse(scene));
        }
        else {
            this.commander = new Commander();
            const mainGraph = this.system.graph;

            const main = mainGraph.createNode("Main");
            main.createComponent(CPulse);
            main.createComponent(CRenderer);
            main.createComponent(CPickSelection);

            const scene = helper.createScene(mainGraph, "Scene");
            const document = scene.createComponent(CRenderGraph);
            this.initDocument(document);
        }


        this.system.findNodeByName("Main").components.get(CPulse).start();
        //setTimeout(() => console.log(this.system.graph.toString(true)), 100);

        window["dump"] = () => console.log(JSON.stringify(this.system.toJSON()));
        window["clear"] = () => this.system.getMainComponent(CRenderGraph).clearInnerGraph();
        window["init"] = () => this.initDocument(this.system.getMainComponent(CRenderGraph));
    }

    protected initDocument(document: CRenderGraph)
    {
        const root = document.innerGraph.createNode("Root");
        root.createComponent(CTransform);
        root.createComponent(CBackground);
        root.createComponent(CFloor);
        root.createComponent(CGrid);

        const camera = helper.createCamera(root, "Camera");
        camera.components.get(CCamera).ins.position.setValue([ 0, 0, 50 ]);
        camera.createComponent(CNavigator);

        const light = helper.createSpotLight(root, "Light");
        light.components.get(CSpotLight).ins.position.setValue([ 0, 10, 1 ]);

        const box = helper.createBox(root, "Box");
        const boxTransform = box.components.get(CTransform);
        const tex = box.createComponent(CVideoTexture);
        box.getComponent(CPhongMaterial).ins.colorMap.linkFrom(tex.outs.self);

        const aux = document.innerGraph.createNode("Aux");
        const osc = aux.createComponent(COscillator, "Rotator");

        osc.ins.max.setValue(180);
        osc.ins.duration.setValue(2);
        osc.ins.start.set();
        osc.outs.value.linkTo(boxTransform.ins.rotation, undefined, 0);
        osc.outs.value.linkTo(boxTransform.ins.rotation, undefined, 2);
    }

    firstUpdated()
    {
        const registry: DockContentRegistry = new Map();
        registry.set("renderer", () => new ContentView(this.system));
        registry.set("hierarchy", () => new HierarchyTreeView(this.system));
        registry.set("properties", () => new PropertyTreeView(this.system));

        const dockView = this.appendElement(DockView);

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
