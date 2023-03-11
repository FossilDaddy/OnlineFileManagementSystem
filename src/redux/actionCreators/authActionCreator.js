import { getUserFromServer, registerUserToServer } from "../../backend/authBackend";
import { LOGIN_IN } from "../actionTypes/authActionTypes"

const getUserNameAndPassWord = (payload) =>({
    type:LOGIN_IN,
    payload,
})

export const getUserNameAndPassWordEvent = (data, callback) =>(dispatch) =>{
    getUserFromServer(data,(result)=>{
        dispatch(getUserNameAndPassWord(result));
        callback();
    })
    
}

export const registerUserEvent = (data, callback) =>(dispatch) =>{
    registerUserToServer(data, callback);
}
