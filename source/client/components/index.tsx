/**
 * FF Typescript Foundation Library
 * Copyright 2020 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import * as React from "react";
import * as ReactDOM from "react-dom";

////////////////////////////////////////////////////////////////////////////////

const theme = {

};

const Application: React.FunctionComponent = function()
{
    return (<div>Hello, Application.</div>)
}

ReactDOM.render(<Application />, document.getElementById("main"));
