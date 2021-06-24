export const isLoggedIn = () => {

    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {

        if (localStorage.getItem("expire_time")) {
            const expireTime = parseInt(localStorage.getItem("expire_time"))
            const timeNow = parseInt(Date.now())
            if (expireTime < timeNow) {
                localStorage.removeItem("jwt")
                localStorage.removeItem("expire_time")
                localStorage.removeItem("currentRole")
                return false;
            }
            else {
                return JSON.parse(localStorage.getItem("jwt"))
            }
        } else {
            return JSON.parse(localStorage.getItem("jwt"))
        }
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
export const changeRole = (role) => {
    console.log("changing the role: " + role)
    if (role === "Professor" || role === "Program-Office" || role === "Admin") {
        localStorage.setItem("currentRole", role)
        return true;
    }
    return false;

}