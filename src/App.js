import Nav from "./components/Nav";
import MyBoard from "./components/MyBoard";
import OpponentsBoard from "./components/OpponentsBoard";
import Footer from "./components/Footer";
import "./App.css";

function App() {
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
