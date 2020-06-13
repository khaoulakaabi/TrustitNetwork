import axios from "axios";
import {
  DELETE_PROJECT,
  GET_ERRORS,
  GET_PROJECTS,
  GET_PROJECT,
  PROJECTS_LOADING} from "./types";
import { tokenConfig } from './authActions';
import {addFlashMessage} from './flashMessageAction';

// Add Project

export const addProjects = (projectData, history) => dispatch => {
  axios
    .post("/api/v1/projects", projectData)
    .then(res => {
      dispatch(addFlashMessage("Projet ajouté avec succeés", "success")); 
      history.push("/projects");
    }).catch(err => {
      dispatch(addFlashMessage(err.response.data.message, "danger"));
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

//Get Project
export const getProjects = (page = 1, limit = 12, status = 'all', club = false) => dispatch => {
  dispatch(setProjectsLoading());
  let query = '?page=' + page + '&limit=' + limit;
  if (status !== 'all') {
    query = query + '&status=' + status;
  }
  if (club) {
    query = query + '&club=' + club;
  }
  axios
    .get('/api/v1/projects' + query)
    .then(res =>
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      })
    )
};
export const getMyProjects = (page = 1, limit = 12, status = 'all', club = false) => dispatch => {
  dispatch(setProjectsLoading());
  let query = '?page=' + page + '&limit=' + limit;
  if (status !== 'all') {
    query = query + '&status=' + status;
  }
  if (club) {
    query = query + '&club=' + club;
  }
  axios
    .get('/api/v1/projects/MyProjects' + query)
    .then(res =>
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      })
    )
};
export const deleteProject = id => (dispatch, getState) => {
  axios
    .delete(`/api/v1/projects/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch(addFlashMessage("Project deleted", "success"));      
      dispatch({      
        type: DELETE_PROJECT,
        payload: id      })
        ;})

}
export const getProject = id => dispatch => {
  axios
    .get(`/api/v1/projects/${id}`)
    .then(res => {
      dispatch({      
        type: GET_PROJECT,
        payload: res.data     })
        ;})

}
export const updateProject =(projectData, id ) => dispatch => {
  axios
    .patch(`/api/v1/projects/${id}`, projectData)
    .then(res => {
      dispatch(addFlashMessage("Projet Modifié", "success"));
    }) // re-direct to home on successful add
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const approveProject =(id) => dispatch => {
  axios
    .patch(`/api/v1/projects/${id}/approve`)
    .then(res => {
      dispatch(addFlashMessage("Projet approuvé", "success"));
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

export const rejectProject =(id) => dispatch => {
  axios
    .patch(`/api/v1/projects/${id}/reject`)
    .then(res => {
      dispatch(addFlashMessage("Projet refusé", "success"));
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
export const addProjectMember = (projectId, email) => dispatch =>{
  axios
    .post('/api/v1/projects/' + projectId + "/members", {email})
    .then(res => {
      dispatch(addFlashMessage("Member Invited", "success"));
    }).catch(err => {
      dispatch(addFlashMessage(err.response.data.message, "danger"));
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
    )
};

export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING
  };
};
