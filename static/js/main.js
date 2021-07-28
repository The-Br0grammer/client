const helpers = require("./helpers");

const loginButton = document.querySelector("#login-button");
const signInButton = document.querySelector("#sign-up-button");
// const errorMessages = document.getElementById("error-messages");

loginButton.addEventListener("click", helpers.setActiveButton);
signInButton.addEventListener("click", helpers.setActiveButton);

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    username: e.target.username.value,
    password: e.target.password.value,
    email: e.target.email.value,
  };

  // if any of the values are falsy, i.e empty, don't process.
  //   for (const key in data) {
  //     if (!data[key]) {
  //       // this one is already live so no need to do anything.
  //       errorMessages.textContent = "username or password missing.";
  //       return;
  //     }
  //   }

  helpers.clearAllInputFields();

  // TODO send the requests to the server.
  const requestType = location.hash;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  let endpoint = "";

  if (requestType == "#signup") {
    endpoint = "/auth/register";
  } else {
    endpoint = "/auth/login";
  }

  const response = await fetch(
    `https://brogrammers-habit-track.herokuapp.com${endpoint}`,
    options
  );

  const tokenData = await response.json();
  console.log(tokenData);
  const userData = jwt_decode(tokenData.token);
  localStorage.setItem("userId", userData.id);
  localStorage.setItem("username", userData.user);

  // let currentURL = window.location.href;

  // console.log(currentURL);
  // currentURL = currentURL.split("#")[0];
  window.location.assign(`http://192.168.0.37:8080/profile/`);

  //* Get the hash from the page to pick which fetch we do.
});
