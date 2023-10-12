import React from 'react';
import './PreviewTable.css';

export function PreviewTable({dataApiFromBsc}) {
    return (
        dataApiFromBsc.length > 0 && (
            <div>
                <h1>Preview</h1>
                <table>
                    <thead>
                    <tr>
                        <th>/</th>
                        <th>amount</th>
                        <th>amountUsd</th>
                        <th>count</th>
                        <th>currency (USDT)</th>
                        <th>date</th>
                        <th>maxAmount</th>
                        <th>maxDate</th>
                        <th>receiver</th>
                        <th>sender</th>
                        <th>senderCount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataApiFromBsc.map((data, index) => {
                        return (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{data.amount}</td>
                                <td>{data.amountUsd}</td>
                                <td>{data.count}</td>
                                <td>{data.currency.symbol}</td>
                                <td>{data.date.date}</td>
                                <td>{data.maxAmount}</td>
                                <td>{data.maxDate}</td>
                                <td>{data.receiver.address}</td>
                                <td>{data.sender.address}</td>
                                <td>{data.senderCount}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    );
}

export default PreviewTable;
