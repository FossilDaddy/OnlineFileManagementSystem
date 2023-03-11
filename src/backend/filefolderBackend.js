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
        // pop up warning window for error message.
       alert("Fetching data error");
    }
    const filefolders = result.status === "success" && result.content !== undefined
        ? mapResponseToFilesFolders(result.content, user.username + "/" + path + "/") 
        : {"userFiles": [], "userFolders": []};

    callback(filefolders);
}

export async function createNewFolderToS3(data, callback){
    console.log(data);
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
    .then(()=>{
        callback();
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}