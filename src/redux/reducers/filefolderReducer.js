import {
  CREATE_FOLDER,
  RESET_FOLDERS_FILES,
  SET_LOADING,
  CHANGE_CURRENT_PATH,
  CREATE_USER_FILE,
  GET_USER_FOLDERS_AND_FILES,
  UPDATE_USER_FILE_DATA
} from '../actionTypes/filefoldersActionTypes'

const initialState = {
  isLoading: true,
  currentPath: 'root',
  userFolders: [],
  userFiles: [],
}

const filefolderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      state = { ...state, isLoading: payload }
      return state
    case GET_USER_FOLDERS_AND_FILES:
      state = { ...state, userFolders: payload.userFolders, userFiles:payload.userFiles }
      return state
    case CREATE_FOLDER:
      state = { ...state, userFolders: [...state.userFolders, payload] }
      return state
    case CHANGE_CURRENT_PATH:
      state = {...state, currentPath: payload}
      return state
    case CREATE_USER_FILE:
      state = { ...state, userFiles: [...state.userFiles, payload] }
      return state
    case UPDATE_USER_FILE_DATA:
      state = {
        ...state,
        userFiles: state.userFiles.map((file) =>
          file.name === payload.name ? {...file, data: payload.data} : file
        )
      }
      return state
    case RESET_FOLDERS_FILES:
      state = initialState
      return state
    default:
      return state
  }
}
export default filefolderReducer
