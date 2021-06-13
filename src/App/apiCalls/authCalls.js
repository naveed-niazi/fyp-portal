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
    if (typeof window !== undefined) {
        localStorage.removeItem('jwt');
        localStorage.removeItem('currentRole');
    }
    return fetch(`https://grc-portal.herokuapp.com/signout`, {
        method: 'GET'
    })
        .then(response => {
            console.log('signout', response)
            return response.json
        })
        .catch(err => console.log(err))
}
export const forgotPassword = email => {
    return fetch(`https://grc-portal.herokuapp.com/forgot-password`, {
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
    return fetch(`https://grc-portal.herokuapp.com/reset-password/${resetId}`, {
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

