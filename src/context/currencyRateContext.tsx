import { createContext, useState, type PropsWithChildren } from 'react';

const CurrencyRateContext = createContext<ContextType | null>(null);

export const CurrencyRateProvider = ({ children }: PropsWithChildren) => {
  const [currencyRates, setCurrencyRates] = useState<ICurrencyRate[]>([]);

  const saveCurrencyRates = (rates: ICurrencyRate[]) => {
    setCurrencyRates(rates);
  };

  return (
    <CurrencyRateContext.Provider value={{ currencyRates, saveCurrencyRates }}>
      {children}
    </CurrencyRateContext.Provider>
  );
};

export default CurrencyRateContext;
