export const getNameFromKey = (element) => {
    const path = element.key.split("/");
    return element.type === "folder" ? path[path.length - 2] : path[path.length - 1];
}

export const mapResponseToFilesFolders = (data, prefix) => {
    const files = [];
    const folders = [];
    data.forEach(element => {
        const path = element.key.replace(prefix, "").split("/");
        if (path.length === 1 || (path.length === 2 && path[path.length - 1] === "")) {
            const name = getNameFromKey(element);
            if (element.type === "file") {
                files.push({"key": element.key, "name": name, "size": element.size, "type": element.type});
            }
            else if (element.type === "folder") {
                folders.push({"key": element.key, "name": name, "size": element.size, "type": element.type});
            }
        }
    })
    return {"userFiles": files, "userFolders": folders};
}