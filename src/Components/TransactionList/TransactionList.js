import React, {useEffect, useState} from "react";
import {getAllTransactionsForMonth} from "../../DataAccessManager/DataAccessManager";
import {TransactionCard} from "../UI/TransactionCard/TransactionCard";

export const TransactionList = (props) => {
    const [transactions,setTransactions] = useState([]);
    let contentToRender = null

    useEffect(() => {
        if(props.userId !== null)
        {
            getTransactions().then(res=> setTransactions(res));
        }
       },[props.month_Year])

    const getTransactions = async() => {
        try {
           return await getAllTransactionsForMonth(props.userId, props.month_Year)
        }
        catch (error) {
            alert(error);
        }
    }
    return(
        transactions.map((transaction,index) => {
            return (
                <div key={index}>
                    <TransactionCard index = {index} transaction ={transaction} />
                </div>
            )
        })
    );
}