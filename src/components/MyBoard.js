import { createElement, React, useEffect, useState } from "react";

const MyBoard = () => {
  let cells;
  let dragInfo = {};
  let wasDroppedFired = false;

  function dragStartShip(e) {
    const insertedAt = {
      x: Number(e.path[1].dataset.x),
      y: Number(e.path[1].dataset.y),
    };
    dragInfo = { type: e.target.classList[0], insertedAt: insertedAt };
    const length = Number(e.target.classList[0].split("-")[1]);
    const position = e.target.classList[0].split("-")[0];
    removeShip(insertedAt.x, insertedAt.y, length, position);
  }

  function dragOver(e) {
    e.preventDefault();
    if (!dragInfo.hasOwnProperty("grabbedAt")) {
      dragInfo = {
        ...dragInfo,
        grabbedAt: e.target.dataset,
      };
    }
  }

  function dragEnd(e) {
    if (!wasDroppedFired) {
      addShip(
        Number(dragInfo.insertedAt.x),
        Number(dragInfo.insertedAt.y),
        Number(dragInfo.type.split("-")[1]),
        dragInfo.type.split("-")[0]
      );
    }
    wasDroppedFired = false;
  }

  function drop(e) {
    e.preventDefault();
    wasDroppedFired = true;
    const length = dragInfo.type.split("-")[1];
    const position = dragInfo.type.split("-")[0];
    const offset =
      position === "vertical"
        ? dragInfo.grabbedAt.y - dragInfo.insertedAt.y
        : dragInfo.grabbedAt.x - dragInfo.insertedAt.x;
    const endPosition = e.target.dataset;
    const newPosition =
      position === "horizontal"
        ? { x: endPosition.x - offset, y: endPosition.y }
        : { x: endPosition.x, y: endPosition.y - offset };

    if (
      !e.target.draggable &&
      isPlaceable(
        Number(newPosition.x),
        Number(newPosition.y),
        Number(length),
        position
      )
    ) {
      addShip(
        Number(newPosition.x),
        Number(newPosition.y),
        Number(length),
        position
      );
    } else {
      addShip(
        Number(dragInfo.insertedAt.x),
        Number(dragInfo.insertedAt.y),
        Number(length),
        position
      );
    }
  }

  function isPlaceable(x, y, len, position) {
    if (
      (position === "horizontal" && len + x < 11 && x >= 0) ||
      (position === "vertical" && len + y < 11 && y >= 0)
    ) {
      if (position === "horizontal") {
        for (let i = -1; i < len + 1; i++) {
          for (let j = -1; j < 2; j++) {
            if (
              document.querySelector(`[data-x='${x + i}'][data-y='${y + j}']`)
            ) {
              if (
                /taken/.test(
                  document.querySelector(
                    `[data-x='${x + i}'][data-y='${y + j}']`
                  ).className
                )
              ) {
                return false;
              }
            }
          }
        }
      }

      if (position === "vertical") {
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < len + 1; j++) {
            if (
              document.querySelector(`[data-x='${x + i}'][data-y='${y + j}']`)
            ) {
              if (
                /taken/.test(
                  document.querySelector(
                    `[data-x='${x + i}'][data-y='${y + j}']`
                  ).className
                )
              ) {
                return false;
              }
            }
          }
        }
      }
      return true;
    } else {
      return false;
    }
  }

  function addShip(x, y, len, position) {
    if (isPlaceable(x, y, len, position)) {
      let square = document.querySelector(`[data-x='${x}'][data-y='${y}']`);
      let ship = document.createElement("div");
      square.classList.add("droppable-cell");
      ship.classList.add(`${position}-${len}`, "ship");
      ship.draggable = true;
      square.appendChild(ship);

      if (position === "horizontal") {
        for (let i = 0; i < len; i++) {
          document
            .querySelector(`[data-x='${x + i}'][data-y='${y}']`)
            .classList.add("taken");
        }
      }
      if (position === "vertical") {
        for (let i = 0; i < len; i++) {
          document
            .querySelector(`[data-x='${x}'][data-y='${y + i}']`)
            .classList.add("taken");
        }
      }
      ship.addEventListener("dragstart", dragStartShip);
      ship.addEventListener("dragend", dragEnd);
    }
  }

  function addShipRandomly(x, y, len, position) {
    if (isPlaceable(x, y, len, position)) {
      addShip(x, y, len, position);
    } else {
      addShipRandomly(randomNum(9), randomNum(9), len, randomPosition());
    }
  }

  function removeShip(x, y, length, position) {
    setTimeout(() => {
      document
        .querySelector(`[data-x='${x}'][data-y='${y}']`)
        .lastChild.remove();
      document
        .querySelector(`[data-x='${x}'][data-y='${y}']`)
        .classList.remove("droppable-cell");
    }, 0);
    for (let i = 0; i < length; i++) {
      if (position === "horizontal") {
        document
          .querySelector(`[data-x='${x + i}'][data-y='${y}']`)
          .classList.remove("taken");
      } else {
        document
          .querySelector(`[data-x='${x}'][data-y='${y + i}']`)
          .classList.remove("taken");
      }
    }
  }

  function addAllShips() {
    removeAllClassesFromBoard();
    callFunc(1, () =>
      addShipRandomly(randomNum(9), randomNum(9), 4, randomPosition())
    );
    callFunc(2, () =>
      addShipRandomly(randomNum(9), randomNum(9), 3, randomPosition())
    );
    callFunc(3, () =>
      addShipRandomly(randomNum(9), randomNum(9), 2, randomPosition())
    );
    callFunc(4, () =>
      addShipRandomly(randomNum(9), randomNum(9), 1, randomPosition())
    );
  }

  function callFunc(num, func) {
    while (num > 0) {
      func();
      num--;
    }
  }

  function removeAllClassesFromBoard() {
    document.querySelectorAll(".ship").forEach((e) => e.remove());
    document
      .querySelectorAll(".taken")
      .forEach((e) => e.classList.remove("taken"));
    document
      .querySelectorAll(".droppable-cell")
      .forEach((e) => e.classList.remove("droppable-cell"));
  }

  function randomNum(boundary) {
    return boundary === 1
      ? Math.round(Math.random())
      : Math.floor(Math.random() * boundary);
  }

  function randomPosition() {
    let random = randomNum(1);
    return random === 1 ? "horizontal" : "vertical";
  }

  const board = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      board.push(
        <div
          className="battlefield-cell"
          onDragOver={dragOver}
          onDrop={drop}
          data-x={j}
          data-y={i}
          key={[i, j]}
        >
          {j === 0 && <div className="numbers">{i}</div>}
          {i === 0 && (
            <div className="letters">{String.fromCharCode(65 + j)}</div>
          )}
        </div>
      );
    }
  }

  useEffect(() => {
    cells = document.querySelectorAll(".battlefield-cell");
    addAllShips();
  }, []);

  return (
    <>
      <div className="left-side">
        <div className="board-container">{board}</div>
        <button onClick={addAllShips}>Random Board</button>
      </div>
    </>
  );
};

export default MyBoard;
