import {useState} from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

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

                >
                    Submit
                </button>
            </div>
        </div>
    )
}