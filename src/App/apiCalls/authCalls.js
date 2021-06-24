
export const signup = student => {
    return fetch(`http://localhost:8080/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}
export const signin = user => {
    return fetch(`http://localhost:8080/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}
export const signout = () => {
    return fetch(`http://localhost:8080/signout`, {
        method: 'GET'
    })
        .then(response => {
            return response.json
        })
        .catch(err => console.log(err))
}
export const forgotPassword = email => {
    return fetch(`http://localhost:8080/forgot-password`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(email)
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}

export const newPassword = (resetId, Password) => {
    return fetch(`http://localhost:8080/reset-password/${resetId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Password)
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}

