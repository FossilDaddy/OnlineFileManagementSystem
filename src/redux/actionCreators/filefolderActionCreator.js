import { CREATE_FOLDER, GET_USER_FOLDERS_AND_FILES, SET_LOADING, CHANGE_CURRENT_PATH, CREATE_USER_FILE, UPDATE_USER_FILE_DATA } from "../actionTypes/filefoldersActionTypes";

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

export const createFolderEvent = (data, setIsCreateSuccess) =>(dispatch)=>{
  //backend api needed.
  dispatch(createFolder(data));
  alert("Folder Created Sucessfully");
  setIsCreateSuccess(true);
}

const changeFolder = (payload) =>({
  type:CHANGE_CURRENT_PATH,
  payload,
})

export const changeCurrentPathEvent = (data) => (dispatch)=>{
  dispatch(changeFolder(data));
  console.log("change current path to: ", data);
  dispatch(getFoldersAndFilesEvent(data))
}

const createFile = (payload) =>({
  type:CREATE_USER_FILE,
  payload,
})

export const createFileEvent = (data, setIsCreateSuccess) => (dispatch)=>{
  dispatch(createFile(data));
  alert("File Created Successfully");
  setIsCreateSuccess(true);
}

const updateFile = (payload) =>({
  type:UPDATE_USER_FILE_DATA,
  payload,
})

export const updateFileEvent = (name, data) => (dispatch) =>{
  dispatch(updateFile({name, data}));
  alert("File Update Successfully");
} 