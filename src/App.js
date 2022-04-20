import { useState, useReducer } from "react";
import "./App.css";
import Component from "./Component";
import Main from "./Main";
import { defaultState, State, reducer, ACTION_TYPES } from "./state";

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [start, setStart] = useState(false);
  return (
    <div className="App">
      {!start && <Main state={state} setStart={setStart} dispatch={dispatch} />}
      {start && (
        <Component state={state} dispatch={dispatch} reducer={reducer} />
      )}
      {/* <div className="massages">Masseges</div> */}
      {/* {start && <Component />} */}
    </div>
  );
}

export default App;
