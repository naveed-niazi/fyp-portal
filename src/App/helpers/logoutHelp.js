export const clearCache = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt")
        localStorage.removeItem("expire_time")
        localStorage.removeItem("currentRole")
    }
    else
        return false;
}
