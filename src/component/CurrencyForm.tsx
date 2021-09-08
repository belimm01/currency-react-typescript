import React, {useContext, useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import styles from "../style/currencyForm.module.scss"
import CurrencyRateContext from "../context/currencyRateContext";

export default function CurrencyForm() {
    const {handleSubmit} = useForm();
    const [convertResult, setConvertResult] = useState<string>();
    const [currentAmount, setCurrentAmount] = useState<number>(1);
    const [currentCurrencyRate, setCurrentCurrencyRate] = useState<ICurrencyRate>();
    const [currentCurrencyOption, setCurrentCurrencyOption] = useState<number>();
    const [currencyOptions, setCurrencyOptions] = useState<ICurrencyOption[]>([]);
    const {currencyRates} = useContext(CurrencyRateContext) as ContextType;

    useEffect(() => {
        if (currencyRates.length) {
            setCurrencyOptions(currencyRates.map(currencyRate => ({
                id: currencyRate.id,
                value: currencyRate.currency
            })) as ICurrencyOption[]);
        }
    }, [currencyRates])

    useEffect(() => {
        if (currentCurrencyOption) {
            setCurrentCurrencyRate(currencyRates.filter(currencyRate => currencyRate.id === currentCurrencyOption)[0]);
        }
    }, [currentCurrencyOption])

    useEffect(() => {
        if (currencyOptions.length) {
            setCurrentCurrencyOption(currencyOptions[0].id);
        }
    }, [currencyOptions])

    const onSubmit = () => {
        if (currentCurrencyRate && currentAmount) {
            const finalAmount = currentAmount * currentCurrencyRate.rate;
            setConvertResult(`${currentAmount} CZK = ${finalAmount} ${currentCurrencyRate.currency}`);
        }
    };

    const handleOptionChange = (event: any) => {
        setCurrentCurrencyOption(parseInt(event.target.value));
    }

    const handleAmountChange = (event: any) => {
        setCurrentAmount(parseInt(event.target.value));
    }

    return (
        <div className={styles.formBackground}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{display: 'flex', alignItems: 'flex-end'}}>
                    <div style={{flex: '1', textAlign: 'left'}}>
                        <label htmlFor="amount">Amount</label>
                        <input onChange={handleAmountChange} type="number" defaultValue={1} id="amount" name="amount"
                               placeholder="Type amount"/>
                    </div>
                    <div style={{flex: '1', textAlign: 'left'}}>
                        <label htmlFor="currency">Currency</label>
                        <select id="currency" name="currency" onChange={handleOptionChange}
                                value={currentCurrencyOption}>
                            {currencyOptions?.length && currencyOptions.map((currencyOption: ICurrencyOption) => (
                                <option key={currencyOption.id}
                                        value={currencyOption.id}>
                                    {currencyOption.value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={{flex: '1'}}>
                        <input type="submit" value="Convert"/>
                    </div>
                </div>
            </form>
            <div style={{
                display: 'flex',
                textAlign: 'left',
                paddingLeft: '1rem',
                fontWeight: 'bold'
            }}>{convertResult}</div>
        </div>
    );
};