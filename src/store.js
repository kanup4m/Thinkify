import thunk from "redux-thunk";

import { applyMiddleware, createStore } from "redux";
import emailList from "./reducers/emailReducers";

// middlewares
const middleware = applyMiddleware(thunk);

// store
const store = createStore(emailList, middleware);
export default store;
