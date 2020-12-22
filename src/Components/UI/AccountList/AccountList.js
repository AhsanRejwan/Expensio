import {ListGroup} from "react-bootstrap";
import React from "react";

export const AccountList = (props)=> {

    const accounts = props.accountsList.map(account => {
        return (
            <ListGroup.Item key = {account.accountName}>
                <h5>{account.accountName}</h5>
                <p> {account.accountBalance}</p>
            </ListGroup.Item>
        )
    })
    return(
        <ListGroup variant="flush">
            <h4> All Accounts: </h4>
            {accounts}
        </ListGroup>
    )
}