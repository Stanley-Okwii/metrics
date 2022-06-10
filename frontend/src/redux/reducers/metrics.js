import {
  FETCH_METRICS_INIT,
  FETCH_METRICS_SUCCESS,
  FETCH_METRICS_ERROR,
} from "../actions/metrics";

export const metricsState = {
  metrics: {
    loading: false,
    data: [],
    error: null,
  },
};

export const metricsReducer = (state, action) => {
  switch (action.type) {
    case FETCH_METRICS_INIT:
      return {
        ...state,
        metrics: {
          ...state.metrics,
          loading: true,
          error: null,
        },
      };

    case FETCH_METRICS_SUCCESS:
      return {
        ...state,
        metrics: {
          ...state.metrics,
          data: action.payload,
          loading: false,
        },
      };

    case FETCH_METRICS_ERROR:
      return {
        ...state,
        metrics: {
          ...state.metrics,
          loading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};
