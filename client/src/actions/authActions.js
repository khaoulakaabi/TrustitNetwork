import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
// import jwt_decode from "jwt-decode";
import {
  SET_CURRENT_USER,
  USERS_LOADING
} from "./types";
import {
  addFlashMessage
} from './flashMessageAction';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/v1/users/register", userData)
    .then(res => history.push("/Confirm_Your_Account")) // re-direct to login on successful register
    .catch(err =>
      dispatch(addFlashMessage(err.response.data.message, "danger"))
    );
};
// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/v1/users/login", userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const {
        token
      } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      // const decoded = jwt_decode(token);
      // Set current user
      setCurrentUser(dispatch);
    })
    .catch(err => {
      dispatch(addFlashMessage(err.response.data.message, "danger"));
      /*dispatch({
        type: GET_ERRORS
      })*/
    });
};
// Set logged in user
export const setCurrentUser = async (dispatch) => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: {
      _id: 0,
      firstName: 'Visitor',
      lastName: '.',
      role: 'visitor'
    }
  });
  let res = await axios.get("/api/v1/users/me");
  if (res.status === 200 && res.data._id !== 0) {
    dispatch({
      type: SET_CURRENT_USER,
      payload: res.data
    })
    return;
  }
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  })
};
// User loading
export const setUserLoading = () => {
  return {
    type: USERS_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  setCurrentUser(dispatch);
  document.querySelector('.App').classList.remove("side-nav-open");
};
// Setup config/headers and token

export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};

export const forgotPassword = (email) => dispatch => {
  let data = {
    email
  }
  axios
    .post("/api/v1/users/forgotPassword", data)
    .then(res => {
      dispatch(addFlashMessage("un email a eté envoyé a votre adress pour réinitialiser votre mot de passe", "success"));
    }).catch(err => {
      dispatch(addFlashMessage(err.response.data.message, "danger"));
    });
};

export const resetPassword = (email, token, password, passwordConfirmation) => dispatch => {
  let data = {
    password,
    passwordConfirmation
  }
  axios
    .post("/api/v1/users/resetPassword?token=" + token + "&email=" + email, data)
    .then(res => {
      dispatch(addFlashMessage("Votre mote de passe a été re-initialisé avec succés, vous pouvez connecter maintenant", "success"));
    }).catch(err => {
      dispatch(addFlashMessage(err.response.data.message, "danger"));
    });
};