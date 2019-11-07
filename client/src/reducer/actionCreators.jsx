import * as actionTypes from "./actionTypes";

export const goTop = res => {
  return {
    type: actionTypes.GOTOP,
    value: res
  };
};
