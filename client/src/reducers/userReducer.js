import {
    GET_USER,
    GET_USERS,
    DELETE_USER,
    CONFIRM_ACCOUNT,
    CONFIRM_INVITATION_FOR_CLUB,
    CHECK_INVITATION_FOR_CLUB,
    CONFIRM_INVITATION_FOR_PROJECT,
    CHECK_INVITATION_FOR_PROJECT
  } from "../actions/types";
  
  const initialState = {
    users: [] ,
    user: [],
    confirmAccountResult: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_USERS:
        return {
          ...state,
          users: action.payload
        };
      case DELETE_USER:
        return {
          ...state,
          users: state.users.docs
                };
      case CONFIRM_ACCOUNT:
        return {
          ...state,
          confirmAccountResult: action.payload
        }
      case CONFIRM_INVITATION_FOR_CLUB:
        return{
          ...state,
          confirmInvitationForClubResult: action.payload
        }
      case CHECK_INVITATION_FOR_CLUB:
        return{
          ...state,
          checkInvitationForClubResult: action.payload
        }
        case CONFIRM_INVITATION_FOR_PROJECT:
        return{
          ...state,
          confirmInvitationForProjectResult: action.payload
        }
      case CHECK_INVITATION_FOR_PROJECT:
        return{
          ...state,
          checkInvitationForProjectResult: action.payload
        }
        case GET_USER:
          return {
            ...state,
            user: action.payload
          };
      default:
        return state;
    }}
© 2020 GitHub, Inc.