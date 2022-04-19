import { createContext } from "react";

let horizontal = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
let vertical = Array.from({ length: 10 }, (v, k) => k + 1);
let defaultState = [];
let board = {
  id: "",
  isShip: false,
  isShot: false,
  isCompleted: false,
  prev: {},
  next: {},
  shipLength: [],
};

for (let i = 0; i < vertical.length; i++) {
  let innerArr = horizontal.map((el) => {
    return { ...board, id: `${vertical[i]}${el}` };
  });
  defaultState.push(innerArr);
}

const State = createContext(defaultState);

const ACTION_TYPES = {
  ADD_SHIP: "ADD_SHIP",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD_SHIP:
      const newState = state.map((item) => {
        return item.map((el, index) => {
          if (el.id === action.id) {
            return {
              ...el,
              isShip: !el.isShip,
              prev: item[index - 1] || null,
              next: item[index + 1] || null,
            };
          } else return el;
        });
      });
      return newState;
  }
}

export { defaultState, State, reducer, ACTION_TYPES };
