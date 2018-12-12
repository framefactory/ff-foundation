/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import CustomElement, { customElement, html } from "@ff/ui/CustomElement";
import DockView, { DockContentRegistry } from "@ff/ui/DockView";

import "./styles.scss";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-application")
export class Application extends CustomElement
{
    protected useLayout = false;

    firstConnected()
    {
        if (!this.useLayout) {
            return;
        }

        const registry: DockContentRegistry = new Map();
        registry.set("test", () => document.createElement("div"));

        const dockView = new DockView();
        dockView.addEventListener(DockView.changeEvent, e => {
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
            },{
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
                            <ff-dock-panel text="Panel Four">
                                <div>Four</div>                    
                            </ff-dock-panel>
                            <ff-dock-panel text="Panel Five">
                                <div>Five</div>                    
                            </ff-dock-panel>
                        </ff-dock-stack>
                    </ff-dock-strip>
                </ff-dock-strip>
            </ff-dock-view>
        `;
    }
}
