import React, {useContext} from "react";

import {AuthContext} from "../../Components/Context/Auth-Context";
import {ModalContainer} from "../../Components/UI/ModalContainer/ModalContainer";
import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {FinanceTable} from "../../Containers/FinanceTable/FinanceTable";

export const FinancesPage = (props) => {
    const authContext = useContext(AuthContext);
    return (
        <div >

            <ModalContainer show = {authContext.userId ===null ? true : false} handleClose = {()=>{props.history.push("/")}} title = {'You are not Signed in !!!'}>
                <NavLink to = {'/'}><Button>Go Home</Button></NavLink>
            </ModalContainer>

            <div>
                {authContext.userId !==null ? <FinanceTable /> : null}
            </div>



        </div>
    )
}