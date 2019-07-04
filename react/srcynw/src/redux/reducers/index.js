import { combineReducers } from "redux";
import list from "./list";
import detail from "./detail";
import search from "./search";

const reducers = combineReducers({
  list,
  detail,
  search
});

export default reducers;
