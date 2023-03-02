import React, { useEffect, useState } from 'react'
import ShowItems from "../ShowItems";
import CreateFolderPanel from '../CreateFolder';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentPathEvent, getFoldersAndFilesEvent } from '../../redux/actionCreators/filefolderActionCreator';
import OperationBar from '../OperationBar';
import { Route, Routes } from 'react-router-dom';
import FolderComponent from '../Folder';

const DashboardPage = () => {
  
  const [isCreateFolderPanelOpen, setIsCreateFolderPanelOpen] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, userFolders } = useSelector((state) =>({
    isLoading: state.filefolders.isLoading,
    userFolders: state.filefolders.userFolders,
    userFiles: state.filefolders.userFiles,
    // currentPath: state.filefolders.currentPath,
  }));

  useEffect(()=>{
    if(isLoading){
      dispatch(changeCurrentPathEvent("root"));
      dispatch(getFoldersAndFilesEvent());
    }
  }, [])


  return (
    <div>
    {
      isCreateFolderPanelOpen && (
        <CreateFolderPanel setIsCreateFolderPanelOpen = {setIsCreateFolderPanelOpen}/>
      )
    }
      {!isLoading && (<OperationBar setIsCreateFolderPanelOpen = {setIsCreateFolderPanelOpen} />)}
      
      <Routes>
        <Route path="" element={ isLoading ? (
        <h1 className='display-1 my-5 text-center'>Loading...</h1>
      ):(
        <div className='col-md-12 w-100'>
          <ShowItems tittle = "File Directory" items = {userFolders} />
        </div>
      )
      } />
        <Route path="folder/:folderId" element={ <FolderComponent/>} />
      </Routes>
      {/* list file and folder */}
      
    </div>
  )
}


export default DashboardPage;