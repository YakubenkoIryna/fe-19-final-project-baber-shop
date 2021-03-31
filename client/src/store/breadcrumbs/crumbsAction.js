import {SHOW_PAGE} from "./actionTypesCrumbs";

export const showPage = (page) => {
  return {
    type: SHOW_PAGE,
    payload: page
  }
}