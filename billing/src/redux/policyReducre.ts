import { SET_POLICY } from "./policyaction.ts";

const initalState = {
   policyNumber: null,
};

const navigationReducer = (state = initalState, { type, payload }: any) => {
  switch (type) {
    case SET_POLICY:
      return {
        ...state,
        policyNumber: payload,
      };
     
    default:
      return state;
  }
};

export default navigationReducer;
