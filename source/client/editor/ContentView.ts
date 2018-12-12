/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import CustomElement, { customElement } from "@ff/ui/CustomElement";
import ManipTarget from "@ff/browser/ManipTarget";
import RenderSystem from "@ff/three/ecs/RenderSystem";
import RenderView from "@ff/three/ecs/RenderView";

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
    static readonly resizeEvent: string = "sv-resize";

    protected system: RenderSystem;
    protected manipTarget: ManipTarget;

    protected view: RenderView = null;
    protected canvas: HTMLCanvasElement = null;
    protected overlay: HTMLDivElement = null;


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

        this.view = new RenderView(this.system, this.canvas, this.overlay);
        this.view.addViewport();
        this.manipTarget.next = this.view;
    }

    protected connected()
    {
        this.view.enabled = true;

        window.addEventListener("resize", this.onResize);
        window.dispatchEvent(new CustomEvent("resize"));
    }

    protected disconnected()
    {
        this.view.enabled = false;

        window.removeEventListener("resize", this.onResize);
    }

    protected onResize()
    {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;

        if (this.view) {
            this.view.resize(width, height);
        }

        this.dispatchEvent(new CustomEvent(ContentView.resizeEvent, {
            detail: { width, height }
        } as IResizeEvent));
    }
}