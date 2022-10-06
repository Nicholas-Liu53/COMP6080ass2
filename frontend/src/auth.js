// import { BACKEND_PORT } from './config.js';

// let url = "http://localhost:" + BACKEND_PORT.tostring();

// //* Form variables *//
// let login_form = document.forms.login_form;
// let signup_form = document.forms.signup_form;

// //* Functions to submit login form
// // Login email
// let login_email = login_form.email_li;
// let login_email_handler = (event) => {
//     login_email = event.target.value;
//     console.log("Login Email: " + login_email);
// }
// login_email.addEventListener('change', login_email_handler);
// // Login password
// let login_password = login_form.password_li;
// let login_password_handler = (event) => {
//     login_password = event.target.value;
//     console.log("Login password: " + login_password);
// }
// login_password.addEventListener('change', login_password_handler);
// // Login button
// let login_button = document.getElementById('login-button');
// const submit_login = (email, password) => {
    
// }
// login_button.onclick = submit_login;

// //* Functions to submit signup form
// // Signup email
// let signup_email = signup_form.email_su;
// let signup_email_handler = (event) => {
//     signup_email = event.target.value;
//     console.log("Signup Email: " + signup_email);
// }
// signup_email.addEventListener('change', signup_email_handler);
// // Signup name
// let signup_name = signup_form.name_su;
// let signup_name_handler = (event) => {
//     signup_name = event.target.value;
//     console.log("Signup Name: " + signup_name);
// }
// signup_name.addEventListener('change', signup_name_handler);
// // Signup password
// let signup_password = signup_form.password_su;
// let signup_password_handler = (event) => {
//     signup_password = event.target.value;
//     console.log("Signup password: " + signup_password);
// }
// signup_password.addEventListener('change', signup_password_handler);
// // Signup password confirmation
// let signup_password_conf = signup_form.password_conf_su;
// let signup_password_conf_handler = (event) => {
//     signup_password_conf = event.target.value;
//     console.log("Signup password confirmation: " + signup_password_conf);
// }
// signup_password_conf.addEventListener('change', signup_password_conf_handler);
// // Signup button
// const submitSignup = (email, password) => {
    
// }

// //* Functions to toggle between Login/Signup page
// const display_signup = () => {
//     const login_bubble = document.querySelector(".login-bubble");
//     login_bubble.style.display = "none";
//     const signup_bubble = document.querySelector(".signup-bubble");
//     signup_bubble.style.display = "inline";
//     login_form.reset();
// }
// const signup_hyperlink = document.querySelector(".signup-hyperlink");
// signup_hyperlink.addEventListener("click", display_signup);

// const display_login = () => {
//     const signup_bubble = document.querySelector(".signup-bubble");
//     signup_bubble.style.display = "none";
//     const login_bubble = document.querySelector(".login-bubble");
//     login_bubble.style.display = "inline";
//     signup_form.reset();
// }
// const login_hyperlink = document.querySelector(".login-hyperlink");
// login_hyperlink.addEventListener("click", display_login);

// fetch(url, {
//     method: "POST",
// })
//     .then(res => res.json())

//     .then(js => console.log(js));