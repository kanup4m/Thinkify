import { combineReducers } from "redux";
import { emailReducer } from "./emailReducers";

const reducers = combineReducers({
  emailReducer: emailReducer,
});

export default reducers;
