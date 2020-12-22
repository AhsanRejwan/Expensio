import React from "react";
import {Card} from "react-bootstrap";
import classes from './DescriptionCard.module.css'

export const DescriptionCard = (props) => (
        <Card style={{ width: '18rem' }} className={classes.DescriptionCard}>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.text}
                </Card.Text>
            </Card.Body>
        </Card>
);