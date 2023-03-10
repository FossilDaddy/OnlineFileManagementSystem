import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faFileCirclePlus, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { changeCurrentPathEvent } from '../../redux/actionCreators/filefolderActionCreator';

const OperationBar = ({setIsCreateFolderPanelOpen, setIsCreateFilePanelOpen, setIsUploadFilePanelOpen}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {currentPath, user} = useSelector((state) => ({
    currentPath: state.filefolders.currentPath,
    user: state.auth.user
  }));

  const handleNavigate = (index, folderName) => {
    if(index === 0){
      navigate("/dashboard");
      dispatch(changeCurrentPathEvent({"path": "root/", "user": user}));
    }else{
      var link = "root/";
      for(var i = 1; i <= index; i++){
        link += currentPath.split('/')[i] + "/";
      }
      navigate(`/dashboard/folder/${link}`);
      dispatch(changeCurrentPathEvent({"path": link, "user": user}));
    }
  };

  return (
    <div>
      {/* top bar for upload/create file & folder */}
      <nav className="navbar navbar-expand-lg mt-2 navbar-light bg-white py-2 shadow-sm">
      
      {/* navigate path */}
      <nav className='ms-5' aria-label='breadcrumb'>
        <ol className='breadcrumb d-flex align-items-center'>
          {currentPath !== "root" ? (
            <>
              {currentPath.split('/').map((folderName, index) =>(
                index === currentPath.split('/').length - 1 && folderName !== "" ? (
                  <li className="breadcrumb-item active">{folderName}</li>
                ):(
                  <button key={`${index}${folderName}`} className={"breadcrumb-item  btn btn-link text-decoration-none"}onClick={()=>handleNavigate(index,folderName)}
                >{index === 0 ? "root" : folderName}</button>
                )
              ))}
            </>
          ) : (
            <li className="breadcrumb-item active">Root</li>
          )}
        </ol>
      </nav>

      
      <ul className='navbar-nav ms-auto'>
        <li className='nav-item mx-2'>
          <button className='btn btn-outline-dark' onClick={()=>setIsUploadFilePanelOpen(true)}>
            <FontAwesomeIcon icon={faCloudArrowUp} /> &nbsp;
            Upload File
          </button>
        </li>

        <li className='nav-item mx-2'>
          <button className='btn btn-outline-dark' onClick={()=>setIsCreateFilePanelOpen(true)}>
            <FontAwesomeIcon icon={faFileCirclePlus} /> &nbsp;
            Create File
          </button>
        </li>

        <li className='nav-item mx-2'>
          <button className='btn btn-outline-dark' onClick={()=>setIsCreateFolderPanelOpen(true)}>
            <FontAwesomeIcon icon={faFolderPlus} /> &nbsp;
            Create Folder
          </button>
        </li>
      </ul>
      </nav>
    </div>
  )
}

export default OperationBar