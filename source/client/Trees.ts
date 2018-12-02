/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import CustomElement, { customElement, html } from "@ff/ui/CustomElement";

import "@ff/ui/DockView";
import Tree from "@ff/ui/Tree";

import { schemas } from "@ff/core/ecs/propertyTypes";
import Property from "@ff/core/ecs/Property";
import PropertyField from "@ff/ui/PropertyField";
import "./styles.scss";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-application")
export class Application extends CustomElement
{
    render()
    {
        const property = new Property("Position", { preset: [0.3, 0.3], min: 0, max: 100, bar: true });

        const propField0 = new PropertyField();
        propField0.property = property;
        propField0.index = 0;

        const propField1 = new PropertyField();
        propField1.property = property;
        propField1.index = 1;

        return html`
            <ff-dock-view>
                <ff-dock-strip direction="horizontal">
                    <ff-dock-stack>
                        <ff-dock-panel text="Tree">
                            <ff-tree>
                                    
                            </ff-tree>
                        </ff-dock-panel>                    
                    </ff-dock-stack>
                    <ff-dock-stack>
                        <ff-dock-panel text="Property">
                            ${propField0}
                            ${propField1}
                        </ff-dock-panel>
                    </ff-dock-stack>
                </ff-dock-strip>
            </ff-dock-view>
        `;
    }
}