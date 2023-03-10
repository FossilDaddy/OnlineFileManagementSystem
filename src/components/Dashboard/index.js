import React, { useEffect, useState } from 'react'
import ShowItems from "../ShowItems";
import CreateFolderPanel from '../CreateFolder';
import CreateFilePanel from '../CreateFile';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentPathEvent } from '../../redux/actionCreators/filefolderActionCreator';
import OperationBar from '../OperationBar';
import { Route, Routes, useLocation } from 'react-router-dom';
import FolderComponent from '../Folder';
import FileComponent from '../File';
import UploadFilePanel from '../UploadFile';

const DashboardPage = () => {
  
  const [isCreateFolderPanelOpen, setIsCreateFolderPanelOpen] = useState(false);
  const [isCreateFilePanelOpen, setIsCreateFilePanelOpen] = useState(false);
  const [isUploadFilePanelOpen, setIsUploadFilePanelOpen] = useState(false);
  const [isShowOpBar, setIsShowOpBar] = useState(true);
  const { pathname }  = useLocation();

  const dispatch = useDispatch();
  const { isLoading, userFolders, userFiles, currentPath, user } = useSelector((state) =>({
    isLoading: state.filefolders.isLoading,
    userFolders: state.filefolders.userFolders,
    userFiles: state.filefolders.userFiles,
    currentPath: state.filefolders.currentPath,
    user: state.auth.user
  }));

  useEffect(()=>{
    if(isLoading){
      dispatch(changeCurrentPathEvent({"path": currentPath, "user": user}));
    }
  }, [currentPath, dispatch, isLoading, user])

  useEffect(() =>{
    if(pathname.includes("/file/")){
      setIsShowOpBar(false);
    }else{
      setIsShowOpBar(true);
    }
  }, [pathname])

  return (
    <div>
      {
        /* create folder panel */
        isCreateFolderPanelOpen && (
          <CreateFolderPanel setIsCreateFolderPanelOpen = {setIsCreateFolderPanelOpen}/>
        )
      }
      {
        /* create file panel */
        isCreateFilePanelOpen && (
          <CreateFilePanel setIsCreateFilePanelOpen = {setIsCreateFilePanelOpen}/>
        )
      }
      {
        /* upload file panel */
        isUploadFilePanelOpen && (
          <UploadFilePanel setIsUploadFilePanelOpen = {setIsUploadFilePanelOpen}/>
        )
      }

      {!isLoading && isShowOpBar && (
        <OperationBar setIsCreateFolderPanelOpen = {setIsCreateFolderPanelOpen} 
                      setIsCreateFilePanelOpen = {setIsCreateFilePanelOpen}
                      setIsUploadFilePanelOpen = {setIsUploadFilePanelOpen}
      />)}
      
      <Routes>
        <Route path="" element={ isLoading ? (
        <h1 className='display-1 my-5 text-center'>Loading...</h1>
      ):(
        <div className='col-md-12 w-100'>
          <ShowItems tittle = "File Directory" items = {[...userFolders, ...userFiles]} />
        </div>
      )
      } />
        <Route path="folder/*" element={ <FolderComponent/>} />
        <Route path="file/:fileName" element={<FileComponent />} />
      </Routes>
      {/* list file and folder */}
      
    </div>
  )
}


export default DashboardPage;