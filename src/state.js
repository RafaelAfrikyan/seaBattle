import { createContext } from "react";

let horizontal = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
let vertical = Array.from({ length: 10 }, (v, k) => k + 1);
let defaultState = [];

vertical.map((item, i) => {
  let innerArr = horizontal.map((el, index) => {
    return {
      id: `${item}${el}`,
      isShip: false,
      isShoot: false,
      isKill: false,
      shipLength: [],
      prev: null,
      next: null,
    };
  });
  defaultState.push(innerArr);
});

const State = createContext(defaultState);

const ACTION_TYPES = {
  ADD_SHIP: "ADD_SHIP",
  SHOOT: "SHOOT",
  START_GAME: "START_GAME",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.START_GAME:
      state.forEach((item, i) => {
        item.map((el, index) => {
          if (el) {
            el.next = state[i][index + 1];
            el.prev = state[i][index - 1];
          } else return el;
        });
      });
      return state;
    case ACTION_TYPES.ADD_SHIP:
      state.forEach((item, i) => {
        item.map((el, index) => {
          if (el.id === action.id) {
            if (state[i][index + 1].isShip) {
              state[i][index + 1].prev = el;
              el.next = state[i][index + 1];
            }
            if (state[i][index - 1].isShip) {
              state[i][index - 1].next = el;
              el.prev = state[i][index - 1];
            }
            if (state[i + 1][index].isShip) {
              state[i + 1][index].prev = el;
              el.next = state[i + 1][index];
            }
            if (state[i - 1][index].isShip) {
              state[i - 1][index].next = el;
              el.prev = state[i - 1][index];
            }
            return (el.isShip = true);
          } else return el;
        });
      });
      return state;
    case ACTION_TYPES.SHOOT:
      state.forEach((item, i) => {
        item.map((el, index) => {
          if (el.id === action.id) {
            return (el.isShoot = true);
          } else return el;
        });
      });
      return state;
  }
}

export { defaultState, State, reducer, ACTION_TYPES };
