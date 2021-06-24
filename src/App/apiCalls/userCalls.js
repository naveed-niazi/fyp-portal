export const addUser = (user, token) => {
    return fetch(`http://localhost:8080/adduser`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}
export const getUsers = (userType, token) => {
    return fetch('http://localhost:8080/getusers?' + new URLSearchParams({ record: userType }),
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}

export const deleteUser = (id, token) => {
    return fetch(`http://localhost:8080/deleteuser`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "id": id
        },
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}
export const getUser = (id, token) => {
    return fetch(`http://localhost:8080/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}

export const pendingUsers = (token) => {
    return fetch(`http://localhost:8080/pendingusers`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}

export const eligibleUser = (id, token) => {
    return fetch(`http://localhost:8080/eligigbleuser/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}