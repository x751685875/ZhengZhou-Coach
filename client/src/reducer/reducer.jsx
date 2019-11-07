import * as actionTypes from "./actionTypes";

const defaultState = {
  goTop: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GOTOP:
      let newGoTop = {
        ...state,
        goTop: action.value
      };
      return newGoTop;
    default:
      return state;
  }
};
