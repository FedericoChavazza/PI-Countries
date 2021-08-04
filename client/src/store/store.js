import { createStore, applyMiddleware } from "redux";
import country from "../reducer/index";
import thunk from "redux-thunk";

var store = createStore(country, applyMiddleware(thunk));

export default store;
