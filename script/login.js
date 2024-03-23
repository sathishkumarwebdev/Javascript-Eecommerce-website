let loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = document.getElementById("username");
  let password = document.getElementById("password");

  if (username.value == "" || password.value == "") {
    alert("Ensure you input a value in both fields!");
  } else if (username.value === "sathish" && password.value === "12345") {
    window.location.replace("main.html");
  } else {
    alert("username or password worng ");
  }
});
