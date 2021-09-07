import React from 'react';
import './App.css';
import CurrencyTable from "./component/CurrencyTable";
import CurrencyForm from "./component/CurrencyForm";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()

function App() {
    return (
        <div className="App">
            <h1>CZK Live Exchange Rates</h1>
            <CurrencyForm/>
            <QueryClientProvider client={queryClient}>
                <CurrencyTable/>
            </QueryClientProvider>
        </div>
    );
}

export default App;
