/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import { LitElement, html } from "@polymer/lit-element";

import "@ff/ui/DockView";
import "./styles.scss";

////////////////////////////////////////////////////////////////////////////////

export class Components extends LitElement
{
    static readonly tagName: string = "ff-components";

    constructor()
    {
        super();
    }

    render()
    {
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

customElements.define(Components.tagName, Components);