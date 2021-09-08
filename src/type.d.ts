interface ICurrencyRate {
    id: number
    country: string
    currency: string
    rate: number
}

interface ICurrencyOption {
    id: number
    value: string
}

type ContextType = {
    currencyRates: ICurrencyRate[]
    saveCurrencyRates: (currencyRates: ICurrencyRate[]) => void
}