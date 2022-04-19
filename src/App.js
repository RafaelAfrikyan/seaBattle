import "./App.css";
import myArr from "./state";
import { defaultState, State, reducer, ACTION_TYPES } from "./state";
import React, { useReducer, useState } from "react";
import BasicSelect from "./Dropdown/Dropdown";
import {
  SECOND_ACTION_TYPES,
  secondDefaultState,
  secondReducer,
} from "./secondState";

function App() {
  let horizontal = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  let vertical = Array.from({ length: 10 }, (v, k) => k + 1);
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [secondState, secondDispatch] = useReducer(
    secondReducer,
    secondDefaultState
  );
  const [addShip, setAddShip] = useState(false);

  console.log(state);
  console.log(secondState);

  function chooseItem(e) {
    secondState.map((el) => {
      if (el.isActive && el.count > el.boards.length) {
        dispatch({
          type: ACTION_TYPES.ADD_SHIP,
          id: e.target.id,
        });
        secondDispatch({
          type: SECOND_ACTION_TYPES.ADD_SHIP,
          id: e.target.id,
        });
      }
    });
  }
  console.log(addShip);

  return (
    <div className="App">
      <div className="buttonWrap">
        <BasicSelect
          addShip={addShip}
          setAddShip={setAddShip}
          secondDispatch={secondDispatch}
        />
        <button onClick={() => setAddShip(true)}>Add Ship</button>
      </div>
      <div className="forhorizont">
        <div className="vertical">
          {vertical.map((el) => {
            return <div>{el}</div>;
          })}
        </div>

        <div className="letters-with-board">
          <div className="horizontal">
            {horizontal.map((el) => {
              return <div>{el}</div>;
            })}
          </div>

          <div className="items">
            {state.map((item) => {
              return item.map((el) => {
                return (
                  <div
                    onClick={chooseItem}
                    value={el.id}
                    key={el.id}
                    id={el.id}
                    className={`item ${el.isShip ? "activeItem" : ""}`}
                  ></div>
                );
              });
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
