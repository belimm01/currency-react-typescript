import * as React from "react";
import {useState} from "react";

const CurrencyRateContext = React.createContext<ContextType | null>(null);

export const CurrencyRateProvider: React.FC = ({children}) => {
    const [currencyRates, setCurrencyRates] = useState<ICurrencyRate[]>([]);

    const saveCurrencyRates = (currencyRates: ICurrencyRate[]) => {
        setCurrencyRates(currencyRates);
    };

    return (
        <CurrencyRateContext.Provider value={{currencyRates, saveCurrencyRates}}>
            {children}
        </CurrencyRateContext.Provider>
    );
}

export default CurrencyRateContext;
