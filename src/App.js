import Nav from "./components/Nav";
import MyBoard from "./components/MyBoard";
import OpponentsBoard from "./components/OpponentsBoard";
import Footer from "./components/Footer";
import "./App.css";
import { io } from "socket.io-client";

function App() {

  const socket = io("http://localhost:3001");

  return (
    <>
      <Nav />
      <div className="board-wrapper">
        <MyBoard />
        <OpponentsBoard />
      </div>
      <Footer />
    </>
  );
}

export default App;
