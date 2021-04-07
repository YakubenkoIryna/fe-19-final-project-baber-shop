import {SHOW_PAGE} from "./actionTypesCrumbs";

const initialState = {
  pageName: '',
  parentPages: [],
  pathNames: [],
  keys: []
}

export function showCurrentPageInfo(state = initialState, action) {
  switch (action.type) {
    case SHOW_PAGE:
      return {
        ...state,
        page: action.payload
      }
    default:
      return state
  }
}

export default showCurrentPageInfo