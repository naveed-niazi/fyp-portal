export const groupRegistrationValidation = (
    groupName,
    description,
    team,
    groupMembers
) => {
    if (groupName.trim().length < 2 || groupName.trim().length > 50)
        return {
            error: "group name must be between 2-50 characters",
            errorIn: "groupName",
        };
    else if (description.trim().length < 50 || description.trim().length > 400)
        return {
            error: "description Must Be between 50-400 Characters",
            errorIn: "description",
        };
    else if (team === "duo" && groupMembers.length ===0)
        return { error: "Please Select Your Partner", errorIn: "team" };
    else return "";
};

export const projectInfoValidation = (title, abstract, scope, modulesList) => {
    if (title.trim().length < 2 || title.trim().length > 100)
        return {
            error: "Title Must Be between 2-100 Characters",
            errorIn: "title",
        };
    else if (abstract.trim().length < 50 || abstract.trim().length > 1000)
        return {
            error: "Abstract Must Be between 50-1000 Characters",
            errorIn: "abstract",
        };
    else if (scope.trim().length < 50 || scope.trim().length > 1000)
        return {
            error: "Scope Must Be between 50-1000 Characters",
            errorIn: "scope",
        };
    else if (modulesList.length < 3)
        return {
            error: "Add atleast 3 modules",
            errorIn: "module",
        };
    else if (modulesList.length > 10)
        return {
            error: "Number of modules can not exceed 10",
            errorIn: "module",
        };

    return "";
};

export const documentValidation = (file) => {
    if (file.length === 0)
        return {
            error: "Please Attach your Document",
            errorIn: "file",
        };

    return "";
};