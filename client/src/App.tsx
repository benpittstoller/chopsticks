import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socket";

export default function App() {
	function sendMessage() {
		socket.emit("sendMessage", { message });
	}

	const [message, setMessage] = useState("");
	const [messageReceived, setMessageRecieved] = useState("");

	useEffect(() => {
		socket.on("receiveMessage", (data: any) => {
			setMessageRecieved(data.message);
		})
	}, [socket]);
	return (
		<>
			<input type="text" onChange={ (e: any) => { setMessage(e.target.value); } } />
			<button onClick={sendMessage}> Send Message </button>
			<p>{messageReceived}</p>
		</>
	)
}