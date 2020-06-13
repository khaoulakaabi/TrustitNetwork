import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import projectReducer from "./projectReducer";
import clubReducer from "./clubReducer";
import userReducer from "./userReducer";
import flashMessageReducer from "./flashMessageReducer";
import layoutReducer from "./layoutReducer";

export default combineReducers({
  auth: authReducer,
  clubs: clubReducer,
  projects: projectReducer,
  users: userReducer,
  errors: errorReducer,
  flashMessages: flashMessageReducer,
  layout: layoutReducer
});