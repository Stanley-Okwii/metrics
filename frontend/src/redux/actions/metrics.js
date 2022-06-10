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
