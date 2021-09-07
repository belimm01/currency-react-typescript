import React from 'react';
import {useForm} from "react-hook-form";
import styles from "../style/currencyForm.module.scss"

export default function CurrencyForm() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <div className={styles.formBackground}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{display: 'flex', alignItems: 'flex-end'}}>
                    <div style={{flex: '1', textAlign: 'left'}}>
                        <label htmlFor="amount">Amount</label>
                        <input type="number" defaultValue={1} id="amount" name="amount" placeholder="Type amount"/>
                    </div>
                    <div style={{flex: '1', textAlign: 'left'}}>
                        <label htmlFor="currency">Currency</label>
                        <select id="currency" name="currency">

                        </select>
                    </div>
                    <div style={{flex: '1'}}>
                        <input type="submit" value="Convert"/>
                    </div>
                </div>
            </form>
        </div>
    );
};