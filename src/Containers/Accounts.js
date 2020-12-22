import React, {useContext, useEffect, useState} from "react";
import {AddAccountsPage} from "../Screens/AddAccountsPage/AddAccountsPage";
import {DB} from "../FireBase/Firebase";
import {getAllFinanceAccounts} from "../DataAccessManager/DataAccessManager";
import {AuthContext} from "../Components/Context/Auth-Context";
import {ModalContainer} from "../Components/UI/ModalContainer/ModalContainer";
import {NavLink} from "react-router-dom";
import {Button} from "react-bootstrap";

export const Accounts = (props) => {
    const authContext = useContext(AuthContext);
    const [accountList, setAccountList] = useState([])
    const [triggerUseEffect, setTriggerUseEffect] = useState(false);

    useEffect(() => {
        if(authContext.userId !== null)
            getAllAccountsFromDatabase().then().catch();
    },[triggerUseEffect])

    const getAllAccountsFromDatabase = async () => {
        console.log('calling database method' + authContext.userId);
        let accounts = await getAllFinanceAccounts(authContext.userId);
        setAccountList(accounts);
        console.log(accounts);
    }
    return (
        <React.Fragment>
            <ModalContainer show = {authContext.userId ===null ? true : false} handleClose = {()=>{props.history.push("/")}} title = {'You are not Signed in !!!'}>
                <NavLink to = {'/'}><Button>Go Home</Button></NavLink>
            </ModalContainer>
            <AddAccountsPage allAccounts={accountList} addAccountsToList ={()=>{setTriggerUseEffect(prevState => !prevState)}}/>
        </React.Fragment>
        );
}