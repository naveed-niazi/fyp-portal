const { isLoggedIn } = require("../helpers/authenticationHelp");

export const createProjectAPI = async (data) => {
  return await fetch(`http://localhost:8080/create-project/${isLoggedIn().user._id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${isLoggedIn().token}`,
    },
    body: JSON.stringify(data)
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateVisionDocument = (data) => {
  return  fetch(`http://localhost:8080/create-project/visionDocuments/${isLoggedIn().user._id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${isLoggedIn().token}`,
    },
    body: data
  })
    .then((response) => {
      console.log("response")
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};