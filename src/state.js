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
let newState = [];
function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.START_GAME:
      newState = state.map((item, i) => {
        return item.map((el, index) => {
          if (el) {
            return {
              ...el,
            };
          } else return el;
        });
      });
      return newState;
    case ACTION_TYPES.ADD_SHIP:
      newState = state.map((item, i) => {
        return item.map((el, index) => {
          if (el.id === action.id) {
            if (state[i][index - 1].isShip && state[i][index + 1].isShip) {
              state[i][index - 1].next = { ...el, isShip: true };
              state[i][index + 1].prev = { ...el, isShip: true };
              return {
                ...el,
                isShip: !el.isShip,
                next: state[i][index + 1],
                prev: state[i][index - 1],
              };
            } else if (
              state[i][index - 1].isShip &&
              !state[i][index + 1].isShip
            ) {
              state[i][index - 1].next = { ...el, isShip: true };
              return {
                ...el,
                isShip: !el.isShip,
                prev: { ...state[i][index - 1] },
              };
            } else if (
              state[i][index + 1].isShip &&
              !state[i][index - 1].isShip
            ) {
              state[i][index + 1].prev = { ...el, isShip: true };
              return {
                ...el,
                isShip: !el.isShip,
                next: state[i][index + 1],
              };
            } else if (
              state[i - 1][index] &&
              state[i - 1][index].isShip &&
              state[i + 1] &&
              state[i + 1][index].isShip
            ) {
              state[i - 1][index].next = { ...el, isShip: true };
              state[i + 1][index].prev = { ...el, isShip: true };
              return {
                ...el,
                isShip: !el.isShip,
                next: state[i + 1][index],
                prev: state[i - 1][index],
              };
            } else if (
              state[i - 1][index] &&
              state[i - 1][index].isShip &&
              state[i + 1] &&
              !state[i + 1][index].isShip
            ) {
              state[i - 1][index].next = { ...el, isShip: true };
              return {
                ...el,
                isShip: !el.isShip,
                prev: state[i - 1][index],
              };
            } else if (
              state[i + 1][index] &&
              state[i + 1][index].isShip &&
              !state[i][index + 1]
            ) {
              state[i + 1][index].next = { ...el, isShip: true };
              return {
                ...el,
                isShip: !el.isShip,
                prev: state[i + 1][index],
              };
            } else if (
              state[i + 1][index].isShip &&
              state[i - 1][index].isShip
            ) {
              state[i + 1][index].prev = { ...el, isShip: true };
              state[i - 1][index].next = { ...el, isShip: true };
              return {
                ...el,
                isShip: !el.isShip,
                next: state[i + 1][index],
                prev: state[i - 1][index],
              };
            } else
              return {
                ...el,
                isShip: !el.isShip,
              };
          } else return el;
        });
      });
      return newState;
    case ACTION_TYPES.SHOOT:
      newState = state.map((item, i) => {
        return item.map((el, index) => {
          if (el.id === action.id) {
            if (
              !state[i][index - 1].isShip &&
              !state[i][index + 1].isShip &&
              !state[i - 1][index].isShip &&
              !state[i + 1][index].isShip
            ) {
              return {
                ...el,
                isShoot: !el.isShoot,
                isKill: true,
              };
            } else if (
              state[i][index - 1].isShip &&
              state[i][index - 1].isShoot &&
              !state[i][index + 1].isShip &&
              !state[i + 1][index].isShip &&
              !state[i - 1][index].isShip
            ) {
              state[i][index - 1].next = { ...el, isShoot: true };
              return {
                ...el,
                isKill: true,
                isShoot: !el.isShoot,
                prev: { ...state[i][index - 1], isShoot: true },
              };
            } else if (
              !state[i][index - 1].isShip &&
              !state[i + 1][index].isShip &&
              !state[i - 1][index].isShip &&
              state[i][index + 1].isShip &&
              state[i][index + 1].isShoot
            ) {
              state[i][index + 1].prev = { ...el, isShoot: true };
              return {
                ...el,
                isShoot: !el.isShoot,
                isKill: true,
                next: { ...state[i][index + 1], isShoot: true },
              };
            } else if (
              state[i - 1][index].isShip &&
              state[i - 1][index].isShoot &&
              !state[i + 1][index].isShip &&
              !state[i][index + 1].isShip &&
              !state[i][index - 1].isShip
            ) {
              state[i - 1][index].next = { ...el, isShoot: true };
              return {
                ...el,
                isKill: true,
                isShoot: !el.isShoot,
                prev: { ...state[i][index - 1], isShoot: true },
              };
            } else if (
              !state[i - 1][index].isShip &&
              !state[i][index + 1].isShip &&
              !state[i][index - 1].isShip &&
              state[i + 1][index].isShip &&
              state[i + 1][index].isShoot
            ) {
              state[i][index + 1].prev = { ...el, isShoot: true };
              return {
                ...el,
                isShoot: !el.isShoot,
                isKill: true,
                next: { ...state[i][index + 1], isShoot: true },
              };
            } else if (
              state[i - 1][index].isShip &&
              state[i - 1][index].isShoot
            ) {
              state[i][index - 1].next = { ...el, isShoot: true };
              return {
                ...el,
                isShoot: !el.isShoot,
                prev: { ...state[i - 1][index], isShoot: true },
              };
            } else if (
              state[i + 1][index].isShip &&
              state[i + 1][index].isShoot
            ) {
              state[i][index + 1].next = { ...el, isShoot: true };
              return {
                ...el,
                isShoot: !el.isShoot,
                prev: { ...state[i + 1][index], isShoot: true },
              };
            } else if (
              state[i][index + 1].isShip &&
              state[i][index + 1].isShoot &&
              state[i][index - 1].isShip &&
              state[i][index - 1].isShoot
            ) {
              state[i][index + 1].prev = { ...el, isShoot: true };
              return {
                ...el,
                isShoot: !el.isShoot,
                isKill: true,
                next: { ...state[i][index + 1], isShoot: true },
                prev: { ...state[i][index - 1], isShoot: true },
              };
            } else if (
              state[i - 1][index].isShip &&
              state[i - 1][index].isShoot &&
              state[i + 1][index].isShip &&
              state[i + 1][index].isShoot
            ) {
              state[i - 1][index].next = { ...el, isShoot: true };
              state[i + 1][index].prev = { ...el, isShoot: true };
              return {
                ...el,
                isShoot: !el.isShoot,
                isKill: true,
                next: state[i + 1][index],
                prev: state[i - 1][index],
              };
            } else if (
              state[i - 1][index].isShip &&
              state[i - 1][index].isShoot &&
              state[i + 1][index].isShip &&
              !state[i + 1][index].isShoot
            ) {
              state[i - 1][index].next = { ...el, isShoot: true };
              return {
                ...el,
                isShoot: !el.isShoot,
                next: state[i + 1][index],
                prev: { ...state[i - 1][index], isShoot: true },
              };
            } else if (
              state[i + 1][index].isShip &&
              state[i + 1][index].isShoot &&
              state[i - 1][index].isShip &&
              state[i - 1][index].isShoot
            ) {
              state[i + 1][index].prev = { ...el, isShoot: true };
              state[i - 1][index].next = { ...el, isShoot: true };
              return {
                ...el,
                isShoot: !el.isShoot,
                isKill: true,
                next: { ...state[i + 1][index], isShoot: true },
                prev: { ...state[i - 1][index], isShoot: true },
              };
            } else
              return {
                ...el,
                isShoot: !el.isShoot,
              };
          } else return el;
        });
      });
      return newState;
  }
}

export { defaultState, State, reducer, ACTION_TYPES };
