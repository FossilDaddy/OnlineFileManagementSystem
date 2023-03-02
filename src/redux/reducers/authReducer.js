import { LOGIN_IN, RESET_USER } from '../actionTypes/authActionTypes'

const initialState = {
  isLoggedIn: false,
  user: null,
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_IN:
      state = {
        isLoggedIn: true,
        user: payload.user,
      }
      return state
    case RESET_USER:
      state = initialState
      return state
    default:
      return state
  }
}
export default authReducer
