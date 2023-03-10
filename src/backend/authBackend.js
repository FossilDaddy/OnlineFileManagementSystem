
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
        alert("login successful");
        callback(data);
    }).catch(() => {
        alert("login unsuccessful");
    });
}

const registerUrl = "http://localhost:8080/register"
export async function registerUserToServer(data,callback) {
    console.log(data);

    await fetch(registerUrl, {
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
        alert("Register Successfully!")
        callback();
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

