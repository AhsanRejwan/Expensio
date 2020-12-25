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

        <DescriptionCards arr={[{title: "Track Expenses", text: "Record every expense and their purpose, know your expenditure and your savings :)"}, {
            title: "Finance Summary",
            text: "Track daily expense summary to know how much money you lost or gained per day."
        }, {title: "View History", text: "See details about individual transactions"}]}/>

        <ModalContainer show ={showLoginModal} title = 'Log In to Expensio' handleClose = {() => {setShowLoginModal(prevState => !prevState)}}>
            <LoginForm {...props} handleClose = {() => {setShowLoginModal(prevState => !prevState)}}  />
        </ModalContainer>

        <ModalContainer show ={showSignUpModal}  title = 'Create Expensio Account' handleClose = {() => {setShowSignUpModal(prevState => !prevState)}}>
            <SignUpForm {...props} handleClose = {() => {setShowSignUpModal(prevState => !prevState)}} />
        </ModalContainer>

    </div>
);}
