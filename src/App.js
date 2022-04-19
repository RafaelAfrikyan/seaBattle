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
import Main from "./Main";

function App() {
  let horizontal = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  let vertical = Array.from({ length: 10 }, (v, k) => k + 1);
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [secondState, secondDispatch] = useReducer(
    secondReducer,
    secondDefaultState
  );
  const [addShip, setAddShip] = useState(false);
  const [shoot, setShoot] = useState(false);
  const [clickShoot, setClickShoot] = useState(false);
  const [start, setStart] = useState(false);

  console.log(state);
  console.log(secondState);

  function chooseItem(e) {
    addShip &&
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

    if (shoot) {
      setAddShip(false);
      dispatch({
        type: ACTION_TYPES.SHOOT,
        id: e.target.id,
      });
      secondDispatch({
        type: SECOND_ACTION_TYPES.SHOOT,
        id: e.target.id,
      });
    }
  }
  console.log(addShip);

  function shootButton() {
    setAddShip(false);
    setShoot(!shoot);
  }

  return (
    <div className="App">
      {!start && <Main setStart={setStart} />}
      {start && (
        <>
          <div className="buttonWrap">
            <BasicSelect
              addShip={addShip}
              setAddShip={setAddShip}
              secondDispatch={secondDispatch}
            />
            <button onClick={() => setAddShip(true)}>Add Ship</button>
            <button onClick={shootButton}>Shoot</button>
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
                      >
                        {el.isShoot && el.isShip ? (
                          <div>yes</div>
                        ) : (
                          el.isShoot && <div>no</div>
                        )}
                      </div>
                    );
                  });
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
