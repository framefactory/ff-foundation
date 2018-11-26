/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import { LitElement, html, customElement, property } from "@polymer/lit-element";

import "./styles.scss";

////////////////////////////////////////////////////////////////////////////////

function input(path: string)
{
    return (target: object, key: string, descriptor?: PropertyDescriptor) => {
        console.log("decorator.input");
        console.log(target, key);

        const valueKey = `__${key}`;

        Object.defineProperty(target.constructor.prototype, key, {
            get() { return this[valueKey]; },
            set(value) { this[valueKey] = value; },
            configurable: true,
            enumerable: true
        });
    };
}

declare global {
    interface HTMLElementTagNameMap
    {
        "ff-decorators": Decorators
    }
}


@customElement("ff-decorators" as any)
export class Decorators extends LitElement
{
    @input("Foo")
    foo: string = "ello";

    constructor()
    {
        super();
        console.log("Decorators.constructor");
        console.log(this.foo);
        console.log(Object.getOwnPropertyNames(this));
    }

    @input("Bar")
    bar()
    {

    }
}