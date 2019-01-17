/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import CustomElement, { customElement, html, property } from "@ff/ui/CustomElement";

import "@ff/ui/Dialog";
import "@ff/ui/TitleBar";
import "@ff/ui/Layout";
import "@ff/ui/Checkbox";
import "@ff/ui/Button";
import "@ff/ui/ButtonGroup";
import "@ff/ui/Dropdown";
import "@ff/ui/LineEdit";
import "@ff/ui/ColorEdit";
import "@ff/ui/ColorWheel";

import "./styles.scss";

import { IButtonClickEvent } from "@ff/ui/Button";
import { IMenuEntry, IMenuSelectEvent } from "@ff/ui/Menu";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-foundation-components")
export class Application extends CustomElement
{
    protected firstUpdated()
    {
    }

    protected render()
    {
        console.log("Application.render");

        const entries: IMenuEntry[] = [
            {
                text: "First Option",
                checked: true
            },
            {
                divider: true
            },
            {
                text: "Second Option",
                icon: "fa fa-shopping-cart"
            },
            {
                text: "Third Option"
            }
        ];

        return html`
            <ff-flex-row class="ff-frame">
                <ff-button text="Button 1" checked title="Button 1 Title" caret></ff-button>
                <ff-dropdown text="Dropdown 2" icon="fa fa-times" .entries=${entries} @select=${this.onMenuSelect}></ff-dropdown>
                <ff-button text="Long Button 3" icon="fa fa-save"></ff-button>
                <ff-button text="Long Button 4" icon="fa fa-atom"></ff-button>
                <ff-button text="Long Button 5" icon="fa fa-bath" caret up></ff-button>
                <ff-button icon="fa fa-bullhorn" selectable></ff-button>
            </ff-flex-row>

            <ff-flex-row class="ff-frame">
                <ff-color-edit style="height: 250px; width: 300px;">
                </ff-color-edit>
            </ff-flex-row>

            <ff-dialog center style="width:180px;">
                <ff-title-bar title="Hello Dialog a very long dialog" draggable closable></ff-title-bar>
                <div class="ff-frame">
                    <ff-button-group mode="exclusive" style="display:flex;flex-wrap:wrap;">
                        <ff-button text="Dialog Button" icon="fa fa-balance-scale"></ff-button>
                        <ff-button text="Dialog Button"></ff-button>
                        <ff-button icon="fa fa-balance-scale"></ff-button>
                    </ff-button-group>
                    <ff-line-edit text="Hello" placeholder="Your Name" title="Enter your name."></ff-line-edit>
                    <ff-line-edit text="World" placeholder="Your Name"></ff-line-edit>
                    <ff-button name="mybutton" text="Dialog Button" icon="fa fa-balance-scale" selectable @click=${this.onClick}></ff-button>
                </div>
            </ff-dialog>
        `;
    }

    onClick(event: IButtonClickEvent)
    {
        console.log(event.target.name, event.target.index, event.target.selected);
    }

    protected onMenuSelect(event: IMenuSelectEvent)
    {
        console.log(event.detail.entry);
    }
}
