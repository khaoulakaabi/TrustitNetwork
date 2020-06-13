import {
    GET_PROJECTS,
    ADD_PROJECT,
    DELETE_PROJECT,
    GET_PROJECT
  } from "../actions/types";
  
  const initialState = {
    projects : {},
    project : {}
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case GET_PROJECTS: 
        return {
          ...state,
          projects: action.payload
            };
      case DELETE_PROJECT:
        return {
          ...state,
          projects: state.projects.docs
              };
      case ADD_PROJECT:
        return {
          ...state,
          project: [action.payload, ...state.projects]
        };
        case GET_PROJECT: 
        return {
          ...state,
          project: action.payload
            };
       
      default:
        return state;
    }}