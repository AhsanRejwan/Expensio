import React, {useState} from 'react'
import {Button, Jumbotron} from "react-bootstrap";
import classes from './Hompage.module.css'
import {DescriptionCards} from "../../Components/UI/DescriptionCards/DescriptionCards";
import {ModalContainer} from "../../Components/UI/ModalContainer/ModalContainer";
import {LoginForm} from "../../Components/Forms/LoginForm/LoginForm";
import {SignUpForm} from "../../Components/Forms/SignUpForm/SignUpForm";

export const HomePage = (props) => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
        return (
    <div className={classes.HomePage}>

        <Jumbotron fluid className={classes.Jumbotron}>
            <h1>Manage your expenses!</h1>
            <p>
                Easy to use solution to manage your expenses for yourself or your family.
            </p>
            <p>
                <Button variant="outline-light" onClick={()=>setShowLoginModal(true)}>Log In</Button>
                <Button variant="outline-light" onClick={()=>setShowSignUpModal(true)}>Sign Up</Button>
            </p>
        </Jumbotron>

        <DescriptionCards arr={[{title: "Feature 1", text: "Description 1"}, {
            title: "Feature 2",
            text: "Description 2"
        }, {title: "Feature 3", text: "Description 3"}]}/>

        <ModalContainer show ={showLoginModal} title = 'Log In to Expensio' handleClose = {() => {setShowLoginModal(prevState => !prevState)}}>
            <LoginForm {...props} handleClose = {() => {setShowLoginModal(prevState => !prevState)}}  />
        </ModalContainer>

        <ModalContainer show ={showSignUpModal}  title = 'Create Expensio Account' handleClose = {() => {setShowSignUpModal(prevState => !prevState)}}>
            <SignUpForm {...props} handleClose = {() => {setShowSignUpModal(prevState => !prevState)}} />
        </ModalContainer>

    </div>
);}
