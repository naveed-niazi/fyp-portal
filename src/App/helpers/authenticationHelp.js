export const isLoggedIn = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else
        return false;
}

export const roleNow = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("currentRole")) {
        return localStorage.getItem("currentRole")
    }
    else
        return false;
}
