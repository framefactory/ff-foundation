/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import Color from "@ff/core/Color";

import CustomElement, { customElement, html, property } from "@ff/ui/CustomElement";

import "@ff/ui/Dialog";
import "@ff/ui/TitleBar";
import "@ff/ui/Checkbox";
import "@ff/ui/Button";
import "@ff/ui/ButtonGroup";
import "@ff/ui/Dropdown";
import "@ff/ui/LineEdit";
import "@ff/ui/ColorEdit";
import "@ff/ui/ColorWheel";

import "./styles.scss";

import Icon from "@ff/ui/Icon";
import { IButtonClickEvent } from "@ff/ui/Button";
import { IMenuEntry, IMenuSelectEvent } from "@ff/ui/Menu";
import { IColorEditChangeEvent } from "@ff/ui/ColorEdit";

////////////////////////////////////////////////////////////////////////////////

Icon.add("save", html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"/></svg>`);
Icon.add("atom", html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M413.03 256c40.13-54.89 41.51-98.62 25.14-128-10.91-19.52-40.54-50.73-116.33-41.88C300.36 34.89 267.64 0 224 0s-76.36 34.89-97.84 86.12C50.43 77.34 20.73 108.48 9.83 128c-16.38 29.4-15 73.09 25.14 128-40.13 54.89-41.51 98.62-25.14 128 29.21 52.34 101.68 43.58 116.33 41.88C147.63 477.1 180.36 512 224 512s76.37-34.9 97.84-86.12c14.64 1.7 87.11 10.46 116.33-41.88 16.38-29.4 15-73.09-25.14-128zM63.38 352c-4.03-7.21-.19-24.8 14.95-48.29 6.96 6.53 14.2 12.89 21.87 19.18 1.71 13.71 4 27.08 6.76 40.08-24.56.89-39.89-4.37-43.58-10.97zm36.82-162.88c-7.66 6.29-14.9 12.65-21.87 19.18-15.13-23.5-18.97-41.09-14.95-48.3 3.41-6.14 16.39-11.47 37.92-11.47 1.71 0 3.87.3 5.69.37a472.191 472.191 0 0 0-6.79 40.22zM224 64c9.47 0 22.2 13.52 33.86 37.26-11.19 3.7-22.44 8-33.86 12.86-11.42-4.86-22.67-9.16-33.86-12.86C201.8 77.52 214.53 64 224 64zm0 384c-9.47 0-22.2-13.52-33.86-37.26 11.19-3.7 22.44-8 33.86-12.86 11.42 4.86 22.67 9.16 33.86 12.86C246.2 434.48 233.47 448 224 448zm62.5-157.33c-26.7 19.08-46.14 29.33-62.5 37.48-16.35-8.14-35.8-18.41-62.5-37.48-1.99-27.79-1.99-41.54 0-69.33 26.67-19.05 46.13-29.32 62.5-37.48 16.39 8.17 35.86 18.44 62.5 37.48 1.98 27.78 1.99 41.53 0 69.33zM384.62 352c-3.67 6.62-19 11.82-43.58 10.95 2.76-13 5.05-26.37 6.76-40.06 7.66-6.29 14.9-12.65 21.87-19.18 15.13 23.49 18.97 41.08 14.95 48.29zm-14.95-143.71c-6.96-6.53-14.2-12.89-21.87-19.18a473.535 473.535 0 0 0-6.79-40.22c1.82-.07 3.97-.37 5.69-.37 21.52 0 34.51 5.34 37.92 11.47 4.02 7.22.18 24.81-14.95 48.3zM224 224c-17.67 0-32 14.33-32 32s14.33 32 32 32 32-14.33 32-32-14.33-32-32-32z"/></svg>`);
Icon.add("bath", html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M488 256H80V112c0-17.645 14.355-32 32-32 11.351 0 21.332 5.945 27.015 14.88-16.492 25.207-14.687 59.576 6.838 83.035-4.176 4.713-4.021 11.916.491 16.428l11.314 11.314c4.686 4.686 12.284 4.686 16.971 0l95.03-95.029c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.512-4.512-11.715-4.666-16.428-.491-17.949-16.469-42.294-21.429-64.178-15.365C163.281 45.667 139.212 32 112 32c-44.112 0-80 35.888-80 80v144h-8c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h8v32c0 28.43 12.362 53.969 32 71.547V456c0 13.255 10.745 24 24 24h16c13.255 0 24-10.745 24-24v-8h256v8c0 13.255 10.745 24 24 24h16c13.255 0 24-10.745 24-24v-32.453c19.638-17.578 32-43.117 32-71.547v-32h8c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z"/></svg>`);
Icon.add("bullhorn", html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M576 240c0-23.63-12.95-44.04-32-55.12V32.01C544 23.26 537.02 0 512 0c-7.12 0-14.19 2.38-19.98 7.02l-85.03 68.03C364.28 109.19 310.66 128 256 128H64c-35.35 0-64 28.65-64 64v96c0 35.35 28.65 64 64 64h33.7c-1.39 10.48-2.18 21.14-2.18 32 0 39.77 9.26 77.35 25.56 110.94 5.19 10.69 16.52 17.06 28.4 17.06h74.28c26.05 0 41.69-29.84 25.9-50.56-16.4-21.52-26.15-48.36-26.15-77.44 0-11.11 1.62-21.79 4.41-32H256c54.66 0 108.28 18.81 150.98 52.95l85.03 68.03a32.023 32.023 0 0 0 19.98 7.02c24.92 0 32-22.78 32-32V295.13C563.05 284.04 576 263.63 576 240zm-96 141.42l-33.05-26.44C392.95 311.78 325.12 288 256 288v-96c69.12 0 136.95-23.78 190.95-66.98L480 98.58v282.84z"/></svg>`);
Icon.add("scale", html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M256 336h-.02c0-16.18 1.34-8.73-85.05-181.51-17.65-35.29-68.19-35.36-85.87 0C-2.06 328.75.02 320.33.02 336H0c0 44.18 57.31 80 128 80s128-35.82 128-80zM128 176l72 144H56l72-144zm511.98 160c0-16.18 1.34-8.73-85.05-181.51-17.65-35.29-68.19-35.36-85.87 0-87.12 174.26-85.04 165.84-85.04 181.51H384c0 44.18 57.31 80 128 80s128-35.82 128-80h-.02zM440 320l72-144 72 144H440zm88 128H352V153.25c23.51-10.29 41.16-31.48 46.39-57.25H528c8.84 0 16-7.16 16-16V48c0-8.84-7.16-16-16-16H383.64C369.04 12.68 346.09 0 320 0s-49.04 12.68-63.64 32H112c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h129.61c5.23 25.76 22.87 46.96 46.39 57.25V448H112c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h416c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"/></svg>`);

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

        const color = new Color().setHSV(180, 0.5, 0.5).setAlpha(0);

        return html`
            <div class="ff-flex-row ff-frame">
                <ff-button text="Button 1" checked title="Button 1 Title" caret></ff-button>
                <ff-dropdown text="Dropdown 2" icon="close" .entries=${entries} @select=${this.onMenuSelect}></ff-dropdown>
                <ff-button text="Long Button 3" icon="save"></ff-button>
                <ff-button text="Long Button 4" icon="atom"></ff-button>
                <ff-button text="Long Button 5" icon="bath" caret up></ff-button>
                <ff-button icon="bullhorn" selectable></ff-button>
            </div>

            <div class="ff-flex-row ff-frame">
                <ff-color-edit .color=${color} style="height: 200px; width: 230px;" alpha numeric @change=${this.onColorChange}>
                </ff-color-edit>
            </div>

            <ff-dialog center style="width:180px;">
                <ff-title-bar title="Hello Dialog a very long dialog" draggable closable></ff-title-bar>
                <div class="ff-frame">
                    <ff-button-group mode="exclusive" style="display:flex;flex-wrap:wrap;">
                        <ff-button text="Dialog Button" icon="scale"></ff-button>
                        <ff-button text="Dialog Button"></ff-button>
                        <ff-button icon="scale"></ff-button>
                    </ff-button-group>
                    <ff-line-edit text="Hello" placeholder="Your Name" title="Enter your name."></ff-line-edit>
                    <ff-line-edit text="World" placeholder="Your Name"></ff-line-edit>
                    <ff-button name="mybutton" text="Dialog Button" icon="scale" selectable @click=${this.onClick}></ff-button>
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

    protected onColorChange(event: IColorEditChangeEvent)
    {
        //console.log(event.detail);
    }
}
