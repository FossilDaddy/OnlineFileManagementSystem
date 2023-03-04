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

const DashboardPage = () => {
  
  const [isCreateFolderPanelOpen, setIsCreateFolderPanelOpen] = useState(false);
  const [isCreateFilePanelOpen, setIsCreateFilePanelOpen] = useState(false);
  const [isShowOpBar, setIsShowOpBar] = useState(true);
  const { pathname }  = useLocation();

  const dispatch = useDispatch();
  const { isLoading, userFolders, userFiles, currentPath } = useSelector((state) =>({
    isLoading: state.filefolders.isLoading,
    userFolders: state.filefolders.userFolders,
    userFiles: state.filefolders.userFiles,
    currentPath: state.filefolders.currentPath,
  }));

  useEffect(()=>{
    if(isLoading){
      dispatch(changeCurrentPathEvent(currentPath));
    }
  }, [currentPath, dispatch, isLoading])

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

      {!isLoading && isShowOpBar && (
        <OperationBar setIsCreateFolderPanelOpen = {setIsCreateFolderPanelOpen} 
                      setIsCreateFilePanelOpen = {setIsCreateFilePanelOpen}
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