import React from 'react';
import {Toolbar} from "../Navigation/Toolbar/Toolbar";
import classes from  './Layout.module.css'

export const Layout = (props) => (
    <div className={classes.Layout}>
        <Toolbar/>
        <main className={classes.MainContent}>{props.children}</main>
    </div>
);