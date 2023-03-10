import { LOGIN_IN, RESET_USER,REGISTER } from '../actionTypes/authActionTypes'

const initialState = {
  isLoggedIn: false,
  user: null,
}

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_IN:
      state = {
        isLoggedIn: true,
        user: payload,
      }
      return state
    case RESET_USER:
      state = initialState
      return state
    case REGISTER:
      state=initialState
      return state
    default:
      return state
  }
}
export default authReducer
