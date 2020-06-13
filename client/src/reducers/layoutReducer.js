import { TOGGLE_SIDE_NAV } from "../actions/types";

const initialState = {
    isSideNavOpen: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDE_NAV:
      if(state.isSideNavOpen) {
        document.querySelector('.App').classList.remove("side-nav-open");
      }else {
        document.querySelector('.App').classList.add("side-nav-open");
      }
      return {
          ...state,
          isSideNavOpen : !state.isSideNavOpen
      };
    default:
      return state;
  }
}