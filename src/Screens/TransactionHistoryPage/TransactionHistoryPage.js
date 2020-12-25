import React, {useContext, useState} from "react";
import {Button, Form} from "react-bootstrap";
import classes from './TransactionhistoryPage.module.css'
import {NavLink} from "react-router-dom";
import {ModalContainer} from "../../Components/UI/ModalContainer/ModalContainer";
import {AuthContext} from "../../Components/Context/Auth-Context";
import {TransactionList} from "../../Components/TransactionList/TransactionList";

export const TransactionHistoryPage =(props) => {
    const authContext = useContext(AuthContext)
    const [month_YearForHistory, setMonth_YearForHistory]= useState(`${new Date().getFullYear()}-${new Date().getMonth() +1}`);

    return(
        <div className={classes.TransactionHistoryPage}>
            <ModalContainer show = {authContext.userId ===null ? true : false} handleClose = {()=>{props.history.push("/")}} title = {'You are not Signed in !!!'}>
                <NavLink to = {'/'}><Button>Go Home</Button></NavLink>
            </ModalContainer>

            <Form>
                <Form.Label>
                    Select Month
                </Form.Label>
                <Form.Control required type="month" value ={month_YearForHistory} onChange={event => setMonth_YearForHistory(event.target.value)} />
            </Form>
            <TransactionList month_Year = {month_YearForHistory} userId = {authContext.userId}/>
        </div>
    )

}
