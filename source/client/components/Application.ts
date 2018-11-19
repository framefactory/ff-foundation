/**
 * FF Typescript Foundation Library
 * Copyright 2018 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

export interface IApplicationProps
{
    element: HTMLElement;
}

export default class Application
{
    constructor(props: IApplicationProps)
    {
        console.log("Hello, World!");
    }
}

window["Application"] = Application;