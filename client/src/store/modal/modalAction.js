import {HANDLE_MODAL} from "./modalActionTypes";

export const showModal = (modalStatus) => dispatch => {
  dispatch({
    type: HANDLE_MODAL,
    payload: modalStatus
  })
}