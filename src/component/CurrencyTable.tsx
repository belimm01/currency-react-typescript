import React, {useContext, useEffect} from 'react';
import CurrencyRateContext from "../context/currencyRateContext";
import {useQuery} from "react-query";
import {getRates} from "../api/currencyApi";
import {processCurrency} from "../service/currencyService";
import styled, {css} from "styled-components";

const TableWrapper = styled.div`position: relative; padding-top: 3rem;`;
const TableScroll = styled.div`height: 600px; overflow: auto;`;
const Table = styled.table`width: 100%; margin-left: auto; margin-right: auto;`;
const Th = styled.th`
   height: 70px;
   &:last-child {border-radius: 0 10px 10px 0;}
   &:first-child {border-radius: 10px 0 0 10px;}`;
const Thead = styled.thead` color: aliceblue; background: rgb(10, 20, 110);`;
const tableBody = css`padding: 2rem; border-bottom: 1px solid rgba(206, 193, 193, 0.5);`;
const Tbody = styled.tbody`${tableBody}`;
const Td = styled.td`${tableBody}`;

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
        <TableWrapper>
            <TableScroll>
                <Table id="currency-table" cellSpacing="0" cellPadding="0">
                    <Thead>
                        <tr>
                            <Th>Country</Th>
                            <Th>Currency</Th>
                            <Th>Amount</Th>
                        </tr>
                    </Thead>
                    <Tbody>
                        {currencyRates.map(currencyRate => (
                            <tr key={currencyRate.id}>
                                <Td>{currencyRate.country}</Td>
                                <Td>{currencyRate.currency}</Td>
                                <Td>{currencyRate.rate}</Td>
                            </tr>))}
                    </Tbody>
                </Table>
            </TableScroll>
        </TableWrapper>
    );
};