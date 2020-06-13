import axios from "axios";

import { tokenConfig } from './authActions';
import {
  addFlashMessage
} from './flashMessageAction';


import {
  GET_CLUBS,
  DELETE_CLUB,
  GET_ERRORS,
  CLUBS_LOADING,
  GET_CLUB,

} from "./types";

// Add Club

export const addClubs = (clubData, history) => dispatch => {
  axios
    .post("/api/v1/clubs", clubData)
    .then(res =>history.push("/clubs")) // re-direct to home on successful add
    .catch(err =>
      {
        dispatch(addFlashMessage(err.response.data.message, "danger"));
      }
    );
};

export const getClubs = (page = 1, limit = 12, university = 'all') => dispatch => {
  dispatch(setClubsLoading());
  let query = '?page=' + page + '&limit=' + limit;
  if (university !== 'all') {
    query = query + '&university=' + university;
  }
  axios
    .get('/api/v1/clubs' + query)
    .then(res => {
      //dispatch(addFlashMessage("Club fetched", "success"));
      dispatch({
        type: GET_CLUBS,
        payload: res.data})})
   }
   export const getClub = id => dispatch => {
    axios
      .get(`/api/v1/clubs/${id}`)
      .then(res => {
        dispatch({      
          type: GET_CLUB,
          payload: res.data });
        }).catch(err => {
          dispatch(addFlashMessage("Couldn't get club with the ID provided ", "danger"))
        });
      }


export const addProjectOwner = (clubId, email) => dispatch =>{
  axios
    .post('/api/v1/clubs/' + clubId + "/projectOwners", {email})
    .then(res => {
      dispatch(addFlashMessage("Project Owner Invited", "success"));
    }).catch(err => {
      dispatch(addFlashMessage(err.response.data.message, "danger"));
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
    )
};
export const approveClub =(id) => dispatch => {
  axios
    .patch(`/api/v1/clubs/${id}/approve`)
    .then(res => {
      dispatch(addFlashMessage("Club approuvé", "success"));
    }) 
    .catch(err =>
      {
        dispatch(addFlashMessage(err.response.data.message, "danger"));
      }
    );
};

export const rejectClub=(id) => dispatch => {
  axios
    .patch(`/api/v1/clubs/${id}/reject`)
    .then(res => {
      dispatch(addFlashMessage("Club refusé", "success"));
    })
    .catch(err =>
      {
        dispatch(addFlashMessage(err.response.data.message, "danger"));
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      }
    );
};

export const deleteClub = id => (dispatch, getState) => {
  axios
    .delete(`/api/v1/clubs/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch(addFlashMessage("Club deleted", "success"));      
      dispatch({      
        type: DELETE_CLUB,
        payload: id      })
      })

}

    export const updateClub =(clubData, id ) => dispatch => {
      axios
        .patch(`/api/v1/clubs/${id}`, clubData)
        .then(res => {
          dispatch(addFlashMessage("Club Modifié", "success"));
        }) // re-direct to home on successful add
        .catch(err =>
          {
            dispatch(addFlashMessage(err.response.data.message, "danger"));
          }
        );
    };


export const setClubsLoading = () => {
  return {
    type: CLUBS_LOADING
  };
};