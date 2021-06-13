export const validationUser = (firstName, lastName, email) => {
    var emailRegex = /^[a-zA-Z0-9_.+-]+@iiu.edu.pk$/
    var nameRegex = /^[a-zA-Z ]{2,30}$/;


    if (!nameRegex.test(firstName))
        return { error: "Valid First Name Required", errorIn: "firstName" };
    if (!nameRegex.test(lastName))
        return { error: "Valid Last Name Required", errorIn: "lastName" };
    if (!emailRegex.test(email))
        return { error: "University Email Required", errorIn: "email" };
    else
        return { error: "", errorIn: "" }

}

export const validationAdmin = (fullName, email) => {
    var emailRegex = /^[a-zA-Z0-9_.+-]+@iiu.edu.pk$/
    var nameRegex = /^[a-zA-Z ]{2,30}$/;


    if (!nameRegex.test(fullName))
        return { error: "Valid Name Required", errorIn: "firstName" };
    if (!emailRegex.test(email))
        return { error: "University Email Required", errorIn: "email" };
    else
        return { error: "", errorIn: "" }

}