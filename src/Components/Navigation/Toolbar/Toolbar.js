import React, {useState} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from "react-router-dom";

export const Toolbar = (props) => {
    return (
        <React.Fragment>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Expensio</Navbar.Brand>
                <Nav className="mr-auto">
                    <NavLink to = {'/'} exact><Nav.Link href="/">Home</Nav.Link></NavLink>
                    <NavLink to ={'/ManageFinances'}><Nav.Link href="/ManageFinances" >Manage Finances</Nav.Link></NavLink>
                    <NavLink to = {'/TransactionHistoryPage'}><Nav.Link href="/TransactionHistoryPage" >Transaction History</Nav.Link></NavLink>
                </Nav>
            </Navbar>
        </React.Fragment>
    );
}