import { getUserFromServer, registerUserToServer } from "../../backend/authBackend";
import {LOGIN_IN,RESET_USER,REGISTER} from "../actionTypes/authActionTypes"
import { SET_LOADING } from "../actionTypes/filefoldersActionTypes";
import {DashboardPage} from "../../components/Dashboard";


const getUserNameAndPassWord = (payload) =>({
    type:LOGIN_IN,
    payload,
  })
  
export const getUserNameAndPassWordEvent = (data) =>(dispatch) =>{
    console.log("dispatch sucess");
    getUserFromServer(data,(result)=>{
        dispatch(getUserNameAndPassWord(result));
    });
    //console.log("跳转");
    //navigate(DashboardPage);
}

const registerUser = (payload) =>({
    type: REGISTER,
    payload,
  })
  
export const registerUserEvent = (data) =>(dispatch) =>{
    console.log("dispatch sucess");
    registerUserToServer(data,(result)=>{
        dispatch(registerUser(result));
    });
    //console.log("跳转");
    //navigate(DashboardPage);
}



  