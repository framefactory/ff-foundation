/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import CustomElement, { customElement, html } from "@ff/ui/CustomElement";

import "@ff/ui/Dialog";
import "@ff/ui/TitleBar";
import "@ff/ui/Layout";
import "@ff/ui/Checkbox";
import "@ff/ui/Button";
import "@ff/ui/ButtonGroup";
import "@ff/ui/LineEdit";

import "./styles.scss";
import { IButtonClickEvent } from "@ff/ui/Button";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-components")
export class Components extends CustomElement
{
    protected onInitialConnect()
    {
        this.setStyle({
            display: "block",
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0"
        });
    }

    render()
    {
        return html`
            <div class="ff-control">
                <ff-button text="Button 1" checked></ff-button>
                <ff-button text="Button 2" icon="fa fa-times"></ff-button>
                <ff-button text="Button 3"></ff-button>
            </div>
            <ff-dialog center >
                <ff-title-bar title="Hello Dialog a very long dialog title longer longer longer" draggable closable></ff-title-bar>
                <div class="ff-frame">
                    <ff-button-group mode="exclusive" style="display:flex;">
                        <ff-button text="Dialog Button" icon="fa fa-balance-scale"></ff-button>
                        <ff-button text="Dialog Button"></ff-button>
                        <ff-button icon="fa fa-balance-scale"></ff-button>
                    </ff-button-group>
                    <ff-line-edit text="Hello" placeholder="Your Name"></ff-line-edit>
                    <ff-line-edit text="World" placeholder="Your Name"></ff-line-edit>
                    <ff-button name="mybutton" text="Dialog Button" icon="fa fa-balance-scale" selectable @click=${this.onClick}></ff-button>
                </div>
            </ff-dialog>
        `;
    }

    onClick(event: IButtonClickEvent)
    {
        console.log(event.currentTarget.name, event.currentTarget.index);
    }
}
