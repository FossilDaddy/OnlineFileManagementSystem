import { mapResponseToFilesFolders } from "../utils/fileflderUtils"
import DashboardPage from "../components/Dashboard"
import { Navigate } from "react-router-dom";

const apiBaseUrl = "http://localhost:8080/users/"

export async function getUserFromServer(data,callback) {
    const path = data.username;
    console.log(data.username+data.password);
    var basicAuth='Basic '+ btoa(data.username+":"+data.password);
    console.log(basicAuth);
    const result = fetch(apiBaseUrl+path, {
        headers: {
            "Authorization":basicAuth
        }
    })
    .then(response => response.json())
    .then(result => {
       console.log(result);
       callback(result);
       window.location.href="dashboard/";
       //return result;
    }).catch((error) => {
        window.alert("login unsuccessful");
    });
    // console.log("navigation");
    // console.log(result);
    // callback(result);
}

const baseUrl = "http://localhost:8080/register"
export async function registerUserToServer(data,callback) {
    console.log(data);

    const response=await fetch(baseUrl, {
    method: "POST", 
    headers: {
        'Accept': "application/json",
        'Content-Type': "application/json"
    },
    body: JSON.stringify(data) //JSON.stringify({"userName":data.userName,"password":data.password})
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Success:", data);
        callback(data);
        window.location.href="login/";

    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

