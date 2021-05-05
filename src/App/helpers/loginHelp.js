
export const validation = (firstName, lastName, email, password, regNo, degree, batch) => {
    var nameRegex = /^[a-zA-Z ]{2,30}$/;
    var decimal = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


    if (!nameRegex.test(firstName))
        return { error: "Valid First Name Required", errorIn: "firstName" };
    if (!nameRegex.test(lastName))
        return { error: "Valid Last Name Required", errorIn: "lastName" };
    if (!email.match(/.+\@iiu\.edu\.pk/))
        return { error: "University Email Required", errorIn: "email" };

    if (!password.match(decimal))
        return { error: "Strong Password Required", errorIn: "password" };
    if (regNo === "")
        return { error: "Required", errorIn: "regNo" };
    if (degree === "")
        return { error: "Required", errorIn: "degree" };
    if (batch === "")
        return { error: "Select a Batch", errorIn: "batch" };

    else
        return { error: "", errorIn: "" }

}
export const validationSignin = (email, password) => {
    var emailRegex = /^[a-zA-Z0-9_.+-]+@iiu.edu.pk$/

    if (!emailRegex.test(email))
        return { error: "University Email Required", errorIn: "email" };

    if (password < 1)
        return { error: "Password Required", errorIn: "password" };

    else
        return { error: "", errorIn: "" }

}

export const authenticate = (jwt, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt))
    }
    if (jwt.user.roles.includes("Student")) {
        localStorage.setItem("currentRole", "Student")
    }
    if (jwt.user.roles.includes("Admin")) {
        localStorage.setItem("currentRole", "Admin")
    }
    next()
}

