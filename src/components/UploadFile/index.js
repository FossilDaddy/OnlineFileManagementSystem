import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { React, useEffect, useState } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { uploadUserFileEvent } from '../../redux/actionCreators/filefolderActionCreator';


const UploadFilePanel = ({setIsUploadFilePanelOpen}) => {

  const [file, setFile] = useState("");
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
      setFile("");
      setIsCreateSuccess(false);
      setIsUploadFilePanelOpen(false);
    }
  }, [isCreateSuccess, setIsUploadFilePanelOpen])

  const handleSubmit = (e) =>{
    e.preventDefault();
    setButtonActive(false);
    if(file){
      if(!checkFileAlreadyExist(file.name)){
        const data = {
          name: file.name,
          path: currentPath,
          data: null,
          user: user,
          type: "file",
        }
        dispatch(uploadUserFileEvent(file, data, setIsCreateSuccess));
      }else{
        alert("File already existed!");
      }
    }

  };
  return (
    <div className='col-md-12 position-fixed top-0 left-0 w-100 h-100'
    style={{background: "rgba(0, 0, 0, 0.4)", zIndex:9999}}>
      <div className='row align-items-cnter justify-content-center'>
        <div className='col-md-4 mt-5 bg-white rounded p-4'>
          <div className='d-flex justify-content-between'>
            <h4>Upload File</h4>
            <button className='btn' onClick={() => setIsUploadFilePanelOpen(false)}>
              <FontAwesomeIcon icon={faTimes} size="lg"
              />
            </button>
          </div>
          <hr />
          <div className='d-flex flex-column align-items-center'>
            <form className='mt-3 w-100' onSubmit={handleSubmit}>
              <div className='form-group'>
                <input type="file" className='form-control' id="file" 
                placeholder='Upload file from local...' 
                onChange={(e)=> setFile(e.target.files[0])}
                />
              </div>
              <button type="submit" className='btn btn-primary mt-5 form-control' disabled={!isButtonActive}>Upload</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UploadFilePanel;