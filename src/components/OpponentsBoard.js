import React from "react";

const OpponentsBoard = () => {
  function handleCellClicked(e) {
    console.log(e);
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
          onClick={handleCellClicked}
        >
          <div className="numbers">{j === 0 && i}</div>
          <div className="letters">
            {i === 0 && String.fromCharCode(65 + j)}
          </div>
        </div>
      );
    }
  }

  return <div className="board-container">{board}</div>;
};

export default OpponentsBoard;
