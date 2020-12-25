import React, {useContext, useEffect, useState} from "react";
import {Button, Form, Spinner} from "react-bootstrap";
import {addOrUpdateFinanceAccount, signUp} from "../../../DataAccessManager/DataAccessManager";
import {AuthContext} from "../../Context/Auth-Context";

export const SignUpForm = (props) => {
    const authContext = useContext(AuthContext);

    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const signUpHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        let response = await signUp(userEmail,password)
        setIsLoading(false);
        if(typeof (response) == "string") {
            setError (response);
        }
        else
        {
            authContext.login(response.data.idToken, response.data.refreshToken,response.data.localId)
            props.history.push('/Accounts');
            await  addOrUpdateFinanceAccount(response.data.localId, 'Cash','0')
        }

    }
    let formSpinner = null;
    let formError = null;
    if(isLoading === true)
    {
        formSpinner = (<Form.Group><Spinner animation="border" variant="secondary" /></Form.Group>);
    }
    else
        formSpinner = null;

    if(error)
        formError= <Form.Group><Form.Text>{error}</Form.Text></Form.Group>
    else
        formError = null;
    return (
        <Form onSubmit={signUpHandler}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" onChange={(event)=> setUserEmail(event.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Password" onChange={(event)=> setPassword(event.target.value) }/>
            </Form.Group>
            {formError}
            {formSpinner}
            <Button variant="primary" type="submit" >
                Sign Up
            </Button>
        </Form>
    )
}