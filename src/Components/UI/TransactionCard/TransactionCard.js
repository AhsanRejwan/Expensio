import React from "react";
import {Card} from "react-bootstrap";
import classes from './TransactionCard.module.css'

export const TransactionCard = (props) => {
    return (
        <Card className={classes.TransactionCard} border={"secondary"}>
            <Card.Header>{props.transaction.transactionData.transactionDate}</Card.Header>
            <Card.Body>
                <Card.Title>{props.transaction.transactionData.transactionType}</Card.Title>
                <Card.Text>
                    TID : {props.transaction.transactionId}
                </Card.Text>
                <Card.Text>
                    From : {props.transaction.transactionData.creditAccount}
                </Card.Text>
                <Card.Text>
                    {props.transaction.transactionData.debitAccount ? 'To : ' + props.transaction.transactionData.debitAccount : null}
                </Card.Text>
                <Card.Text>
                    Amount : {props.transaction.transactionData.transactionAmount}
                </Card.Text>
                    {props.transaction.transactionData.transactionDescription !=='' ?<Card.Text> {'Description : '  + props.transaction.transactionData.transactionDescription}</Card.Text> :null }
            </Card.Body>
        </Card>
    )
}