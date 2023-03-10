import { mapResponseToFilesFolders } from "../utils/fileflderUtils"
import DashboardPage from "../components/Dashboard"
import { Navigate } from "react-router-dom";

const apiBaseUrl = "http://localhost:8080/users/"

export function getUserFromServer(data, callback) {
    const path = data.username;
    var basicAuth='Basic '+ btoa(data.username+":"+data.password);
    fetch(apiBaseUrl+path, {
        headers: {
            "Authorization":basicAuth
        }
    })
    .then(response => response.json())
    .then(() => {
       callback(data);
    }).catch(() => {
        window.alert("login unsuccessful");
    });
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

