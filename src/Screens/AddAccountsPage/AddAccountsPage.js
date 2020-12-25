import React, {useContext, useEffect, useState} from 'react'
import classes from './AddAccountsPage.module.css'
import {Button, Form,} from "react-bootstrap";
import {AccountList} from "../../Components/UI/AccountList/AccountList";
import {AuthContext} from "../../Components/Context/Auth-Context";
import {addOrUpdateFinanceAccount} from "../../DataAccessManager/DataAccessManager";
import {NavLink} from "react-router-dom";

export const AddAccountsPage = (props) => {
    useEffect(() => {
        props.addAccountsToList();
    },[])

    const authContext = useContext(AuthContext);

    let errorMessage = '';
    const [inputAccountName, setInputAccountName] = useState('');
    const [inputAccountBalance, setInputAccountBalance] = useState('');

    const [inputNameValidity, setInputNameValidity] = useState(true);
    const [inputBalanceValidity, setInputBalanceValidity] = useState(true);

    const [inputNameChanged, setInputNameChanged] = useState(false);
    const [inputBalanceChanged, setInputBalanceChanged] = useState(false);

    const [inputButtonDisabled, setInputButtonDisabled] = useState(true);

    const submitHandler = async (event) => {
        event.preventDefault()
        setInputAccountBalance('');
        setInputAccountName('');
        //let data = {accountName : inputAccountName , accountBalance :inputAccountBalance }
        let response = await addOrUpdateFinanceAccount(authContext.userId, inputAccountName, inputAccountBalance);
        props.addAccountsToList();
        console.log(response);

    }


    const inputChangedHandler = (event, method) => {
        if (method === 'inputName') {
            setInputAccountName(event.target.value);
            setInputNameChanged(true)
            checkValidity(event, method)
        } else if (method === 'inputBalance') {
            setInputAccountBalance(event.target.value);
            setInputBalanceChanged(true)
            checkValidity(event, method)
        }
    }

    const checkValidity = (event, method) => {
        let isValid = event.target.value.trim() !== '';
        if (method === 'inputName') {
            setInputNameValidity(isValid)
        } else if (method === 'inputBalance') {
            setInputBalanceValidity(isValid);
        }

        if(inputNameValidity && inputBalanceValidity && inputNameChanged && inputBalanceChanged && isValid)
            setInputButtonDisabled(false);
        else
            setInputButtonDisabled(true);

        return isValid
    }
    return (
        <div className={classes.AddAccountsPage}>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Account Name*</Form.Label>
                    <Form.Control required isInvalid={!inputNameValidity} type="text" placeholder="Enter Account Name"
                                  onChange={event => inputChangedHandler(event, 'inputName')} value={inputAccountName}/>
                    <Form.Text className="text-muted">
                        *Enter Name of account to create or update balance
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Current Balance*</Form.Label>
                    <Form.Control required isInvalid={!inputBalanceValidity} type="number" min={'0'} placeholder="Enter Balance"
                                  onChange={event => inputChangedHandler(event, 'inputBalance')} value={inputAccountBalance}/>
                </Form.Group>
                <Form.Group>
                    {errorMessage}
                </Form.Group>

                <Button disabled={inputButtonDisabled} variant="secondary" type="submit">
                    Add
                </Button>
                <NavLink to={'/ManageFinances'}>
                    <Button  variant="success" style={{marginLeft: '100px'}}>
                            Done
                    </Button>
                </NavLink>
            </Form>

            <div className={classes.AddAccountList}>
                <AccountList accountsList={props.allAccounts}/>
            </div>
        </div>
    );
}