export const verifyUser = (code) => {
    return fetch(`https://grc-portal.herokuapp.com/confirm/${code}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};

export const deleteUser = (code) => {
    return fetch(`https://grc-portal.herokuapp.com/delete/${code}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};