export const SET_POLICY = 'SET_POLICY';

export const setPolicy = (policyNumber: string) => ({
  type: SET_POLICY,
  payload: policyNumber,
});