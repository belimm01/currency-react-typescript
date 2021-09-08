import React, {useContext, useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import CurrencyRateContext from "../context/currencyRateContext";
import styled, {css} from "styled-components";

const InputWrapper = styled.div`flex: 1; text-align: left; padding: 1rem;`;
const FormWrapper = styled.div`display: flex; align-items: flex-end;`;
const ResultWrapper = styled.div`display: flex; text-align: left; padding-left: 1rem; font-weight: bold;`;

const FormBackground = styled.div`
  border-radius: 8px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(35 55 80 / 30%) 0px 6px 12px;
  padding: 10px;`;

const styledInput = css`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;`;

const Submit = styled.input` 
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;`;

const Input = styled.input`${styledInput}`;
const Select = styled.select` ${styledInput}`;


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
        <FormBackground>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormWrapper>
                    <InputWrapper>
                        <label htmlFor="amount">Amount</label>
                        <Input onChange={handleAmountChange}
                               type="number"
                               min="0"
                               value={currentAmount}
                               id="amount" name="amount"
                               placeholder="Type amount"/>
                    </InputWrapper>
                    <InputWrapper>
                        <label htmlFor="currency">Currency</label>
                        <Select id="currency" name="currency" onChange={handleOptionChange}
                                value={currentCurrencyOption}>
                            {currencyOptions?.length && currencyOptions.map((currencyOption: ICurrencyOption) => (
                                <option key={currencyOption.id}
                                        value={currencyOption.id}>
                                    {currencyOption.value}
                                </option>
                            ))}
                        </Select>
                    </InputWrapper>
                    <InputWrapper>
                        <Submit type="submit" value="Convert"/>
                    </InputWrapper>
                </FormWrapper>
            </form>
            <ResultWrapper>{convertResult}</ResultWrapper>
        </FormBackground>
    );
};