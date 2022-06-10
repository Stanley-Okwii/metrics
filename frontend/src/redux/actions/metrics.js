import { toast } from "react-toastify";

import { axiosInstance } from "./index";

export const FETCH_METRICS_INIT = "FETCH_METRICS_INIT";
export const FETCH_METRICS_SUCCESS = "FETCH_METRICS_SUCCESS";
export const FETCH_METRICS_ERROR = "FETCH_METRICS_ERROR";

export const fetchMetrics = () => (dispatch) => {
  dispatch({ type: FETCH_METRICS_INIT });
  return axiosInstance
    .get("api/metrics")
    .then(({ data }) => {
      dispatch({ type: FETCH_METRICS_SUCCESS, payload: data?.data });
    })
    .catch(({ response: { data } }) => {
      dispatch({ type: FETCH_METRICS_ERROR });
      toast.error(data?.message);
    });
};

export const ADD_METRICS_INIT = "ADD_METRICS_INIT";
export const ADD_METRICS_SUCCESS = "ADD_METRICS_SUCCESS";
export const ADD_METRICS_ERROR = "ADD_METRICS_ERROR";

export const addMetric = (requestData) => (dispatch) => {
    dispatch({ type: ADD_METRICS_INIT });
    return axiosInstance
      .post("api/metrics", requestData)
      .then(({ data }) => {
        dispatch({ type: ADD_METRICS_SUCCESS, payload: data?.data });
        toast.success("Successfully added metric");
      })
      .catch(({ response: { data } }) => {
        dispatch({ type: ADD_METRICS_ERROR });
        toast.error(data?.message);
      });
  };
