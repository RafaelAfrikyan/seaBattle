const secondDefaultState = [
  { isActive: false, isKill: false, count: 0, boards: [] },
  { isActive: false, isKill: false, count: 0, boards: [] },
  { isActive: false, isKill: false, count: 0, boards: [] },
  { isActive: false, isKill: false, count: 0, boards: [] },
];

const SECOND_ACTION_TYPES = {
  CHOSE_SHEEP: "CHOSE_SHEEP",
  SHOOT: "SHOOT",
};

function secondReducer(secondState, action) {
  switch (action.type) {
    case SECOND_ACTION_TYPES.CHOSE_SHEEP:
      secondState[action.number - 1] = {
        ...secondState[action.number - 1],
        isActive: true,
        count: action.number,
      };
      return [...secondState];
    case SECOND_ACTION_TYPES.ADD_SHIP:
      secondState = secondState.map((el) => {
        if (el.isActive && el.boards.length < el.count) {
          return { ...el, boards: [...el.boards, action.id] };
        } else return { ...el, isActive: false };
      });
      return [...secondState];

    case SECOND_ACTION_TYPES.SHOOT:
      secondState = secondState.map((el) => {
        if (el.boards.includes(action.id) || el.boards.length === 0) {
          return {
            ...el,
            boards: [el.boards.splice(el.boards.indexOf(action.id), 1)],
            isKill: true,
          };
        } else if (el.boards.includes(action.id)) {
          return {
            ...el,
            boards: [el.boards.splice(el.boards.indexOf(action.id), 1)],
          };
        } else return { ...el };
      });

      return [...secondState];
  }
}
export { secondDefaultState, secondReducer, SECOND_ACTION_TYPES };
