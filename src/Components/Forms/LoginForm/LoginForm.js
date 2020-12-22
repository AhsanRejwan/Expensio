import React, {useContext, useState} from "react";
import {Button, Form, Spinner} from "react-bootstrap";
import {AuthContext} from "../../Context/Auth-Context";
import {logIn} from "../../../DataAccessManager/DataAccessManager";

export const LoginForm = (props) => {
    const authContext = useContext(AuthContext);

    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [logInError, setLogInError] = useState(null);

    const signUpHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        let response = await logIn(userEmail,password)
        setIsLoading(false);
        if(typeof (response) == "string") {
            setLogInError (response);
        }
        else
        {
            authContext.login(response.data.idToken, response.data.refreshToken,response.data.localId)
            props.history.replace('/ManageFinances')
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

    if(logInError)
        formError= <Form.Group><Form.Text>{logInError}</Form.Text></Form.Group>
    else
        formError = null;
    return (
            <Form onSubmit={signUpHandler}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email" placeholder="Enter email" onChange={(event)=> setUserEmail(event.target.value)}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" onChange={(event)=> setPassword(event.target.value) }/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Keep me signed in" />
                </Form.Group>
                {formError}
                {formSpinner}
                <Button variant="primary" type="submit">
                    Log In
                </Button>
            </Form>
    )
}