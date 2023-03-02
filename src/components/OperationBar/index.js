import React from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faFileCirclePlus, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const OperationBar = ({setIsCreateFolderPanelOpen}) => {

  const {currentPath} = useSelector((state) => ({
    currentPath: state.filefolders.currentPath,
  }));


  return (
    <div>
      {/* top bar for upload/create file & folder */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white ">
      {/* <p className='large ms-4'>{currentPath}</p> */}
      <Breadcrumb>
        <Breadcrumb.Item href="/dashboard">root</Breadcrumb.Item>
        <Breadcrumb.Item active>New Folder</Breadcrumb.Item>
      </Breadcrumb>
      
      <ul className='navbar-nav ms-auto'>
        <li className='nav-item mx-2'>
          <button className='btn btn-outline-dark'>
            <FontAwesomeIcon icon={faCloudArrowUp} /> &nbsp;
            Upload File
          </button>
        </li>

        <li className='nav-item mx-2'>
          <button className='btn btn-outline-dark'>
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