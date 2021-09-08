import React, {useContext, useEffect} from 'react';
import './App.css';
import CurrencyTable from "./component/CurrencyTable";
import CurrencyForm from "./component/CurrencyForm";
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import {getRates} from "./api/currencyApi";
import {processCurrency} from "./service/currencyService";
import CurrencyRateContext, {CurrencyRateProvider} from "./context/currencyRateContext";

const queryClient = new QueryClient()

function App() {
    return (
        <div className="App">
            <h1>CZK Live Exchange Rates</h1>
            <QueryClientProvider client={queryClient}>
                <CurrencyRateProvider>
                    <CurrencyForm/>
                    <CurrencyTable/>
                </CurrencyRateProvider>
            </QueryClientProvider>
        </div>
    );
}

export default App;
