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
    }
    const filefolders = result.status === "success" && result.content !== undefined
        ? mapResponseToFilesFolders(result.content, user.username + "/" + path + "/") 
        : {"userFiles": [], "userFolders": []};

    callback(filefolders);
}
