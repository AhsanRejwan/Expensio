import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../../Components/Context/Auth-Context";
import classes from './FinanceTable.module.css'
import {TableTemplate} from "../../Components/UI/TableTemplate/TableTemplate";
import {
    addOrUpdateFinanceAccount,
    addTransaction,
    getAllFinanceAccounts, getAllTransactionsForMonth
} from "../../DataAccessManager/DataAccessManager";
import {Button, ButtonGroup, OverlayTrigger, Popover, Table} from "react-bootstrap";
import {ModalContainer} from "../../Components/UI/ModalContainer/ModalContainer";
import {TransactionFrom} from "../../Components/Forms/TransactionForm/TransactionForm";
import {NavLink} from "react-router-dom";

const MONTHS    = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export const TRANSACTION_TYPE = {
    TRANSFER_FUNDS :'Transfer Funds',
    WITHDRAW_CASH : 'Withdraw Cash',
    PAY_BILL : 'Pay Bill',
    DEPOSIT_FUNDS : 'Add Funds'
}

const calcNumberOfDaysOfMonth = (month) =>{
    let now = new Date();
    let date =  new Date(now.getFullYear(), month+1, 0)
    let numberOfDays =date.getDate();
    return numberOfDays;
}

const calcMonthName = (monthNumber) => {
    let thisMonth = MONTHS[monthNumber]
    return thisMonth;
}

export const FinanceTable = (props) => {
    const authContext = useContext(AuthContext);

    const [currentAccountNames, setCurrentAccountNames] = useState([]);
    const [currentAccountBalances, setCurrentAccountBalances] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalTitle, setModalTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [valuesForTable, setValuesForTable] = useState([]);
    const [dateToManageFinance, setDateToManageFinance] = useState(new Date());

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

    const setValueMatrixForTable = async() => {
        let valueMatrix;
        let numberOfDays = calcNumberOfDaysOfMonth(dateToManageFinance.getMonth());
        valueMatrix = new Array(numberOfDays).fill(0).map(() => new Array(currentAccountNames.length).fill(0));
        valueMatrix.push(currentAccountBalances);
        await calculateValueMatrixFromTransactions(valueMatrix);
    }

    const calculateValueMatrixFromTransactions = async(initMatrix) => {
            const valueMatrix = initMatrix;
            console.log(currentAccountNames.indexOf('Cash'));
            try {
                console.log('calculating ....')
                let transactions = await getAllTransactionsForMonth(authContext.userId,`${dateToManageFinance.getFullYear()}-${dateToManageFinance.getMonth()+1}`);
                transactions.forEach(transaction => {
                    console.log(transaction.transactionId);
                    let date = transaction.transactionData.transactionDate.split('-'),
                        creditAccount = transaction.transactionData.creditAccount,
                        debitAccount = transaction.transactionData.debitAccount,
                        amount = transaction.transactionData.transactionAmount;
                    let rowIndex = (date[2] -1 ), colIndex;
                    if(creditAccount !== null)
                    {
                        colIndex = currentAccountNames.indexOf(creditAccount)
                        valueMatrix[rowIndex][colIndex] = valueMatrix[rowIndex][colIndex] - parseInt(amount,10);
                    }
                    if(debitAccount !== null)
                    {
                        colIndex = currentAccountNames.indexOf(debitAccount)
                        valueMatrix[rowIndex][colIndex] = valueMatrix[rowIndex][colIndex] + parseInt(amount,10);
                    }
                })
            }
            catch (error)
            {
                alert(error);
            }
            finally {
                console.log('setting');
                setValuesForTable(valueMatrix);
            }
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

    useEffect(() => {
        setIsLoading(true);
        setValueMatrixForTable().then((response)=>setIsLoading(false));
    }, [currentAccountBalances,currentAccountNames])



    const popover = (
        <Popover id="popover-basic">
            <Popover.Content>
                <div className={classes.ButtonPanel}>

                    <Button
                        variant={"danger"}
                        className={classes.Buttons}
                        onClick={()=>showTransactionModal(TRANSACTION_TYPE.TRANSFER_FUNDS)}>
                        {TRANSACTION_TYPE.TRANSFER_FUNDS}
                    </Button>
                    <Button
                        variant={"danger"}
                        className={classes.Buttons}
                        onClick={()=>showTransactionModal(TRANSACTION_TYPE.WITHDRAW_CASH)}>
                        {TRANSACTION_TYPE.WITHDRAW_CASH}
                    </Button>
                    <Button
                        variant={"danger"}
                        className={classes.Buttons}
                        onClick={()=>showTransactionModal(TRANSACTION_TYPE.PAY_BILL)}>
                        {TRANSACTION_TYPE.PAY_BILL}
                    </Button>
                    {/*<Button*/}
                    {/*    variant={"danger"}*/}
                    {/*    className={classes.Buttons}*/}
                    {/*    onClick={()=>showTransactionModal(TRANSACTION_TYPE.DEPOSIT_FUNDS)}>*/}
                    {/*    {TRANSACTION_TYPE.DEPOSIT_FUNDS}*/}
                    {/*</Button>*/}
                    <Button
                        variant={"danger"}
                        className={classes.Buttons}
                    >
                        <NavLink to ='/Accounts' className = {classes.Link}>
                            Add Account/Funds
                        </NavLink>
                    </Button>

                </div >
            </Popover.Content>
        </Popover>
    );

    const showTransactionModal = ( transactionType) => {
        const contentToShow = (<TransactionFrom
            accountsList = {currentAccountNames}
            transactionType = {transactionType}
            balanceList = {currentAccountBalances}
            onTransactionMade = {transactionHandler}
        />)
        setShowModal(true);
        setModalTitle(transactionType);
        setModalContent(contentToShow);
    }

    const updateBalancesAfterTransaction = async (creditAccount, debitAccount, transactionAmount) => {
        const updatedAccountBalances = currentAccountBalances;
        if(creditAccount!== null)
        {
            const newCreditAccountBalance = (currentAccountBalances[currentAccountNames.indexOf(creditAccount)] - parseInt(transactionAmount,10))
            await addOrUpdateFinanceAccount(authContext.userId,creditAccount,newCreditAccountBalance );
            updatedAccountBalances[currentAccountNames.indexOf(creditAccount)] = newCreditAccountBalance;
        }
        if(debitAccount!==null)
        {
            const newDebitAccountBalance = (currentAccountBalances[currentAccountNames.indexOf(debitAccount)] + parseInt(transactionAmount,10))
            await addOrUpdateFinanceAccount(authContext.userId,debitAccount,newDebitAccountBalance);
            updatedAccountBalances[currentAccountNames.indexOf(debitAccount)] = newDebitAccountBalance;
        }
        setCurrentAccountBalances(updatedAccountBalances);
    }

    const transactionHandler = async (transaction) => {
        setIsLoading(true);
        switch (transaction.transactionType)
        {
            case TRANSACTION_TYPE.TRANSFER_FUNDS :
                break;

            case TRANSACTION_TYPE.WITHDRAW_CASH :
                transaction.debitAccount = 'Cash'
                break;

            case TRANSACTION_TYPE.PAY_BILL :
                transaction.debitAccount = null;
                break;

            case TRANSACTION_TYPE.DEPOSIT_FUNDS :
                transaction.creditAccount = null;
                break;

            default :
                alert('something went wrong');
                break;
        }

        try
        {
            let date = transaction.transactionDate.split('-');
            let dateStringForDB = date[0] + '-'+ date[1];
            await addTransaction( dateStringForDB , authContext.userId, transaction);
            await updateBalancesAfterTransaction(transaction.creditAccount, transaction.debitAccount, transaction.transactionAmount);
            await setValueMatrixForTable();
        }
        catch (error)
        {
            alert(error);
        }
        finally {
            setShowModal(false);
        }
    }

    const Example = () => (
        <OverlayTrigger trigger="click" placement="top" overlay={popover}>
            <Button variant="danger">+</Button>
        </OverlayTrigger>
    );

    return(
        <div className={classes.FinanceTableContainer}>
            <ModalContainer show ={showModal} handleClose={()=>setShowModal(false)} title = {modalTitle}>
                {modalContent}
            </ModalContainer>
            <div>
                <h3>
                    {calcMonthName(dateToManageFinance.getMonth())}
                </h3>
            </div>
            <div className={classes.Table}>
                <TableTemplate columns ={currentAccountNames} rows ={calcNumberOfDaysOfMonth(dateToManageFinance.getMonth())} values={valuesForTable} />
            </div>
            <div className={classes.PlusButton}>
                <Example/>
            </div>
        </div>
    );
}