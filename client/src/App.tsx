import "./App.css";
import { socket } from "./socket";

socket.on("connect", () => {
  console.log(socket.id);
});
socket.on("welcome", (message) => {
  console.log(message);
})

export default function App() {

  return (
    <>
      <p>yo girl</p>
    </>
  )
}