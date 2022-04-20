import { createContext } from "react";

let horizontal = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
let vertical = Array.from({ length: 10 }, (v, k) => k + 1);
let defaultState = [];
let board = {
  id: "",
  isShip: false,
  isShoot: false,
  isCompleted: false,
  prev: null,
  next: null,
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
  SHOOT: "SHOOT",
  START_GAME: "START_GAME",
};
let newState = [];
function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.START_GAME:
      newState = state.map((item) => {
        return item.map((el, index) => {
          if (el) {
            return {
              ...el,
              prev: item[index - 1] || null,
              next: item[index + 1] || null,
            };
          } else return el;
        });
      });
      return newState;
    case ACTION_TYPES.ADD_SHIP:
      newState = state.map((item) => {
        return item.map((el, index) => {
          if (el.id === action.id) {
            return {
              ...el,
              isShip: !el.isShip,
            };
          } else return el;
        });
      });
      return newState;
    case ACTION_TYPES.SHOOT:
      newState = state.map((item) => {
        return item.map((el) => {
          if (el.id === action.id) {
            return {
              ...el,
              isShoot: !el.isShoot,
              isCompleted: true,
            };
          } else return el;
        });
      });
      return newState;
  }
}

export { defaultState, State, reducer, ACTION_TYPES };
