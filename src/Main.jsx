import React, { useReducer } from "react";
import { defaultState, State, reducer, ACTION_TYPES } from "./state";



export default function Main({ setStart, dispatch }) {
  function start() {
    setStart(true);
    dispatch({
      type: ACTION_TYPES.START_GAME,
    });
  }
  return (
    <div className="first">
      

      <button onClick={start}>Start Game</button>
      <div class="ocean">
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
    </div>
  );
}
