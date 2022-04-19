import React from "react";

export default function Main({ setStart }) {
  return (
    <div className="first">
      <button onClick={() => setStart(true)}>Start Game</button>
    </div>
  );
}
