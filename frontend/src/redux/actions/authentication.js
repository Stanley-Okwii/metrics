import { toast } from "react-toastify";

import { axiosInstance } from "./index";
export const LOGIN_INIT = "LOGIN_INIT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const login = (requestData) => (dispatch) => {
  dispatch({ type: LOGIN_INIT });
  return axiosInstance
    .post("api/users/login", requestData)
    .then(({ data }) => {
      dispatch({ type: LOGIN_SUCCESS });
      toast.success("Successfully logged in");
      localStorage.setItem("token", data?.token);
      axiosInstance.interceptors.request.use(
        (config) => {
          config.headers.authorization = `Bearer ${data?.token}`;
          return config;
        },
        (error) => Promise.reject(error)
      );
    })
    .catch(({ response: { data } }) => {
      console.error("Error logging in: ", data?.message);
      toast.error(data?.message);
      return dispatch({ type: LOGIN_ERROR });
    });
};

export const SIGNUP_INIT = "SIGNUP_INIT";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";

export const signup = (requestData) => (dispatch) => {
  dispatch({ type: SIGNUP_INIT });
  return axiosInstance
    .post("api/users/signup", requestData)
    .then(({ data }) => {
      dispatch({ type: SIGNUP_SUCCESS, payload: data });
      toast.success(data?.message);
    })
    .catch(({ response: { data } }) => {
      console.error("Error logging in: ", data?.message);
      toast.error(data?.message);
      return dispatch({ type: SIGNUP_ERROR });
    });
};

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const logout = () => (dispatch) => {
  return axiosInstance
    .post("api/users/logout")
    .then(({ data }) => {
      dispatch({ type: LOGOUT_SUCCESS, payload: data?.success });
      localStorage.clear();
    })
    .catch(({ response: { data } }) => {
      toast.error(data?.message);
    });
};
