import { faArrowLeftLong, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateFileEvent, updateExistingFileEvent } from "../../redux/actionCreators/filefolderActionCreator"

const Header = ({fileName, fileData, prevFileData}) =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentFile, user } = useSelector((state)=>({
    currentFile: state.filefolders.userFiles.find(
      (file)=> file.name === fileName
    ),
    user: state.auth.user
  }))

  return (
    <nav className="navbar navbar-expand-lg mt-1 navbar-light bg-white shadow-sm">
      <p className="navbar-brand fw-bold ms-5">{fileName}</p>
      {
        fileData !== prevFileData && (
          <h5 className="my-0 fw-bold ms-2 text-danger">*[modefied]</h5>
        )}
      <ul className="navbar-nav ms-auto me-5">
        <li className="nav-item mx-2">
          <button className="btn btn-success" 
                  disabled={fileData === prevFileData}
                  onClick={()=>{
                    dispatch(updateFileEvent(fileName, fileData))
                    dispatch(updateExistingFileEvent({...currentFile, user: user, data: fileData}))
                  }}>
            <FontAwesomeIcon icon={faSave} /> &nbsp;
            Save
          </button>
        </li>

        <li className="nav-item">
          <button className="btn btn-dark" onClick={()=> navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeftLong} /> &nbsp;
            Go Back
          </button>
        </li>
      </ul>
    </nav>

  )
};

export default Header;