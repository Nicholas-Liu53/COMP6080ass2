import { BACKEND_PORT } from './config.js';
// A helper you may want to use when uploading new images to the server.
import { fileToDataUrl } from './helpers.js';

console.log('Let\'s go!');

const url = "http://localhost:" + String(BACKEND_PORT);

//* Form variables *//
var token;
var userId;
let login_form = document.forms.login_form;
let signup_form = document.forms.signup_form;

//* Error handling variables *//
let prev_display_bubble = document.querySelector(".login-bubble");

//* Functions to submit login form
// Login email
let login_email = login_form.email_li;
let login_email_handler = (event) => {
    login_email = event.target.value;
    console.log("Login Email: " + login_email);
}
login_email.addEventListener('change', login_email_handler);
// Login password
let login_password = login_form.password_li;
let login_password_handler = (event) => {
    login_password = event.target.value;
    console.log("Login password: " + login_password);
}
login_password.addEventListener('change', login_password_handler);
// Login button
let login_button = document.getElementById('login-button');
const submit_login = (event) => {
    
    let data = {
        email: login_email,
        password: login_password
    };

    fetch(url + "/auth/login", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`Error: ${res.status}`);
            }
        })
        .then(data => {
            console.log("Success: ", data);
            // Store the token and userId
            token = data["token"];
            userId = data["userId"];
            // Take the user to the main page
            display_mainpage();
        })
        .catch(err => {
            prev_display_bubble = document.querySelector(".login-bubble");
            display_error_popup("Invalid Email or Password");
            console.log("Error: ", err);
        });
    
    
    
    event.preventDefault();
}
login_button.onclick = submit_login;

//* Functions to submit signup form
// Signup email
let signup_email = signup_form.email_su;
let signup_email_handler = (event) => {
    signup_email = event.target.value;
    console.log("Signup Email: " + signup_email);
}
signup_email.addEventListener('change', signup_email_handler);
// Signup name
let signup_name = signup_form.name_su;
let signup_name_handler = (event) => {
    signup_name = event.target.value;
    console.log("Signup Name: " + signup_name);
}
signup_name.addEventListener('change', signup_name_handler);``
// Signup password
let signup_password = signup_form.password_su;
let signup_password_handler = (event) => {
    signup_password = event.target.value;
    console.log("Signup password: " + signup_password);
}
signup_password.addEventListener('change', signup_password_handler);
// Signup password confirmation
let signup_password_conf = signup_form.password_conf_su;
let signup_password_conf_handler = (event) => {
    signup_password_conf = event.target.value;
    console.log("Signup password confirmation: " + signup_password_conf);
}
signup_password_conf.addEventListener('change', signup_password_conf_handler);
// Signup button
let signup_button = document.getElementById('signup-button');
const submit_signup = (event) => {
    
    if (signup_password != signup_password_conf) { 
        prev_display_bubble = document.querySelector(".signup-bubble");
        display_error_popup("Passwords don\'t match!\0");
        console.log("Error: passwords don\'t match");
        return;
    }

    let data = {
        email: signup_email,
        name: signup_name,
        password: signup_password
    };

    // console.log("it has made it up to fetch stage");

    fetch(url + "/auth/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.ok) {
                // console.log("res is ok I guess");
                return res.json();
            } else {
                // console.log("res is not ok i guess")
                throw new Error(`Error: ${res.status}`);
            }
        })
        .then(data => {
            console.log('Success:', data);
            // Store the token and userId
            token = data["token"];
            userId = data["userId"];
            // Take the user to the main page
            display_mainpage();
        })
        .catch(err => {
            prev_display_bubble = document.querySelector(".signup-bubble");
            display_error_popup("Invalid Input");
            console.log("Error: ", err);
        });
        
    
    event.preventDefault();
}
signup_button.onclick = submit_signup;

//* Functions to signout
let signout_button = document.getElementById('signout-button');
const signout_function = () => {
    let data = {};
    fetch(url + "/auth/logout", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`Error: ${res.status}`);
            }
        })
        .then(data => {
            console.log('Success:', data);
            // Take the user back to login page
            hide_mainpage();
            display_login();
        })
        .catch(err => {
            console.log('Error: ', err);
        });

    
}
signout_button.onclick = signout_function;

//* Functions to toggle between pages
const display_signup = () => {
    const login_bubble = document.querySelector(".login-bubble");
    login_bubble.style.display = "none";
    const signup_bubble = document.querySelector(".signup-bubble");
    signup_bubble.style.display = "block";
    login_form.reset();
}
const signup_hyperlink = document.querySelector(".signup-hyperlink");
signup_hyperlink.addEventListener("click", display_signup);

const display_login = () => {
    const signup_bubble = document.querySelector(".signup-bubble");
    signup_bubble.style.display = "none";
    const login_bubble = document.querySelector(".login-bubble");
    login_bubble.style.display = "block";
    signup_form.reset();
}
const login_hyperlink = document.querySelector(".login-hyperlink");
login_hyperlink.addEventListener("click", display_login);

const display_error_popup = (error_msg) => {
    const error_popup = document.querySelector(".error-popup");
    document.getElementById("error-msg").innerHTML = error_msg;
    prev_display_bubble.style.display = "none";
    error_popup.style.display = "block";
}

const close_button = document.getElementById("close-popup");
const close_error_popup = () => {
    const error_popup = document.querySelector(".error-popup");
    error_popup.style.display = "none";
    prev_display_bubble.style.display = "block";
}
close_button.onclick = close_error_popup;

const display_mainpage = () => {
    const login_button = document.querySelector(".login-bubble");
    login_button.style.display = "none";
    login_form.reset();
    const signup_bubble = document.querySelector(".signup-bubble");
    signup_bubble.style.display = "none";
    signup_form.reset();
    
    // Do the channel banner
    var users_name;
    fetch(url + "/user/" + userId, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
            'userId': userId
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`Error: ${res.status}`);
            }
        })
        .then(data => {
            console.log('Success:', data);
            users_name = data["name"];
            let welcome_banner = document.getElementById("welcome-banner");
            welcome_banner.innerHTML = "Welcome to Slackr, " + users_name + "!!";
        })
        .catch(err => {
            console.log('Error: ', err);
        });

    // Do the list of channels and display
    fetch(url + "/channel", {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`Error: ${res.status}`);
            }
        })
        .then(data => {
            console.log('Success:', data);
            let channels_tabs_wrapper = document.querySelector('.channels-tabs-wrapper');
            for (var channel in data) {
                let tab = document.createElement("div");
                let tab_label = document.createElement("h6");
                tab_label.innerHTML = channel["name"];
                tab.appendChild(tab_label);
                tab.onclick = open_channel(channel["id"]);
                channels_tabs_wrapper.appendChild(tab);
            }
        })
        .catch(err => {
            console.log('Error: ', err);
        });
    
    const slackr_mainpage = document.querySelector(".slackr-mainpage");
    slackr_mainpage.style.display = "block";
}

const hide_mainpage = () => {
    const slackr_mainpage = document.querySelector(".slackr-mainpage");
    slackr_mainpage.style.display = "none";
    let channels_tabs_wrapper = document.querySelector('.channels-tabs-wrapper');
    while(channels_tabs_wrapper.firstChild) 
        channels_tabs_wrapper.removeChild(channels_tabs_wrapper.lastChild);
}

const open_channel = (channelId) => {
    fetch(url + "/channel", {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`Error: ${res.status}`);
            }
        })
        .then(data => {
            console.log('Success: ', data);
            //! Find the channel based on channelId
            var channel;
            let channelFound = false;
            for (channel in data["channels"]) {
                if (data["channels"]["id"] == channelId) {
                    channelFound = true;
                }
            }
            if (!channelFound) {
                throw new Error("Error: channel doesn't exist");
            }
            fetch(url + "/channel/" + channelId, {
                method: "GET",
                headers: {
                    'authorization': 'bearer ' + token,
                    'channelId': channelId
                }
            });

        })
        .catch(err =>  {
            console.log("Error: ", err);
        });
}

const new_channel_tab = document.getElementById("create-channel-tab");
const create_channel = () => {
    //! GOTTA CREATE ANOTHER POP UP TO COLLECT DATA FOR THE NEW CHANNEL

    data = {
        'name': channel_name,
        'private': priv,
        'description': desc
    }

    fetch(url + "/channel", {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token
        }, 
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`Error: ${res.status}`);
            }
        })
        .then(data => {
            console.log('Success: ', data);

        })
        .catch(err =>  {
            console.log("Error: ", err);
        });
}
new_channel_tab.addEventListener('click', create_channel);