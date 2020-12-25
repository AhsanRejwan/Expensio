import {DB, firebaseConfig} from "../FireBase/Firebase";
import Axios from "axios";



export const signUp = async(email, password) => {
    return await Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + firebaseConfig.apiKey, {email: email, password : password, returnSecureToken : true})
        .then(response => {
            return response;
        })
        .catch(error => {
            return error.response.data.error.message;
        })
}

export const logIn = async(email,password) => {
    return await Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + firebaseConfig.apiKey, {email: email, password : password, returnSecureToken : true})
        .then(response => {
            return response;
        })
        .catch(error => {
            return error.response.data.error.message;
        })
}

export const addOrUpdateFinanceAccount = async(userId, accountName, accountBalance) => {
    console.log('name : ' + accountName + 'balance ' + accountBalance);
    return await DB.collection(userId).doc('FinanceAccounts').set({ [accountName]: accountBalance }, {merge : true})
        .then(response => {
            return response;
        }).catch(error => {
            return error.response.data.error.message;
        });
}

export const getAllFinanceAccounts = async(userId) => {
    let res = null;
    res =  await DB.collection(userId).doc('FinanceAccounts').get();
    res = res.data();
    let acc = [];
    Object.keys(res).map((key)=>{acc.push({accountName : key, accountBalance : res[key]})});
    return acc;
}

export const addTransaction = (monthYear,userId, transactionInfo) => {
    return DB.collection(userId).doc('Transactions').collection(monthYear).add(transactionInfo);
}

export const getAllTransactionsForMonth = async(userId, month_Year) => {
    let transactionArray = [];
    let res = await  DB.collection(userId).doc('Transactions').collection(month_Year).get();
    res.forEach(transaction => {
        let transactionObject = {
            transactionId : transaction.id,
            transactionData : {...transaction.data()}
        }
        transactionArray.push(transactionObject);
    })
    return transactionArray;
}


