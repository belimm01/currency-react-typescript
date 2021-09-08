import React from 'react';
import './App.css';
import CurrencyTable from "./component/CurrencyTable";
import CurrencyForm from "./component/CurrencyForm";
import {QueryClient, QueryClientProvider} from "react-query";
import {CurrencyRateProvider} from "./context/currencyRateContext";

const queryClient = new QueryClient()

function App() {
    return (
        <div className="App">
            <h1>CZK Live Exchange Rates</h1>
            <div style={{padding: '1rem'}}>
                <QueryClientProvider client={queryClient}>
                    <CurrencyRateProvider>
                        <CurrencyForm/>
                        <CurrencyTable/>
                    </CurrencyRateProvider>
                </QueryClientProvider>
            </div>
        </div>
    );
}

export default App;
