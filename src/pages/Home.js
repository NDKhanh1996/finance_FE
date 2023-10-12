import {useState} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {BlockService} from "../service/block.service";

export function Home() {
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [senderAddress, setSenderAddress] = useState("");
    const [receiverAddress, setReceiverAddress] = useState("");
    const [contractAddress, setContractAddress] = useState("");
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
            const dateFrom = dateRange[0].toISOString().slice(0,19);
            const dateTill = dateRange[1].toISOString().slice(0,19);
            const res = await BlockService.getDataApiFromBsc({token, sender, receiver, dateFrom, dateTill});
            console.log(res)
        } catch (e) {
            console.log(e);
        }
    }

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
                display: "flex",
                flexDirection: "column",
                gap: "5px"
            }}>
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
                <input
                    type="text"
                    placeholder="Contract address"
                    value={contractAddress}
                    onChange={handleContractAddress}
                />
                <button
                    onClick={getDataApiFromBsc}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}