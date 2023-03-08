import { mapResponseToFilesFolders } from "../utils/fileflderUtils"

const apiBaseUrl = "http://localhost:8080/"

export async function getFoldersAndFilesFromS3(data, callback) {
    const path = data.userId + "/";
    const result = await fetch(apiBaseUrl + data.userId + "/files", {
        method: "GET",
        headers: {
            "Accept": "Application/json",
            "Content-Type": "application/json"
        },
        body: {
            path: path
        }
    })
    .then(response => response.json())
    .then(data => mapResponseToFilesFolders(data.content.result));
    callback(result);
}