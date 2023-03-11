import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { React, useEffect, useState } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { createFolderEvent } from '../../redux/actionCreators/filefolderActionCreator';


const CreateFolderPanel = ({setIsCreateFolderPanelOpen}) => {

  const [folderName, setFolderName] = useState("");
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);
  const [isButtonActive, setButtonActive] = useState(true);

  const {userFolders, user, currentPath} = useSelector((state) => ({
    userFolders: state.filefolders.userFolders,
    user: state.auth.user,
    currentPath: state.filefolders.currentPath,
  }), shallowEqual);


  const checkFolderAlreadyExist = (name) =>{
    const isExist = userFolders && userFolders.find((folder) => folder.name === name);
    return isExist ? true : false;
  }
  const dispatch = useDispatch();

  useEffect(()=>{
    if(isCreateSuccess){
      setButtonActive(true);
      setIsCreateSuccess(false);
      setFolderName("");
      setIsCreateFolderPanelOpen(false);
    }
  }, [isCreateSuccess, setIsCreateFolderPanelOpen])

  const handleSubmit = (e) =>{
    e.preventDefault();
    setButtonActive(false);
    if(!folderName){
      alert("folder name cannot be empty");
    }else{
      if(checkFolderAlreadyExist(folderName)){
        alert("folder already existed!");
      }else{
        // submit
        const data = {
          name: folderName,
          type: "folder",
          user: user,
          path: currentPath,
        };
        dispatch(createFolderEvent(data, setIsCreateSuccess));
      }
    }
  };
  return (
    <div className='col-md-12 position-fixed top-0 left-0 w-100 h-100'
    style={{background: "rgba(0, 0, 0, 0.4)", zIndex:9999}}>
      <div className='row align-items-cnter justify-content-center'>
        <div className='col-md-4 mt-5 bg-white rounded p-4'>
          <div className='d-flex justify-content-between'>
            <h4>Create Folder</h4>
            <button className='btn' onClick={() => setIsCreateFolderPanelOpen(false)}>
              <FontAwesomeIcon icon={faTimes} size="lg"
              />
            </button>
          </div>
          <hr />
          <div className='d-flex flex-column align-items-center'>
            <form className='mt-3 w-100' onSubmit={handleSubmit}>
              <div className='form-group'>
                <input type="text" className='form-control' id="folderName" 
                placeholder='New folder name...' 
                value={folderName}
                onChange={(e)=> setFolderName(e.target.value)}
                />
              </div>
              <button type="submit" className='btn btn-primary mt-5 form-control' disabled={!isButtonActive}>Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CreateFolderPanel;