import {USER_AUTH_STATUS, USER_NAME_CHANGE} from "./actionTypesUser";

export const authUser = status => dispatch => {
  return dispatch(
    {
      type: USER_AUTH_STATUS,
      payload: status
    }
  );
};

export const changeFirstName = name => dispatch => {
  return dispatch(
    {
      type: USER_NAME_CHANGE,
      payload: name
    }
  )
}