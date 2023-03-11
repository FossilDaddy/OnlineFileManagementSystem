import { mapResponseToFilesFolders } from "../utils/fileflderUtils"

const apiBaseUrl = "http://localhost:8080"

export async function getFoldersAndFilesFromS3(data, callback) {
    const path = data.path, user = data.user;
    const response = await fetch(apiBaseUrl + "/users/" + user.username + "/files?" + new URLSearchParams({path: user.username + "/" + path}), {
        method: "GET",
        headers: {
            "Authorization": "Basic " + btoa(`${user.username}:${user.password}`)
        }
    });
    if (!response.ok) {
        throw new Error(response.status);
    }
    const result = await response.json();
    if (result.status === "error") {
        alert("Error: " + result.message);
    }
    const filefolders = result.status === "success" && result.content !== undefined
        ? mapResponseToFilesFolders(result.content, user.username + "/" + path + "/") 
        : {"userFiles": [], "userFolders": []};

    callback(filefolders);
}

export async function uploadFileToS3(file, data, callback) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("key", data.user.username + "/" + data.path + "/" + data.name);
    const response = await fetch(apiBaseUrl + "/users/" + data.user.username + "/uploadFile", {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": "Basic " + btoa(`${data.user.username}:${data.user.password}`)
        }
    });
    if (!response.ok) {
        throw new Error(response.status);
    }
    const result = await response.json();
    if (result.status !== "success") {
        alert("Error: " + result.message);
    }
    callback();
}

export async function createNewFolderToS3(data, callback){
    await fetch(apiBaseUrl + "/users/" + data.user.username + "/createFolder",{
        method: "POST",
        headers: {
            "Authorization": "Basic " + btoa(`${data.user.username}:${data.user.password}`),
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({ "key": `${data.user.username}/${data.path}/${data.name}/`}),
    })
    .then((response) => (response.json()))
    .then((response)=>{
        if(response.error){
            alert("Error:", response.error);
        }else{
            callback();
        }
    })
}

export async function createNewFileToS3(data, callback){
    console.log(data, `${data.user.username}/${data.path}/${data.name}`);
    
    await fetch(apiBaseUrl + "/users/" + data.user.username + "/createFile", {
        method: "POST",
        headers: {
            "Authorization" : "Basic " + btoa(`${data.user.username}:${data.user.password}`),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "key": `${data.user.username}/${data.path}/${data.name}`,
            "type": "plain/text",
            })
    })
    .then((response) => (response.json()))
    .then((response)=>{
        if(response.error){
            alert("Error:", response.error);
        }else{
            callback();
        }
    })
}