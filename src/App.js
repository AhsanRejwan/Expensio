import './App.css';
import {Layout} from "./Components/Layout/Layout";
import {HomePage} from "./Screens/HomePage/HomePage";
import {Route} from "react-router";
import {FinancesPage} from "./Screens/FinancesPage/FinancesPage";
import {Accounts} from "./Containers/Accounts";
import {TransactionHistoryPage} from "./Screens/TransactionHistoryPage/TransactionHistoryPage";

const App = ()=> {
  return (
    <Layout>
            <Route path={'/Accounts'} exact component={Accounts}/>
            <Route path={'/TransactionHistoryPage'} exact component={TransactionHistoryPage}/>
            <Route path={'/ManageFinances'} exact component={FinancesPage}/>
            <Route path={'/'} exact component={HomePage}/>
    </Layout>
  );
}

export default App;
