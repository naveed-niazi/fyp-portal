export const getSettings = () => {
    return fetch(`http://localhost:8080/systemsettings`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}
export const addNewBatch = batch => {
    return fetch(`http://localhost:8080/systemsettings/newbatch`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(batch)
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}
export const addNewProgram = degree => {
    return fetch(`http://localhost:8080/systemsettings/newprogram`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(degree)
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}
export const updateChairman = chairman => {
    return fetch(`http://localhost:8080/systemsettings/chairman`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(chairman)
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}

export const getSignupData = () => {
    return fetch(`http://localhost:8080/systemsettings/signup`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => { return response.json() })
        .catch(err => { console.log(err) })
}