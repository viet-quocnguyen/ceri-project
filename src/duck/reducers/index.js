import { combineReducers } from "redux";

let dataState = { data: [], loading: true };

const dataReducer = (state = dataState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  dataReducer
});

export default rootReducer;
