import { CREATE_FOLDER, GET_USER_FOLDERS_AND_FILES, SET_LOADING, CHANGE_CURRENT_PATH } from "../actionTypes/filefoldersActionTypes";

const setLoading = (payload) =>({
  type:SET_LOADING,
  payload,
})

const getFoldersAndFiles = (payload) =>({
  type: GET_USER_FOLDERS_AND_FILES,
  payload,
})

export const getFoldersAndFilesEvent = (data) =>(dispatch) =>{
  dispatch(setLoading(true));
  // get user folders info, backend api needed. now moniter backend op
  setTimeout(() => {
    const testdata = {"userFolders":[], "userFiles":[]};
    dispatch(getFoldersAndFiles(testdata));
    dispatch(setLoading(false));
  }, 10);  
}

const createFolder = (payload) =>({
  type:CREATE_FOLDER,
  payload,
})

export const createFolderEvent = (data) =>(dispatch)=>{
  //backend api needed.
  dispatch(createFolder(data));
  alert("Folder Created Sucessfully");
}

const changeFolder = (payload) =>({
  type:CHANGE_CURRENT_PATH,
  payload,
})

export const changeCurrentPathEvent = (data) => (dispatch)=>{
  dispatch(changeFolder(data));
  console.log("change current path to: ", data);
  dispatch(getFoldersAndFiles(data))
}
