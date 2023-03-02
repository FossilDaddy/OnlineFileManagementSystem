import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeCurrentPathEvent } from "../../redux/actionCreators/filefolderActionCreator";
const ShowItems = ({tittle, items}) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDoubleClick = (item) =>{
    if(item.type && item.type === 'file'){
      alert("File clicked");
    }else{
      dispatch(changeCurrentPathEvent(item.name));
      navigate(`/dashboard/folder/${item.name}`);
    }
  }

  return (
    <div className="w-100">
      <h4 className="text-center border-bottom py-2">
        {tittle}
      </h4>
      <div className="row gap-2 p-4 flex-wrap">
        {items.map((item, index) => {
          return (
            <p key = {index} className="col-md-2 py-3 text-center d-flex flex-column border" onDoubleClick={()=> handleDoubleClick(item)}>
            <FontAwesomeIcon icon = {faFolder} size="4x" className="mb-3" />
              {item.name}
            </p>
          )
        })}
      </div>
    </div>
  )
}

export default ShowItems;