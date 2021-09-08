import React, {useContext, useEffect} from 'react';
import styles from "../style/currencyTable.module.scss"
import CurrencyRateContext from "../context/currencyRateContext";
import {useQuery} from "react-query";
import {getRates} from "../api/currencyApi";
import {processCurrency} from "../service/currencyService";

export default function CurrencyTable() {
    const {currencyRates, saveCurrencyRates} = useContext(CurrencyRateContext) as ContextType;

    const query = useQuery('currencyRates', () =>
        getRates().then((res) => processCurrency(res.data))
    );

    useEffect(() => {
        if (query?.data?.length) {
            saveCurrencyRates(query.data as ICurrencyRate[]);
        }
    }, [query.data])

    return (
        <div className={styles.tableWrapper}>
            <div className={styles.tableScroll}>
                <table cellSpacing="0" cellPadding="0" className={styles.center} style={{paddingTop: '2rem'}}
                       id="currency-table">
                    <thead>
                    <tr className={styles.tableHeader}>
                        <th>Country</th>
                        <th>Currency</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currencyRates.map(currencyRate => (
                        <tr key={currencyRate.id}>
                            <td>{currencyRate.country}</td>
                            <td>{currencyRate.currency}</td>
                            <td>{currencyRate.rate}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};