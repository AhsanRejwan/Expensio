import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../Components/Context/Auth-Context";
import classes from './FinanceTable.module.css'
import {TableTemplate} from "../../Components/UI/TableTemplate/TableTemplate";
import {getAllFinanceAccounts} from "../../DataAccessManager/DataAccessManager";

const calcNumberOfDays = (props) => {
    let now = new Date();
    let numberOfDays = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    return numberOfDays;
}
const NUMBER_OF_DAYS = calcNumberOfDays();

export const FinanceTable = (props) => {
    const authContext = useContext(AuthContext);

    const [currentAccountNames, setCurrentAccountNames] = useState([]);
    const [currentAcountBalances, setCurrentAccountBalances] = useState([]);

    const getAllAccountsFromDatabase = async () => {
        //Need Calculation of Balance
        let accountsArray = [], balanceArray = [], cashBalance = 0;
        let accounts = await getAllFinanceAccounts(authContext.userId);
        accounts.map(account => {
            if(account.accountName!== 'Cash') {
                accountsArray.push(account.accountName);
                balanceArray.push(parseInt(account.accountBalance, 10));
            }
            else
            {
                cashBalance = (parseInt(account.accountBalance, 10));
            }
        })
        accountsArray.push('Cash')
        balanceArray.push(cashBalance);
        return [accountsArray,balanceArray];
    }
    const setInitialValueMatrixForTable = () => {
        let valueMatrix;
        console.log('days in month = ' + NUMBER_OF_DAYS + 'currentAccountNames = ' + currentAccountNames.length);
        valueMatrix = new Array(NUMBER_OF_DAYS).fill(0).map(() => new Array(currentAccountNames.length).fill(0));
        valueMatrix.push(currentAcountBalances)
        console.log('this is value matrix');
        console.log(valueMatrix);
        return valueMatrix
    }

    useEffect(()=>{
        if(authContext.userId !== null)
        {
            getAllAccountsFromDatabase().then(
                accounts => {
                    setCurrentAccountNames(accounts[0]);
                    setCurrentAccountBalances(accounts[1])
                }
            );
        }
        //console.log('values for table = ' + valuesForTable.length);
    },[])


    return(
        <div className={classes.FinanceTable}>
            <TableTemplate columns ={currentAccountNames} rows ={NUMBER_OF_DAYS} values={setInitialValueMatrixForTable()}/>
        </div>
    );
}