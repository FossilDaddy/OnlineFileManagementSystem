
const apiBaseUrl = "http://3.210.232.113:8080"

export async function getUserFromServer(data, callback) {
    const path = data.username;
    const basicAuth = 'Basic '+ btoa(data.username+":"+data.password);
    
    await fetch(apiBaseUrl + "/users/" + path, {
        headers: {
            "Authorization":basicAuth
        }
    })
    .then(response => response.json())
    .then(() => {
        callback(data);
    }).catch(() => {
        alert("Login Failed! Please check your username/password.");
    });
}

export async function registerUserToServer(data,callback) {
    await fetch(apiBaseUrl + "/register", {
    method: "POST", 
    headers: {
        'Accept': "application/json",
        'Content-Type': "application/json"
    },
    body: JSON.stringify(data) 
    })
    .then((response) => response.json())
    .then((data) => {
        alert("Register Successfully!")
        callback();
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

