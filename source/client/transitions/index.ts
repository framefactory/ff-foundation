/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import CustomElement, { customElement, property, html, PropertyValues } from "@ff/ui/CustomElement";

import "@ff/ui/Button";
import "@ff/ui/Transition";
import "@ff/ui/SlideTransition";

import "../styles.scss";

////////////////////////////////////////////////////////////////////////////////

@customElement("ff-foundation-transition")
export class Application extends CustomElement
{
    protected visible = true;
    protected counter = 0;

    protected render()
    {
        //            <ff-transition class="ff-fade-transition" ?in=${this.visible} .content=${html`<ff-test counter=${this.counter}></ff-test>`}></ff-transition>

        return html`<h1>Transition</h1>
            <ff-button text="Add" @click=${this.onClickAdd}></ff-button>
            <ff-button text="Remove" @click=${this.onClickRemove}></ff-button>
            <ff-button text="Increment" @click=${this.onClickIncrement}></ff-button>
            <ff-slide-transition ?in=${this.visible} .content=${html`<ff-test counter=${this.counter}></ff-test>`}></ff-slide-transition>
        `;
    }

    protected onClickAdd()
    {
        this.visible = true;
        this.requestUpdate();
    }

    protected onClickRemove()
    {
        this.visible = false;
        this.requestUpdate();
    }

    protected onClickIncrement()
    {
        this.counter++;
        this.requestUpdate();
    }
}

@customElement("ff-test")
export class Test extends CustomElement
{
    @property({ type: Number })
    counter = 0;

    protected render()
    {
        return html`Test Counter: ${this.counter}`;
    }
}
