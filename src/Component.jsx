
import {  ACTION_TYPES } from "./state";
import React, { useReducer, useState } from "react";
import BasicSelect from "./Dropdown/Dropdown";
import {
  SECOND_ACTION_TYPES,
  secondDefaultState,
  secondReducer,
} from "./secondState";

export default function Component({dispatch, state }) {
  let horizontal = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  let vertical = Array.from({ length: 10 }, (v, k) => k + 1);
 
  const [secondState, secondDispatch] = useReducer(
    secondReducer,
    secondDefaultState
  );
  const [addShip, setAddShip] = useState(false);
  const [shoot, setShoot] = useState(false);
  
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
  const startGame = () => {
    setStart(!start);
  };
  return (
      
    <div className="gago">
        

      <button onClick={startGame}>Start</button>
      <div className="gogo">
        <div>
            
          <div className="wrapper">
            <div className="play">
              <div className="buttonWrap">
                <BasicSelect
                  addShip={addShip}
                  setAddShip={setAddShip}
                  secondDispatch={secondDispatch}
                />
                <button className="AddShip" onClick={() => setAddShip(true)}>
                  Add Ship
                </button>
                <button className="Shoot " onClick={shootButton}>
                  Shoot
                </button>
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
                            className={`item ${
                              el.isShip && !start ? "activeItem" : ""
                            }`}
                          >
                            {el.isShoot && el.isShip ? (
                              <div>yes</div>
                            ) : (
                              el.isShoot && <div>no</div>
                            )}
                            {/* {el.isShoot &&
                              el.isShip &&
                              !el.prev.isShip &&
                              !el.next.isShip && (
                                <div className="kill">kill</div>
                              )} */}
                          </div>
                        );
                      });
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div classname="wrapper2">
            <div className="play2">
              {/* <div className="buttonWrap"> */}
              {/* <BasicSelect
                  addShip={addShip}
                  setAddShip={setAddShip}
                  secondDispatch={secondDispatch}
                /> */}
              {/* <button onClick={() => setAddShip(true)}>Add Ship</button>
                <button onClick={shootButton}>Shoot</button> */}
              {/* </div> */}
              <div className="forhorizont2">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
