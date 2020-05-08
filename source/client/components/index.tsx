/**
 * FF Typescript Foundation Library
 * Copyright 2020 Ralph Wiedemeier, Frame Factory GmbH
 *
 * License: MIT
 */

import * as React from "react";
import * as ReactDOM from "react-dom";

import { CSSReset, ThemeProvider }  from "@chakra-ui/core/dist";

////////////////////////////////////////////////////////////////////////////////

const theme = {

};

const Application: React.FunctionComponent = function()
{
    return (
        <ThemeProvider>
            <CSSReset />
        </ThemeProvider>
    );
}

ReactDOM.render(<Application />, document.getElementById("main"));
