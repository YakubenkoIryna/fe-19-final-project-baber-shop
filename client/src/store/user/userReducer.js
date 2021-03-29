import {USER_AUTH_STATUS, USER_NAME_CHANGE} from "./actionTypesUser";

const initialValue = {
  isAuthenticated: false,
  exp: null,
  firstName: '',
  lastName: '',
  id: '',
  isAdmin: false,
}

const userReducer = (state = initialValue, action) => {
  switch (action.type) {
    case USER_AUTH_STATUS:
      return action.payload.isAuthenticated ? action.payload : initialValue;
    case USER_NAME_CHANGE:
      return {
        ...state,
        firstName: action.payload
      }
    default:
      return state
  }
}

export default userReducer
