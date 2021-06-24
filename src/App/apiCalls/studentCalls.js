const { isLoggedIn } = require("../helpers/authenticationHelp");
export const fetchNotEnrolledStudents = async () => {
    return await fetch(
           `http://localhost:8080/notEnrolled/${isLoggedIn().user._id}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isLoggedIn().token}`,
            },
        }
    )
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log("Fetch students errors");
            console.log(err);
        });
};