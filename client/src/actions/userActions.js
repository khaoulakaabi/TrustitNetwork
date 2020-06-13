import axios from "axios";
import { tokenConfig } from './authActions';
import {addFlashMessage} from './flashMessageAction';
import {returnErrors} from './errorActions';

import {
    GET_USERS,
    GET_USER,
    USERS_LOADING,
    DELETE_USER,
    CONFIRM_ACCOUNT,
    CONFIRM_INVITATION_FOR_CLUB,
    CHECK_INVITATION_FOR_CLUB,
    CONFIRM_INVITATION_FOR_PROJECT,
    CHECK_INVITATION_FOR_PROJECT,
    GET_ERRORS
  } from "./types" ; 

// Add User



export const getUsers = (page = 1, limit = 12, role = 'all') => dispatch => {
  dispatch(setUsersLoading());
  let query = '?page=' + page + '&limit=' + limit;
  if (role !== 'all') {
    query = query + '&role=' + role;
  }
  axios
    .get("/api/v1/users" + query)
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data})})
        .catch(err =>
          dispatch(returnErrors(err.response.data, err.response.role))
        );
  }
  export const getUser = id => dispatch => {
    axios
      .get(`/api/v1/users/${id}`)
      .then(res => {
        dispatch({      
          type: GET_USER,
          payload: res.data });
        }).catch(err => {
          dispatch(addFlashMessage("Couldn't get user with the ID provided ", "danger"))
        });
      }
      export const updateUser =(userData, id ) => dispatch => {
        axios
          .patch(`/api/v1/users/${id}`, userData)
          .then(res => {
            dispatch(addFlashMessage("Utilisateur Modifié", "success"));
          }) // re-direct to home on successful add
          .catch(err =>
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            })
          );
      };
  
export const confirmAccount = (email, token) => dispatch => {
    let query = '?email=' + email + '&token=' + token;
    axios
      .post("/api/v1/users/confirmAccount" + query)
      .then(res => {
        dispatch({
          type: CONFIRM_ACCOUNT,
          payload: res.data})
        })
      .catch(err => {
        dispatch({
          type: CONFIRM_ACCOUNT,
          payload: err.response.data
        });
      })
}
export const checkInvitationLinkForClub = (email, token) => dispatch => {
  let query = '?email=' + email + '&token=' + token;
  axios
    .post("/api/v1/users/checkInvitationLinkForClub" + query)
    .then(res => {
      dispatch({
        type: CHECK_INVITATION_FOR_CLUB,
        payload: res.data})
      })
    .catch(err => {
      dispatch({
        type: CHECK_INVITATION_FOR_CLUB,
        payload: err.response.data
      });
    })
}
export const confirmInvitationForClub = (email, token, userData) => dispatch => {
  let query = '?email=' + email + '&token=' + token;
  axios
    .post("/api/v1/users/acceptInvitationForClub" + query, userData)
    .then(res => {
      dispatch({
        type: CONFIRM_INVITATION_FOR_CLUB,
        payload: res.data})
      })
    .catch(err => {
      dispatch(addFlashMessage(err.response.data.message, "danger"));  
    })
}
export const checkInvitationLinkForProject = (email, token) => dispatch => {
  let query = '?email=' + email + '&token=' + token;
  axios
    .post("/api/v1/users/checkInvitationLinkForProject" + query)
    .then(res => {
      dispatch({
        type: CHECK_INVITATION_FOR_PROJECT,
        payload: res.data})
      })
      .catch(err => {
        dispatch(addFlashMessage(err.response.data.message, "danger"));  
      })
}
export const confirmInvitationForProject = (email, token, userData) => dispatch => {
  let query = '?email=' + email + '&token=' + token;
  axios
    .post("/api/v1/users/acceptInvitationForProject" + query, userData)
    .then(res => {
      dispatch({
        type: CONFIRM_INVITATION_FOR_PROJECT,
        payload: res.data})
      })
    .catch(err => {
      dispatch(addFlashMessage(err.response.data.message, "danger"));  
    })
}

export const deleteUser = id => (dispatch, getState) => {
  axios
    .delete(`/api/v1/users/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch(addFlashMessage("User deleted", "success"));      
      dispatch({      
        type: DELETE_USER,
        payload: id      })
      })

}
export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  };
};