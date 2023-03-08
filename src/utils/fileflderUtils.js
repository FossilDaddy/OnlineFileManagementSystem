import { S3Object } from "../types/filefolderType"

export const mapResponseToFilesFolders = (data) => {
    const files = [];
    const folders = [];
    data.foreach(element => {
        if (element.type == "file") {
            files.push(new S3Object(element.key, element.name, element.size, element.type));
        }
        else if (content.type == "folder") {
            folders.push(new S3Object(element.key, element.name, element.size, element.type));
        }
    })
    return {"userFiles": files, "userFolders": folders};
}