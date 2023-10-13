import {useState} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {BlockService} from "../service/block.service";
import PreviewTableSenderAndReceiver from "../components/previewTableSenderAndReceiver/previewTableSenderAndReceiver";
import {ExcelService} from "../service/excel.service";
import PreviewTableOnlyReceiver from "../components/previewTableOnlyReceiver/previewTableOnlyReceiver";

export function Home() {
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [contractAddress, setContractAddress] = useState("0x55d398326f99059fF775485246999027B3197955");
    const [senderAddress, setSenderAddress] = useState("0xBd004AC7D6cBdE024d49838dbe6F8aE54e54F53D");
    const [receiverAddress, setReceiverAddress] = useState("0xd41DC89c2812a25156c8bD25Ca1078Ae309d439A");
    const [dataApiFromBsc, setDataApiFromBsc] = useState([]);
    const [senderAndReceiverOPT, setSenderAndReceiverOPT] = useState(true);
    const [receiverOPT, setReceiverOPT] = useState(false);
    const [dataApiFromBscOnlyReceiver, setDataApiFromBscOnlyReceiver] = useState([])

    const senderAndReceiver = () => {
        setSenderAndReceiverOPT(true);
        setReceiverOPT(false);
    }

    const receiver = () => {
        setSenderAndReceiverOPT(false);
        setReceiverOPT(true);
    }

    const onChange = (dateRange) => {
        setDateRange(dateRange);
    }

    const handleSenderAddress = (e) => {
        setSenderAddress(e.target.value);
    }

    const handleReceiverAddress = (e) => {
        setReceiverAddress(e.target.value);
    }

    const handleContractAddress = (e) => {
        setContractAddress(e.target.value);
    }

    const getDataApiFromBsc = async () => {
        try {
            const token = contractAddress;
            const sender = senderAddress;
            const receiver = receiverAddress;
            const dateFrom = dateRange[0].toISOString().slice(0, 19);
            const dateTill = dateRange[1].toISOString().slice(0, 19);
            const res = await BlockService.getDataApiFromBsc({token, sender, receiver, dateFrom, dateTill});
            setDataApiFromBsc(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    const getDataApiFromBscOnlyReceiver = async () => {
        try {
            const token = contractAddress;
            const receiver = receiverAddress;
            const dateFrom = dateRange[0].toISOString().slice(0, 19);
            const dateTill = dateRange[1].toISOString().slice(0, 19);
            const res = await BlockService.getDataApiFromBscOnlyReceiver({token, receiver, dateFrom, dateTill});
            setDataApiFromBscOnlyReceiver(res.data);
        } catch (e) {
            console.log(e);
        }
    }

    const exportExcel = () => {
        if (senderAndReceiverOPT) {
            ExcelService.exportToExcelDataApiFromBsc(dataApiFromBsc);
        } else if (receiverOPT) {
            ExcelService.exportToExcelDataApiFromBscOnlyReceiver(dataApiFromBscOnlyReceiver);
        }
    }

    console.log(dataApiFromBscOnlyReceiver)
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Calendar
                onChange={onChange}
                value={dateRange}
                selectRange={true}
            />
            <div>
                <h5>From: 00:00:00 {dateRange[0].toLocaleDateString()}</h5>
                <h5>To: 23:59:59 {dateRange[1].toLocaleDateString()}</h5>
            </div>
            <div style={{
                marginBottom: "5px"
            }}>
                <button
                    onClick={senderAndReceiver}
                >
                    By sender and receiver
                </button>
                <button
                    onClick={receiver}
                >
                    By receiver
                </button>
            </div>
            {senderAndReceiverOPT && (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px"
                }}>
                    <input
                        type="text"
                        placeholder="Contract address"
                        value={contractAddress}
                        onChange={handleContractAddress}
                    />
                    <input
                        type="text"
                        placeholder="Sender address"
                        value={senderAddress}
                        onChange={handleSenderAddress}
                    />
                    <input
                        type="text"
                        placeholder="Receiver address"
                        value={receiverAddress}
                        onChange={handleReceiverAddress}
                    />
                    <button
                        onClick={getDataApiFromBsc}
                    >
                        Submit
                    </button>
                    <PreviewTableSenderAndReceiver dataApiFromBsc={dataApiFromBsc}/>
                    <button
                        onClick={exportExcel}
                        style={{marginTop: "10px"}}
                    >
                        Export excel
                    </button>
                </div>
            )}
            {receiverOPT && (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px"
                }}>
                    <input
                        type="text"
                        placeholder="Contract address"
                        value={contractAddress}
                        onChange={handleContractAddress}
                    />
                    <input
                        type="text"
                        placeholder="Receiver address"
                        value={receiverAddress}
                        onChange={handleReceiverAddress}
                    />
                    <button
                        onClick={getDataApiFromBscOnlyReceiver}
                    >
                        Submit
                    </button>
                    <PreviewTableOnlyReceiver dataApiFromBscOnlyReceiver={dataApiFromBscOnlyReceiver}/>
                    <button
                        onClick={exportExcel}
                        style={{marginTop: "10px"}}
                    >
                        Export excel
                    </button>
                </div>
            )}
        </div>
    )
}