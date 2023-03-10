import { getUserFromServer, registerUserToServer } from "../../backend/authBackend";
import { LOGIN_IN, REGISTER } from "../actionTypes/authActionTypes"

const getUserNameAndPassWord = (payload) =>({
    type:LOGIN_IN,
    payload,
  })
  
export const getUserNameAndPassWordEvent = (data, callback) =>(dispatch) =>{
    getUserFromServer(data,(result)=>{
        dispatch(getUserNameAndPassWord(result));
    })
    callback();
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



  