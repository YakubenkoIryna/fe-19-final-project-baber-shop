import {HANDLE_MODAL} from "./modalActionTypes";

const initialState = {
  modalOpen: false,
  typesOfModal: ''
}

export function modalHandler (state = initialState, action) {
  switch (action.type) {
    case HANDLE_MODAL:
      return {
        ...state,
        modalOpen: action.payload.status,
        typesOfModal: action.payload.type
      }
    default: return state
  }
}

export default modalHandler