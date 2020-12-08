import React from 'react';
import {Auxiliary} from "../../Hoc/Auxiliary/Auxiliary";
import {Toolbar} from "../Navigation/Toolbar/Toolbar";

export const Layout = (props) => (
    <Auxiliary>
        <Toolbar/>
        <main>{props.children}</main>
    </Auxiliary>
);