import React from 'react';
import {Auxiliary} from "../../../Hoc/Auxiliary/Auxiliary";
import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Toolbar =(props) =>(
    <Auxiliary>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Expensio</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Balance Sheet</Nav.Link>
                <Nav.Link href="#pricing" >Transaction History</Nav.Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
            </Form>
        </Navbar>
    </Auxiliary>
);