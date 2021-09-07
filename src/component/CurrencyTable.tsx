import React from 'react';
import styles from "../style/currencyTable.module.scss"
import {useQuery} from "react-query";
import {getRates} from "../api/currencyApi";
import {processCurrency} from "../service/currencyService";

export default function CurrencyTable() {
    const query = useQuery('rates', () =>
        getRates().then((res) => processCurrency(res.data))
    );

    return (
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
            {query.data?.length &&
            query.data.map((row: any) => (
                <tr>{row.map((data: any) => (
                    <td>{data}</td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};