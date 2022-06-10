import { authState } from '../reducers/authentication';
import { metricsState } from '../reducers/metrics';

export const initialState = {
  auth: authState,
  metrics: metricsState
};
