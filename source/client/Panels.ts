/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import { LitElement, html } from "@polymer/lit-element";

import DockView, { DockContentRegistry } from "@ff/ui/DockView";
import "./styles.scss";

////////////////////////////////////////////////////////////////////////////////

export class Panels extends LitElement
{
    static readonly tagName: string = "ff-panels";

    protected useLayout = true;

    firstUpdated()
    {
        if (!this.useLayout) {
            return;
        }

        const registry: DockContentRegistry = new Map();
        registry.set("test", () => document.createElement("div"));

        const dockView = new DockView();
        dockView.addEventListener("change", e => {
            console.log(dockView.getLayout());
        });
        this.appendChild(dockView);

        dockView.setLayout({
            size: 1,
            type: "strip",
            direction: "horizontal",
            elements: [{
                size: 0.5,
                type: "stack",
                activePanelIndex: 0,
                panels: [{
                    contentId: "test",
                    text: "Panel One"
                }, {
                    contentId: "test",
                    text: "Panel Two"
                }]
            }, {
                size: 0.5,
                type: "strip",
                direction: "vertical",
                elements: [{
                    size: 0.5,
                    type: "stack",
                    activePanelIndex: 0,
                    panels: [{
                        contentId: "test",
                        text: "Panel Three"
                    }]
                }, {
                    size: 0.5,
                    type: "stack",
                    activePanelIndex: 0,
                    panels: [{
                        contentId: "test",
                        text: "Panel Four"
                    }]
                }]
            }]
        }, registry);

        dockView.setPanelsMovable(true);
        dockView.setPanelsClosable(true);
    }

    render()
    {
        if (this.useLayout) {
            return;
        }

        return html`
            <ff-dock-view>
                <ff-dock-strip direction="horizontal">
                    <ff-dock-stack>
                        <ff-dock-panel text="Panel One">
                            <div>One</div>                    
                        </ff-dock-panel>
                    </ff-dock-stack>
                    <div>Two</div>                    
                    <ff-dock-strip direction="vertical">
                        <ff-dock-panel text="Panel Three">
                            <div>Three</div>                    
                        </ff-dock-panel>
                        <ff-dock-stack>
                            <ff-dock-panel text="Yagoy Panel Four">
                                <div>Four</div>                    
                            </ff-dock-panel>
                            <ff-dock-panel text="Yagoy Panel Five">
                                <div>Five</div>                    
                            </ff-dock-panel>
                        </ff-dock-stack>
                    </ff-dock-strip>
                </ff-dock-strip>
            </ff-dock-view>
        `;
    }

    createRenderRoot()
    {
        return this;
    }
}

customElements.define(Panels.tagName, Panels);