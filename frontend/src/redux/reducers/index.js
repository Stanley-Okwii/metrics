import { initialState } from "../state";
import { authReducer } from './authentication';
import { metricsReducer } from "./metrics";

const reducer = (state = initialState, action) => {
  return {
    auth: authReducer(state.auth, action),
    metrics: metricsReducer(state.metrics, action)
  }
};

export { initialState, reducer };
