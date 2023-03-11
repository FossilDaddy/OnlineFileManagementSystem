import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { React, useEffect, useState } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { createFileEvent } from '../../redux/actionCreators/filefolderActionCreator';


const CreateFilePanel = ({setIsCreateFilePanelOpen}) => {

  const [fileName, setFileName] = useState("");
  const [isButtonActive, setButtonActive] = useState(true);
  const {userFiles, user, currentPath} = useSelector((state) => ({
    userFiles: state.filefolders.userFiles,
    user: state.auth.user,
    currentPath: state.filefolders.currentPath,
  }), shallowEqual);

  const checkFileAlreadyExist = (name) =>{
    const isExist = userFiles && userFiles.find((file) => file.name === name);
    return isExist ? true : false;
  }
  const dispatch = useDispatch();

  const [isCreateSuccess, setIsCreateSuccess] = useState(false);
  useEffect(()=>{
    if(isCreateSuccess){
      setButtonActive(true);
      setFileName("");
      setIsCreateSuccess(false);
      setIsCreateFilePanelOpen(false);
    }
  }, [isCreateSuccess, setIsCreateFilePanelOpen])

  const handleSubmit = (e) =>{
    setButtonActive(false);
    e.preventDefault();
    if(!fileName){
      alert("file name cannot be empty");
    }else{
      var extension = false;
      if(fileName.split('.').length > 1){
        extension = true;
      }

      if(checkFileAlreadyExist(extension ? fileName : `${fileName}.txt`)){
        alert("file already existed!");
      }else{
        // submit
        const data = {
          name: extension ? fileName : `${fileName}.txt`,
          type: "file",
          user: user,
          path: currentPath,
          extension: extension ? fileName.split(".")[1] : "txt", 
          data: "",
        };
        dispatch(createFileEvent(data, setIsCreateSuccess));
      }
    }
  };
  return (
    <div className='col-md-12 position-fixed top-0 left-0 w-100 h-100'
    style={{background: "rgba(0, 0, 0, 0.4)", zIndex:9999}}>
      <div className='row align-items-cnter justify-content-center'>
        <div className='col-md-4 mt-5 bg-white rounded p-4'>
          <div className='d-flex justify-content-between'>
            <h4>Create File</h4>
            <button className='btn' onClick={() => setIsCreateFilePanelOpen(false)}>
              <FontAwesomeIcon icon={faTimes} size="lg"
              />
            </button>
          </div>
          <hr />
          <div className='d-flex flex-column align-items-center'>
            <form className='mt-3 w-100' onSubmit={handleSubmit}>
              <div className='form-group'>
                <input type="text" className='form-control' id="fileName" 
                placeholder='New file name... e,g. file.txt' 
                value={fileName}
                onChange={(e)=> setFileName(e.target.value)}
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
export default CreateFilePanel;