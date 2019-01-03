/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import CustomElement, { customElement } from "@ff/ui/CustomElement";
import ManipTarget from "@ff/browser/ManipTarget";
import RenderSystem from "@ff/scene/RenderSystem";
import RenderQuadView from "@ff/scene/RenderQuadView";
import QuadSplitter, { EQuadViewLayout, IQuadSplitterChangeMessage } from "@ff/ui/QuadSplitter";

////////////////////////////////////////////////////////////////////////////////

export interface IResizeEvent extends CustomEvent
{
    detail: {
        width: number;
        height: number;
    }
}

@customElement("ff-content-view")
export default class ContentView extends CustomElement
{
    protected system: RenderSystem;
    protected manipTarget: ManipTarget;

    protected view: RenderQuadView = null;
    protected canvas: HTMLCanvasElement = null;
    protected overlay: HTMLDivElement = null;
    protected splitter: QuadSplitter = null;

    constructor(system: RenderSystem)
    {
        super();

        this.onResize = this.onResize.bind(this);

        this.system = system;
        this.manipTarget = new ManipTarget();

        this.addEventListener("pointerdown", this.manipTarget.onPointerDown);
        this.addEventListener("pointermove", this.manipTarget.onPointerMove);
        this.addEventListener("pointerup", this.manipTarget.onPointerUpOrCancel);
        this.addEventListener("pointercancel", this.manipTarget.onPointerUpOrCancel);
        this.addEventListener("wheel", this.manipTarget.onWheel);
        this.addEventListener("contextmenu", this.manipTarget.onContextMenu);
    }

    protected firstConnected()
    {
        this.setStyle({
            position: "absolute",
            top: "0", bottom: "0", left: "0", right: "0"
        });

        this.canvas = this.createElement("canvas", {
            display: "block",
            width: "100%",
            height: "100%"
        }, this);

        this.overlay = this.createElement("div", {
            position: "absolute",
            top: "0", bottom: "0", left: "0", right: "0",
            overflow: "hidden"
        }, this);

        this.splitter = this.createElement(QuadSplitter, {
            position: "absolute",
            top: "0", bottom: "0", left: "0", right: "0",
            overflow: "hidden"
        }, this);

        this.splitter.onChange = (message: IQuadSplitterChangeMessage) => {
            this.view.horizontalSplit = message.horizontalSplit;
            this.view.verticalSplit = message.verticalSplit;
        };

        this.view = new RenderQuadView(this.system, this.canvas, this.overlay);
        this.view.layout = EQuadViewLayout.Quad;
        this.splitter.layout = EQuadViewLayout.Quad;

        this.view.viewports[0].enableCameraManip(true);
        //this.view.addViewport().setSize(0, 0, 0.5, 1);
        //this.view.addViewport().setSize(0.5, 0, 0.5, 1);

        this.manipTarget.next = this.view;
    }

    protected connected()
    {
        this.view.attach();

        window.addEventListener("resize", this.onResize);
        window.dispatchEvent(new CustomEvent("resize"));
    }

    protected disconnected()
    {
        this.view.detach();

        window.removeEventListener("resize", this.onResize);
    }

    protected onResize()
    {
        this.view.resize();
    }
}