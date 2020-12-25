import React, {useState} from "react";
import {Button, Dropdown, DropdownButton, Form, Spinner} from "react-bootstrap";
import {TRANSACTION_TYPE} from "../../../Containers/FinanceTable/FinanceTable";

export const TransactionFrom = (props) => {

    //props list
    const accountsList = props.accountsList;
    const [transactionType, SetTransactionType] = useState(props.transactionType);
    const [debitAccount, setDebitAccount] = useState('Select Account');
    const [creditAccount, setCreditAccount] = useState('Select Account')
    const [transactionDate, setTransactionDate] = useState(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`);
    const [transactionAmount, setTransactionAmount] = useState(null);
    const [transactionDescription, setTransactionDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const submitFormHandler = (event) => {
        event.preventDefault();
        if(debitAccount == creditAccount)
            alert('Cannot transfer between same account');
        else
        {
            const transaction = {
                transactionType,
                creditAccount,
                debitAccount,
                transactionDate,
                transactionAmount,
                transactionDescription
            }
            setIsLoading(true);
            props.onTransactionMade(transaction);
            //console.log(transaction);
        }
    }

    let accountToDebitRenderContent = null;
    if(props.transactionType === 'Transfer Funds')
    {
        accountToDebitRenderContent = (
            <Form.Group>
                <Form.Label>Select Account to debit: </Form.Label>
                <DropdownButton required id="dropdown-basic-button" title={debitAccount}>
                    {accountsList.map(account =>
                        <Dropdown.Item onSelect={()=>setDebitAccount(account ==='Cash' || account === creditAccount ? null : account)}>
                            {account ==='Cash' || account ===creditAccount ? null : account}
                        </Dropdown.Item>)}
                </DropdownButton>
            </Form.Group>
        );
    }

    let totalBalanceOfSelectedAccount =props.balanceList[props.accountsList.indexOf(creditAccount)];

    let formSpinner = null;
    if(isLoading)
    {
        formSpinner = formSpinner = (<Form.Group><Spinner animation="border" variant="secondary" /></Form.Group>);
    }
    return (
        <Form onSubmit={submitFormHandler}>
            <Form.Group>
                <Form.Label>Select Account to credit: </Form.Label>
                <DropdownButton required id="dropdown-basic-button" title={creditAccount}>
                    {accountsList.map((account,index) =>
                        <div>
                            <Dropdown.Item  onSelect={()=>setCreditAccount(account ==='Cash' && props.transactionType !== TRANSACTION_TYPE.PAY_BILL ? null : account)} key={index}>
                                {/*make sure it is not paying bill*/}
                                {account ==='Cash' && props.transactionType !== TRANSACTION_TYPE.PAY_BILL? null : account}
                            </Dropdown.Item>
                        </div>
                    )}
                </DropdownButton>
                <Form.Text>Balance: {props.balanceList[props.accountsList.indexOf(creditAccount)] }</Form.Text>
            </Form.Group>

            {accountToDebitRenderContent}

            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control required type="date" placeholder="Enter Date" onChange={(event)=>setTransactionDate(event.target.value)} value={transactionDate}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control required type="number" min = {'1'} max = {`${totalBalanceOfSelectedAccount}`} placeholder="Enter Amount" onChange={event => setTransactionAmount(event.target.value)}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="textarea" placeholder="Purpose of Transaction" onChange={event => setTransactionDescription(event.target.value)}/>
            </Form.Group>
            {formSpinner}
            <Button variant="success" type="submit" >
                Confirm
            </Button>
        </Form>
        )

}