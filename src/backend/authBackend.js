
const loginUrl = "http://localhost:8080/users/"

export async function getUserFromServer(data, callback) {
    const path = data.username;
    const basicAuth='Basic '+ btoa(data.username+":"+data.password);
    
    await fetch(loginUrl+path, {
        headers: {
            "Authorization":basicAuth
        }
    })
    .then(response => response.json())
    .then(() => {
        callback(data);
    }).catch(() => {
        alert("login unsuccessful");
    });
}

const registerUrl = "http://localhost:8080/register"
export async function registerUserToServer(data,callback) {
    await fetch(registerUrl, {
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

