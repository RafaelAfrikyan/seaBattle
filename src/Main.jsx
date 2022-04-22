import React, { useReducer } from "react";
import { defaultState, State, reducer, ACTION_TYPES } from "./state";
// import AudioPlayer from './AudioPlayer'
import ReactAudioPlayer from "react-audio-player";
import music from "./assets/SoundHelix-Song-1.mp3";

export default function Main({ setStart, dispatch }) {
  function start() {
    setStart(true);
    dispatch({
      type: ACTION_TYPES.START_GAME,
    });
  }
  return (
    <div className="first">
      <ReactAudioPlayer className="playBtn" src={music} autoPlay controls />
      <button onClick={start}>Start Game</button>
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  );
}
