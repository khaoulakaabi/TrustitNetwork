import {
    GET_CLUBS,
    ADD_CLUB,
    DELETE_CLUB,
    GET_CLUB
  } from "../actions/types";
  
  const initialState = {
    clubs: {},
    club: {}
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_CLUBS:
        return {
          ...state,
          clubs: action.payload
        };
      case DELETE_CLUB:
        return {
          ...state,
          clubs: state.clubs.docs
                };
      case ADD_CLUB:
        return {
          ...state,
          club: [action.payload, ...state.clubs]
        };
        case GET_CLUB:
          return {
            ...state,
            club: action.payload
          };
        /*case UPDATE_CLUB:
          return {
            ...state,
            club: [action.payload, ...state.clubs]
          };*/
      default:
        return state;
    }}