import {
    SET_CURRENT_USER,
    USERS_LOADING
  } from "../actions/types";
  const isEmpty = require("is-empty");
  
  const initialState = {
    isAuthenticated: false,
    user: {},
    loading: true
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload,
          loading: false
        };
      case USERS_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }