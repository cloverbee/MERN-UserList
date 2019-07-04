import { combineReducers } from "redux";
import list from "./list";
import userDetail from "./userDetail";
import search from "./search";
import saveUser from './saveUser';

const reducers = combineReducers({
  list,
  userDetail,
  search,
  saveUser,
});

export default reducers;
