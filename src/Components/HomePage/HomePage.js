import React from 'react'
import {Auxiliary} from "../../Hoc/Auxiliary/Auxiliary";
import {Button, Jumbotron} from "react-bootstrap";
import './Hompage.css'
import {DescriptionCards} from "../UI/DescriptionCards/DescriptionCards";

let objArray = [{title: 'hello', text:"feature 1"}, {title: 'hello', text:"feature 2"},{title: 'hello', text:"feature 2"}];

export const HomePage = () => (
    <Auxiliary>
        <Jumbotron fluid>
            <h1>Manage your expenses!</h1>
            <p>
                Easy to use solution to manage your expenses for yourself or your family.
            </p>
            <p>
                <Button variant="outline-light" >Learn more</Button>
                <Button variant="outline-light">Get Started</Button>
            </p>
        </Jumbotron>
        <DescriptionCards arr = {[{title : "Feature 1", text : "Description 1"} ,{title : "Feature 2", text : "Description 2"} ,{title : "Feature 3", text : "Description 3"}]}/>
    </Auxiliary>
);
