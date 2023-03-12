
import { getFoldersAndFilesFromS3, createNewFolderToS3, uploadFileToS3, createNewFileToS3, getObjectContentFromS3 } from "../../backend/filefolderBackend";

import { CREATE_FOLDER, GET_USER_FOLDERS_AND_FILES, SET_LOADING, CHANGE_CURRENT_PATH, CREATE_USER_FILE, UPDATE_USER_FILE_DATA } from "../actionTypes/filefoldersActionTypes";

const setLoading = (payload) =>({
  type:SET_LOADING,
  payload,
})

const getFoldersAndFiles = (payload) => ({
  type: GET_USER_FOLDERS_AND_FILES,
  payload,
})

export const getFoldersAndFilesEvent = (data) => (dispatch) => {
  dispatch(setLoading(true));
  getFoldersAndFilesFromS3(data, (result) => {
    dispatch(getFoldersAndFiles(result)); 
    dispatch(setLoading(false));
  })
}

const createFolder = (payload) =>({
  type:CREATE_FOLDER,
  payload,
})

export const createFolderEvent = (data, setIsCreateSuccess) =>(dispatch)=>{
  //backend api needed.
  createNewFolderToS3(data, ()=>{
    dispatch(createFolder(data));
    alert("Folder Created Sucessfully");
    setIsCreateSuccess(true);
  })
}

const changeFolder = (payload) =>({
  type:CHANGE_CURRENT_PATH,
  payload,
})

export const changeCurrentPathEvent = (data) => (dispatch)=>{
  dispatch(changeFolder(data.path));
  dispatch(getFoldersAndFilesEvent(data))
}

const createFile = (payload) =>({
  type:CREATE_USER_FILE,
  payload,
})

export const createFileEvent = (data, setIsCreateSuccess) => (dispatch)=>{
  createNewFileToS3(data, ()=>{
    dispatch(createFile(data));
    alert("File Created Successfully");
    setIsCreateSuccess(true);
  })
}

const updateFile = (payload) =>({
  type:UPDATE_USER_FILE_DATA,
  payload,
})

export const updateFileEvent = (fileName, data) => (dispatch) => {
  dispatch(updateFile({"name": fileName, "data": data}));
  alert("File Update Successfully");
} 

export const updateExistingFileEvent = (data) => (dispatch) => {
  createNewFileToS3(data, () => {});
}

export const getFileEvent = (data, fileName) => (dispatch) => {
  getObjectContentFromS3(data, (result) => {
    dispatch(updateFile({"name": fileName, "data": result}));
  });
}


export const uploadUserFileEvent = (file, data, setIsCreateSuccess) => (dispatch) => {
  uploadFileToS3(file, data, () => {
    dispatch(createFile(data));
    alert("File Uploaded Successfully");
    setIsCreateSuccess(true);
  });
}