import axios from "axios";
import { toast } from "react-toastify";

// export const header = {
//   headers: {
//     accept: "application/json",
//     "content-type": "application/json"
//   }
// };

export const LOGIN_INIT = 'LOGIN_INIT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const login = (requestData) => (
  (dispatch, getState) => {
    dispatch({ type: LOGIN_INIT });
    return axios.post(`${process.env.REACT_APP_BACKEND_API_URL}api/users/login`, requestData
    )
    .then(({ data }) => {
      dispatch({ type: LOGIN_SUCCESS });
      toast.success("Successfully logged in");
      localStorage.setItem("token", data?.token);
    })
    .catch(({ response: { data }}) => {
      console.error('Error logging in: ', data?.message);
      toast.error(data?.message);
      return dispatch({ type: LOGIN_ERROR });
    });
  }
);

export const SIGNUP_INIT = 'SIGNUP_INIT';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

export const signup = (requestData) => (
  (dispatch, getState) => {
    dispatch({ type: SIGNUP_INIT });
    return axios.post(`${process.env.REACT_APP_BACKEND_API_URL}api/users/signup`, requestData
    )
    .then(({ data }) => {
      dispatch({ type: SIGNUP_SUCCESS, payload: data });
      toast.success(data?.message);
    })
    .catch(({ response: { data }}) => {
      console.error('Error logging in: ', data?.message);
      toast.error(data?.message);
      return dispatch({ type: SIGNUP_ERROR });
    });
  }
);