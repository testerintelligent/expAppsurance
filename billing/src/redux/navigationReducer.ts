import { SET_PAGE } from "./navigationAction.ts";
import {SET_SIDE_BAR} from "./navigationAction.ts"
import {SET_SUB_MENU} from "./navigationAction.ts"

const initalState = {
  activePage: 'account',
  activeSideBar: 'account',
  activeSubMenu: null,
};

const navigationReducer = (state = initalState, { type, payload }: any) => {
  switch (type) {
    case SET_PAGE:
      return {
        ...state,
        activePage: payload,
        activeSubMenu : null,
      };
      case SET_SIDE_BAR:
      return {
        ...state,
        activeSideBar: payload,
      };
      case SET_SUB_MENU:
      return {
        ...state,
        activeSubMenu: payload,
      };
    default:
      return state;
  }
};

export default navigationReducer;
