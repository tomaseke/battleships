import React, {useState} from "react";

const OpponentsBoard = () => {

  const [didGameStart, setDidGameStart] = useState(false);
  const [opponent, setOpponent] = useState('random');

  function startGame(){
    setDidGameStart(true);
  }

  const board = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      board.push(
        <div
          className="battlefield-cell"
          data-x={j}
          data-y={i}
          key={[i, j]}
        >
          <div className="numbers">{j === 0 && i + 1}</div>
          <div className="letters">
            {i === 0 && String.fromCharCode(65 + j)}
          </div>
        </div>
      );
    }
  }

  return (
    <div className="start-game">
      {!didGameStart && (
        <div className="absolute-center on-top">
          <h2>Opponent</h2>
          <button>Random</button>
          <button>Friend</button>
          <button onClick={startGame}>PLAY</button>
        </div>
      )}
      <div className={`board-container ${!didGameStart && "blur"}`}>{board}</div>
    </div>
  );
  
};

export default OpponentsBoard;
