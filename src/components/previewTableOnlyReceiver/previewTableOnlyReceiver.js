import React from 'react';
import './previewTableOnlyReceiver.css';

export function PreviewTableOnlyReceiver({dataApiFromBscOnlyReceiver}) {
    // 'amount', 'amountUsd', 'count', "currency (USDT)", 'date', 'hash', 'maxAmount', 'maxDate', 'receiver', 'senderCount'
    return (
        dataApiFromBscOnlyReceiver.length > 0 && (
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
                        <th>hash</th>
                        <th>maxAmount</th>
                        <th>maxDate</th>
                        <th>receiver</th>
                        <th>senderCount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataApiFromBscOnlyReceiver.map((data, index) => {
                        return (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{data.amount}</td>
                                <td>{data.amountUsd}</td>
                                <td>{data.count}</td>
                                <td>{data.currency.symbol}</td>
                                <td>{data.date.date}</td>
                                <td>{data.hash.hash}</td>
                                <td>{data.maxAmount}</td>
                                <td>{data.maxDate}</td>
                                <td>{data.receiver.address}</td>
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

export default PreviewTableOnlyReceiver;
