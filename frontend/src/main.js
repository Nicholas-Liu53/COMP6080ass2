import { BACKEND_PORT } from './config.js';
// A helper you may want to use when uploading new images to the server.
import { fileToDataUrl } from './helpers.js';

// console.log('Let\'s go!');

const url = "http://localhost:" + String(BACKEND_PORT);

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//********************************************************************/
//**                         Milestone 1                            **/
//********************************************************************/

//* Form variables *//
var token;
var user_id;
let login_form = document.forms.login_form;
let signup_form = document.forms.signup_form;
let new_channel_form = document.forms.new_channel_form;

//* Error handling variables *//
let prev_display_bubble = document.getElementById("login-bubble");

//* Functions to submit login form
// Login email
let login_email = login_form.email_li;
let login_email_handler = (event) => {
    login_email = event.target.value;
    // console.log("Login Email: " + login_email);
}
login_email.addEventListener('change', login_email_handler);
// Login password
let login_password = login_form.password_li;
let login_password_handler = (event) => {
    login_password = event.target.value;
    // console.log("Login password: " + login_password);
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
            // console.log("Success: ", data);
            // Store the token and userId
            token = data["token"];
            user_id = data["userId"];
            // Clear the form inputs (SECURITY REASONS)
            login_email = "";
            login_password = "";
            // Take the user to the main page
            display_mainpage();
        })
        .catch(err => {
            prev_display_bubble = document.getElementById("login-bubble");
            display_error_popup("Invalid Email or Password");
            // console.log("Error: ", err);
        });
    
    
    
    event.preventDefault();
}
login_button.onclick = submit_login;

//* Functions to submit signup form
// Signup email
let signup_email = signup_form.email_su;
let signup_email_handler = (event) => {
    signup_email = event.target.value;
    // console.log("Signup Email: " + signup_email);
}
signup_email.addEventListener('change', signup_email_handler);
// Signup name
let signup_name = signup_form.name_su;
let signup_name_handler = (event) => {
    signup_name = event.target.value;
    // console.log("Signup Name: " + signup_name);
}
signup_name.addEventListener('change', signup_name_handler);``
// Signup password
let signup_password = signup_form.password_su;
let signup_password_handler = (event) => {
    signup_password = event.target.value;
    // console.log("Signup password: " + signup_password);
}
signup_password.addEventListener('change', signup_password_handler);
// Signup password confirmation
let signup_password_conf = signup_form.password_conf_su;
let signup_password_conf_handler = (event) => {
    signup_password_conf = event.target.value;
    // console.log("Signup password confirmation: " + signup_password_conf);
}
signup_password_conf.addEventListener('change', signup_password_conf_handler);
// Signup button
let signup_button = document.getElementById('signup-button');
const submit_signup = (event) => {
    
    if (signup_password != signup_password_conf) { 
        prev_display_bubble = document.getElementById("signup-bubble");
        display_error_popup("Passwords don\'t match!");
        // console.log("Error: passwords don\'t match");
        return;
    }

    let data = {
        email: signup_email,
        name: signup_name,
        password: signup_password
    };

    console.log("it has made it up to fetch stage");

    fetch(url + "/auth/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.ok) {
                console.log("res is ok I guess");
                return res.json();
            } else {
                console.log("res is not ok i guess")
                throw new Error(`Error: ${res.status}`);
            }
        })
        .then(data => {
            // console.log('Success:', data);
            // Store the token and userId
            token = data["token"];
            user_id = data["userId"];
            // Clear the form inputs (SECURITY REASONS)
            signup_email = "";
            signup_name = "";
            signup_password = "";
            signup_password_conf = "";
            // Take the user to the main page
            display_mainpage();
        })
        .catch(err => {
            prev_display_bubble = document.getElementById("signup-bubble");
            display_error_popup("Invalid Input");
            // console.log("Error: ", err);
        });
        
    
    event.preventDefault();
}
signup_button.onclick = submit_signup;

//* Functions to signout
// Signout button
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
            // console.log('Success:', data);
            // Take the user back to login page
            hide_mainpage();
            display_login();
        })
        .catch(err => {
            // console.log('Error: ', err);
        });

    
}
signout_button.onclick = signout_function;

//* Functions to toggle between pages
// Display the signup page
const display_signup = () => {
    const login_bubble = document.getElementById("login-bubble");
    login_bubble.style.display = "none";
    const signup_bubble = document.getElementById("signup-bubble");
    signup_bubble.style.display = "block";
    login_form.reset();
}
const signup_hyperlink = document.getElementById("signup-hyperlink");
signup_hyperlink.addEventListener("click", display_signup);

// Display the login page
const display_login = () => {
    const signup_bubble = document.getElementById("signup-bubble");
    signup_bubble.style.display = "none";
    const login_bubble = document.getElementById("login-bubble");
    login_bubble.style.display = "block";
    signup_form.reset();
}
const login_hyperlink = document.getElementById("login-hyperlink");
login_hyperlink.addEventListener("click", display_login);

// Display the error popups
const display_error_popup = (error_msg) => {
    const error_popup = document.getElementById("error-popup");
    document.getElementById("error-msg").textContent = error_msg;
    prev_display_bubble.style.display = "none";
    error_popup.style.display = "block";
}

// Close the error popups
const close_button = document.getElementById("close-popup");
const close_error_popup = () => {
    const error_popup = document.getElementById("error-popup");
    error_popup.style.display = "none";
    prev_display_bubble.style.display = "block";
}
close_button.onclick = close_error_popup;

//********************************************************************/
//**                         Milestone 2                            **/
//********************************************************************/

// Display the mainpage (when you log in)
const display_mainpage = () => {
    const login_button = document.getElementById("login-bubble");
    login_button.style.display = "none";
    login_form.reset();
    const signup_bubble = document.getElementById ("signup-bubble");
    signup_bubble.style.display = "none";
    signup_form.reset();

    // Do the channel banner
    var users_name;
    fetch(url + "/user/" + user_id, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'userId': user_id
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
            // console.log('Success:', data);
            users_name = data["name"];
            let welcome_banner = document.getElementById("welcome-banner");
            welcome_banner.textContent = "Welcome to Slackr, " + users_name + "!!";
        })
        .catch(err => {
            // console.log('Error: ', err);
        });

    // Do the list of channels and display
    fetch(url + "/channel", {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
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
            // console.log('Success:', data);
            let channel_tabs_wrapper = document.getElementById('channel-tabs-wrapper');
            //! Kill all children of wrapper and tabs first
            while (channel_tabs_wrapper.firstChild) {
                channel_tabs_wrapper.removeChild(channel_tabs_wrapper.lastChild);
            }
            let channel_heading_wrapper = document.getElementById('channel-heading-wrapper');
            while (channel_heading_wrapper.firstChild) {
                channel_heading_wrapper.removeChild(channel_heading_wrapper.lastChild);
            }
            for (var channel of data["channels"]) {
                // console.log("channel: ", channel);
                if (!channel["private"] || channel["members"].includes(user_id)) {

                    // Store the channel id here to avoid weird pointer quirks
                    let locally_channel_id = channel["id"];

                    let channel_heading = document.createElement('div');
                    channel_heading.className = "channel-heading";
                    channel_heading.id = "channel-heading-for-" + channel["id"];
                    
                    // Create heading
                    let channel_name = document.createElement("h4");
                    channel_name.textContent = channel["name"];
                    channel_heading.appendChild(channel_name);
                    // Show channel details (that's not desc)
                    // Priv?
                    let channel_details = document.createElement("i");
                    channel_details.textContent = channel["private"] ? "Private" : "Public";
                    channel_details.textContent = channel_details.textContent + " channel - Created ";
                    let channel_desc = document.createElement("p");
                    // Creator?
                    get_user_details(channel["creator"]).then((data_layer_3) => { 
                        channel_details.textContent = channel_details.textContent + " by " + data_layer_3["name"]; 
                    });
                    get_channel_details(channel["id"]).then((data_layer_4) => { 
                        // Creation Date?
                        let creation_date = new Date(data_layer_4["createdAt"]);
                        channel_details.textContent = channel_details.textContent + " on " + creation_date.getDate() + " " + months[creation_date.getMonth()] + " " + creation_date.getFullYear();
                        // Show channel desc
                        channel_desc.textContent = data_layer_4["description"];
                    });
                    channel_heading.appendChild(channel_details);
                    channel_heading.appendChild(channel_desc);

                    channel_heading.style.display = "none";
                    channel_heading_wrapper.appendChild(channel_heading);

                    // Create the tab itself
                    let tab = document.createElement("div");
                    tab.className = "tab channels-tab";
                    tab.id = "tab-for-" + channel["id"];  
                    // console.log("Bug in");
                    let priv_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    priv_svg.setAttribute("class", "priv-icon");
                    priv_svg.id = "priv-icon-for-" + channel["id"];
                    // console.log("Bug out");
                    if (channel["private"]) {
                        let svg_path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                        priv_svg.setAttribute("height", "50");
                        priv_svg.setAttribute("width", "50");
                        priv_svg.setAttribute("viewBox", "-10 -25 150 125");
                        svg_path.setAttribute("d", "M52.23,66.35c3.6-1.59,7.17-2.48,10.68-2.55c3.47-0.07,6.83,0.67,10.08,2.34c2-2.9,5.35-4.81,9.15-4.81 c6.13,0,11.11,4.97,11.11,11.11c0,6.14-4.97,11.11-11.11,11.11c-6.14,0-11.11-4.97-11.11-11.11c0-0.24,0.01-0.49,0.02-0.73 c-2.59-1.49-5.28-2.14-8.05-2.09c-2.86,0.05-5.85,0.87-8.97,2.31c0.01,0.17,0.01,0.33,0.01,0.5c0,6.14-4.97,11.11-11.11,11.11 c-6.13,0-11.11-4.97-11.11-11.11c0-6.14,4.97-11.11,11.11-11.11C46.83,61.33,50.25,63.33,52.23,66.35L52.23,66.35z M34.42,4.6 c5.56-6.68,7.7-4.62,14.47-2.79c8.46,2.28,16.72,2.84,25.5,0.32c6.53-1.88,9.39-4.49,15.28,2.08C94,9.03,96.69,16.78,98.3,21.64 c1.93,5.81,3.25,11.77,4.04,17.85H22.73C25.57,25.21,28.98,12.38,34.42,4.6L34.42,4.6z M4.48,43.46H118.4 c2.47,0,4.48,2.02,4.48,4.48v0c0,2.47-2.02,4.48-4.48,4.48H4.48C2.02,52.42,0,50.41,0,47.94v0C0,45.48,2.02,43.46,4.48,43.46 L4.48,43.46z");
                        priv_svg.appendChild(svg_path);
                    } else {
                        priv_svg.setAttribute("width", "50");
                        priv_svg.setAttribute("height", "50");
                        priv_svg.setAttribute("stroke", "#000");
                        priv_svg.setAttribute("fill", "none");
                        priv_svg.setAttribute("viewBox", "0 0 450 450");
                        let svg_path1 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                        svg_path1.setAttribute("stroke-width", "26");
                        svg_path1.setAttribute("d", "M209,15a195,195 0 1,0 2,0z");
                        let svg_path2 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                        svg_path2.setAttribute("stroke-width", "18");
                        svg_path2.setAttribute("d", "m210,15v390m195-195H15M59,90a260,260 0 0,0 302,0 m0,240 a260,260 0 0,0-302,0M195,20a250,250 0 0,0 0,382 m30,0 a250,250 0 0,0 0-382");
                        priv_svg.appendChild(svg_path1);
                        priv_svg.appendChild(svg_path2);
                    }
                    tab.appendChild(priv_svg);
                    let tab_label = document.createElement("h6");
                    tab_label.className = "tab-label";
                    tab_label.id = "tab-label-for-" + channel["id"];
                    console.log("tab_label's id: ", tab_label.id);
                    tab_label.textContent = channel["name"];
                    tab.appendChild(tab_label);
                    // console.log("channelId being parsed into listener: ", channel["id"]);
                    tab.addEventListener('click', () => {
                        open_channel(locally_channel_id);
                    });
                    channel_tabs_wrapper.appendChild(tab);
                }
            }
        })
        .catch(err => {
            // console.log('Error: ', err);
        });
    
    const slackr_mainpage = document.getElementById("slackr-mainpage");
    slackr_mainpage.style.display = "block";
}

// Hide the main page (used when logging out)
const hide_mainpage = () => {
    const slackr_mainpage = document.getElementById("slackr-mainpage");
    slackr_mainpage.style.display = "none";
    let channel_tabs_wrapper = document.getElementById('channel-tabs-wrapper');
    while(channel_tabs_wrapper.firstChild != null) {
        channel_tabs_wrapper.removeChild(channel_tabs_wrapper.lastChild);
    }
}

// Opening the channel
let open_channel = (channel_id) => {
    
    //! If new channel form is open, close it
    let new_channel_bubble = document.getElementById("new-channel-bubble");
    new_channel_bubble.style.display = "none";

    console.log("open_channel be opening: ", channel_id);

    let channel_heading_wrapper = document.getElementById('channel-heading-wrapper');
    for (var channel_heading of channel_heading_wrapper.children) {
        channel_heading.style.display = channel_heading.id == ("channel-heading-for-" + channel_id) ? "inline-block" : "none";
        
    }
    // To make tab pressed
    let channel_tabs_wrapper = document.getElementById('channel-tabs-wrapper');
    console.log("Tabs LOOP!!");
    for (var channel_tab of channel_tabs_wrapper.children) {
        // Get pure id of channel_tab
        let pure_id = channel_tab.id.replace("tab-for-", "");
        if (channel_tab.id == ("tab-for-" + channel_id)) {
            if (channel_tab.className.includes("-active")) continue;
            channel_tab.className += "-active";
            let tab_label = document.getElementById('tab-label-for-' + String(pure_id));
            tab_label.className += "-active";
            let priv_icon = document.getElementById('priv-icon-for-' + String(pure_id));
            // console.log("icon becoming active: id -", priv_icon.id, ": class -", priv_icon.className);
            priv_icon.setAttribute("stroke", "white");
            if (priv_icon.getAttribute("fill") != "none") {
                priv_icon.setAttribute("fill", "white");
            }
            // console.log("icon became active: id -", priv_icon.id, ": class -", priv_icon.className);
        } else {
            channel_tab.className = channel_tab.className.replace("-active", "");
            let tab_label = document.getElementById('tab-label-for-' + String(pure_id));
            tab_label.className = tab_label.className.replace("-active", "");
            let priv_icon = document.getElementById('priv-icon-for-' + String(pure_id));
            // if (priv_icon.getAttribute('class').includes("-active")) {
            //     console.log("icon was active: id -", priv_icon.id, ": class -", priv_icon.className);
            // }
            priv_icon.setAttribute('stroke', "black");
            if (priv_icon.getAttribute("fill") != "none") {
                priv_icon.setAttribute("fill", "black");
            }
            // console.log("icon inactive: id -", priv_icon.id, ": class -", priv_icon.className);
        }
    }

    //! Milestone 3 - Display channel msgs
    display_channel_msgs(channel_id);

    //! Milestone 3 - Set send button for this channel
    let send_button = document.getElementById("send-msg-button");
    send_button.onclick = send_message(channel_id);

    //! Milestone 3 - Clear the message box
    document.getElementById("message-box").value = "";

    const channel_screen = document.getElementById("channel-screen");
    channel_screen.style.display = "flex";
}

// Tab that displays a create channel bubble
const new_channel_tab = document.getElementById("create-channel-tab");
const display_new_channel_form = () => {
    // Unpress the tabs
    let channel_tabs_wrapper = document.getElementById('channel-tabs-wrapper');
    console.log("Tabs LOOP!!");
    for (var channel_tab of channel_tabs_wrapper.children) {
        // Get pure id of channel_tab
        let pure_id = channel_tab.id.replace("tab-for-", "");
        channel_tab.className = channel_tab.className.replace("-active", "");
        let tab_label = document.getElementById('tab-label-for-' + String(pure_id));
        tab_label.className = tab_label.className.replace("-active", "");
        let priv_icon = document.getElementById('priv-icon-for-' + String(pure_id));
        priv_icon.setAttribute('stroke', "black");
        if (priv_icon.getAttribute("fill") != "none") {
            priv_icon.setAttribute("fill", "black");
        }
    }

    const channel_screen = document.getElementById("channel-screen");
    channel_screen.style.display = "none";
    const new_channel_bubble = document.getElementById("new-channel-bubble");
    new_channel_bubble.style.display = "block";
}
new_channel_tab.addEventListener('click', display_new_channel_form);

//* New channel form functions
// New channel name
let new_channel_name = new_channel_form.new_channel_name;
let new_channel_name_handler = (event) => {
    new_channel_name = event.target.value;
    // console.log("New Channel Name: " + new_channel_name);
}
new_channel_name.addEventListener('change', new_channel_name_handler);

// New channel private status
let new_channel_priv_status = new_channel_form.new_channel_priv_status;
let new_channel_priv_status_handler = () => {
    // new_channel_priv_status = event.target.value;
    // console.log("New Channel Private Status: " + new_channel_priv_status.checked);
}
new_channel_priv_status.addEventListener('change', new_channel_priv_status_handler);

// New channel description
let new_channel_desc = new_channel_form.new_channel_desc;
let new_channel_desc_handler = (event) => {
    new_channel_desc = event.target.value;
    // console.log("New Channel Description: " + new_channel_desc);
    // console.log("New Channel Description type " + typeof new_channel_desc);
}
new_channel_desc.addEventListener('change', new_channel_desc_handler);

// Tab that creates the channel and then displays the channel
const create_channel_button = document.getElementById("create-channel-button");
const create_channel = () => {
    const new_channel_bubble = document.getElementById("new-channel-bubble");
    new_channel_bubble.style.display = "none";

    let new_channel_priv_status_in_data = new_channel_priv_status.checked;
    
    let new_channel_desc_in_data = new_channel_desc;
    if (typeof new_channel_desc != "string" || new_channel_desc == "") { 
        new_channel_desc_in_data = "no description.";
    }

    let data = {
        name: new_channel_name,
        private: new_channel_priv_status_in_data,
        description: new_channel_desc_in_data
    };

    // console.log(data);

    
    fetch(url + "/channel", {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
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
            // console.log('Success: ', data);
            // Clear form values
            new_channel_form.reset();
            new_channel_name = "";
            new_channel_desc = "";
            const channel_screen = document.getElementById("channel-screen");
            channel_screen.style.display = "flex";
            display_mainpage();
            open_channel(data['channelId']);
        })
        .catch(err =>  {
            // console.log("Error: ", err);
        });
}
create_channel_button.onclick = create_channel;

// Button that closes the new channel form (incase you misclick)
const close_new_channel_form_button = document.getElementById("close-new-channel-form-button");
let close_new_channel_form = () => {
    const new_channel_bubble = document.getElementById("new-channel-bubble");
    new_channel_bubble.style.display = "none";
    const channel_screen = document.getElementById("channel-screen");
    channel_screen.style.display = "flex";
}
close_new_channel_form_button.onclick = close_new_channel_form;

// Helper function that finds details about a user
const get_user_details = (user_id_arg) => {
    return fetch(url + "/user/" + user_id_arg, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'userId': user_id_arg
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
            // console.log('Success:', data);
            let data_dict = {
                "name": data["name"],
                "email": data["email"],
                "bio": data["bio"],
                "image": data["image"]
            };
            return data_dict;
        })
        .catch(err => {
            // console.log("Error: ", err);
        });
    
}

// Helper function that finds details about a channel
const get_channel_details = (channel_id) => {
    return fetch(url + "/channel/" + channel_id, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'channelId': channel_id
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
            // console.log('Success:', data);
            let data_dict = {
                "name": data["name"],
                "creator": data["creator"],
                "private": data["private"],
                "description": data["description"],
                "createdAt": data["createdAt"],
                "members": data["members"]
            };
            return data_dict;
        })
        .catch(err => {
            // console.log("Error: ", err);
        });
}

// Helper function that finds lists of channels
const get_channels = () => {
    return fetch(url + "/channel", {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
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
            // console.log('Success:', data);
        })
        .catch(err => {
            // console.log("Error: ", err);
        })
}

//********************************************************************/
//**                         Milestone 3                            **/
//********************************************************************/
// Function that displays channel messages
//! This function is too phat --> break it up into smaller functions
let current_page_index = 0;
let pages_array = [];
const display_channel_msgs = (channel_id) => {
    
    let channel_messages = document.getElementById("channel-messages");
    //! Kill all children heehaw
    while (channel_messages.firstChild) {
        channel_messages.removeChild(channel_messages.lastChild);
    }

    //* Pagination happens here
    // To do pagination you need the number of *total* msgs
    
    let num_msgs_on_page = 25;
    let msg_index = 0;
    let num_pages = 0;

    // get channel_messages

    // Pages array will be an array of HTML elements
    pages_array = [];
    while (num_msgs_on_page == 25) {
        fetch(url + "/message/" + channel_id, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
                'channelId': channel_id,
                'start': msg_index
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
                // console.log('Success:', data);

                // Keep track how many messages on page
                num_msgs_on_page = data["messages"].length;
                
                // Create a page
                let msg_page = document.createElement('div');
                msg_page.className = "msg-page";

                // Load in the messages
                //? Note: The msgs come from most recent to earliest so you would want
                //?       the last msgs to be appended first
                for (var msg in ImmuteableList.copyOf(data["messages"]).reverse()) {
                    load_msg_bubble_onto_page(msg_page, msg);
                }

                //? Note: Since the most recent msgs come first
                //?       --> Display first page ONLY (flex)
                if (num_pages > 0) {
                    msg_page.style.display = "none";
                } else {
                    msg_page.style.display = "flex";
                }

                // Push the page reference into the pages_array
                pages_array.push(msg_page);

                // msg_page becomes a child of channel_messages
                channel_messages.appendChild(msg_page);
            })
            .catch(err => {
                console.log('Error:', err);
            });
        
        msg_index += 25;
        num_pages++;
    }

    //! Make it view from the bottom

    // Link to pagination navigator
    current_page_index = 0;
    // Update page indicator in navi
    document.getElementById("page-indicator").textContent = "Page " + String(current_page_index + 1) + " of " + String(num_pages);
    // Toggle buttons
    document.getElementById("more-recent-button").setAttribute("disabled", "");
    document.getElementById("more-recent-button").removeAttribute("enabled");

    if (num_pages == 1) { 
        document.getElementById("earlier-button").setAttribute("disabled", "");
        document.getElementById("earlier-button").removeAttribute("enabled");
    } else {
        document.getElementById("earlier-button").setAttribute("enabled", "");
        document.getElementById("earlier-button").removeAttribute("disabled");
    }
}

// Function to display a different page
const display_new_page = (new_index) => {
    
    if (new_index < num_pages - 1) {
        pages_array[new_index + 1].style.display = "none";
    }
    if (new_index > 0) {
        pages_array[new_index - 1].style.display = "none";
    }
    pages_array[new_index].style.display = "flex";

    //! Make it view from the bottom

    // Update page indicator in navi
    document.getElementById("page-indicator").textContent = "Page " + String(num_pages - new_index) + " of " + String(num_pages);

    // Disable/Enable buttons
    if (new_index == 0) { 
        document.getElementById("earlier-button").setAttribute("disabled", "");
        document.getElementById("earlier-button").removeAttribute("enabled");
    } else {
        document.getElementById("earlier-button").setAttribute("enabled", "");
        document.getElementById("earlier-button").removeAttribute("disabled");
    }

    if (new_index == num_pages - 1) {
        document.getElementById("more-recent-button").setAttribute("disabled", "");
        document.getElementById("more-recent-button").removeAttribute("enabled");
    } else {
        document.getElementById("more-recent-button").setAttribute("enabled", "");
        document.getElementById("more-recent-button").removeAttribute("disabled");
    }
}
document.getElementById("earlier-button").onclick = display_new_page(current_page_index + 1);
document.getElementById("more-recent-button").onclick = display_new_page(current_page_index - 1);


// Helper boolean if date is today
const is_today = (date) => {
    let rn = new Date();
    return rn.toDateString() === date.toDateString();
}

// Helper boolean if date is yesterday
const is_yesterday = (date) => {
    let yes = new Date();
    yes.setDate(yes.getDate() - 1);
    return yes.toDateString() === date.toDateString();
}

// Function that sends messages 
const send_message = (channel_id) => {

    let msg = document.createElementById("message-box").value;

    // String only contains whitespace
    if (msg.replace(/\s/g, '').length == 0) {
        // Pull a messenger and just empty the textbox
        document.getElementById("message-box").value = "";
        return;
    }

    let data = {
        "message": msg,
        "image": "" //! Do smth about this later
    }

    // Clear the textbox when sending
    document.getElementById("message-box").value = "";

    fetch(url + /message/ + channel_id, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'channelId': channel_id
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
            // This data variable literally contains nothing so
            // just redisplay the entire channel messages
            display_channel_msgs(channel_id);
        })
        .catch(err => {
            console.log("Error:", err);
        });
}

// Function that delete messages
//! This function has to be binded to a button in load_msg_bubble_onto_page
const delete_message = (channel_id, msg_id) => {
    fetch(url + "/messages/" + channel_id + "/" + msg_id, {
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'channelId': channel_id,
            'messageId': msg_id
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(`Error: ${res.status}`);
            }
        })
        .then (data => {
            console.log('Success:', data);
            // This data variable contains nothing
            // just redisplay the entire channel messages
            display_channel_msgs(channel_id);
        })
        .catch(err => {
            console.log('Error:', err);
        })
}

// Function that updates messages
//! This function has to be binded to a button in load_msg_bubble_onto_page
//! 
const update_message = (channel_id, msg_id) => {
    


    //! Need to be able to read in edited msg/image
    let data = {
        'message': new_message,
        'image': new_image
    }

    fetch(url + "/messages/" + channel_id + "/" + msg_id, {
        method: "PUT",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'channelId': channel_id,
            'messageId': msg_id
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
            // This data variable contains nothing
            // just redisplay the entire channel messages
            display_channel_msgs(channel_id);
        })
        .catch(err => {
            console.log('Error:', err);
        });
}

// Helper function that loads msg bubble onto page
const load_msg_bubble_onto_page = (msg_page, msg) => {
    
    // Each message bubble contains ...
    let msg_bubble = document.createElement("div");
    msg_bubble.id = msg["id"];
    msg_bubble.className = "msg-bubble";
    msg_bubble.style.display = "flex";
    
    // SIDENOTE - break into 3 parts:
    //      1. Msg details
    //      2. Msg itself
    //      3. Reacts

    let msg_details = document.createElement("div");

    //! Peg on dp first to msg_details

    // Sender's name
    let sender_name = document.createElement("h5");
    sender_name.className = "sender-name";
    get_user_details(msg["sender"]).then((inner_data) => {
        sender_name.textContent = inner_data["name"];
    });
    msg_details.appendChild(sender_name);

    // Sent time
    let sent_time = document.createElement("h6");
    sent_time.className = "sent-time";
    let date_time = new Date(msg["sentAt"]);
    // If sent on same day or yesterday --> show time
    // Else just show date
    if (is_today(date_time)) {
        sent_time.textContent = "Today at " + ("0" + date_time.getHours()).slice(-2) + ":" + ("0" + date_time.getMinutes()).slice(-2);
    } else if (is_yesterday(date_time)) {
        sent_time.textContent = "Yesterday at " + ("0" + date_time.getHours()).slice(-2) + ":" + ("0" + date_time.getMinutes()).slice(-2);
    } else {
        sent_time.textContent = ("0" + date_time.getDate()).slice(-2) + "/" + ("0" + (date_time.getMonth() + 1)).slice(-2) + "/" + date_time.getFullYear();
    }
    // Edited time --> Just peg it on the end of sent_time
    if (msg["edited"]) {
        let line_break = document.createElement("br");
        msg_details.appendChild(line_break);
        let edit_time = new Date(date["editedAt"]);
        sent_time.textContent += ", edited " + ("0" + edit_time.getHours()).slice(-2) + ":" + ("0" + edit_time.getMinutes()).slice(-2) + " " + ("0" + edit_time.getDate()).slice(-2) + "/" + ("0" + (edit_time.getMonth() + 1)).slice(-2) + "/" + edit_time.getFullYear();
    }
    msg_details.appendChild(sent_time);
    msg_bubble.appendChild(msg_details);

    // The message itself
    let msg_itself = document.createElement("p");
    msg_itself.id = "msg text of " + msg["id"];
    msg_itself.textContent = msg["message"];
    msg_bubble.appendChild(msg_itself);

    //! Implement a popup that appears when you press on message (toggle)
    //! Popup includes buttons to:
    //!     1. Edit (if you're the sender)
    //!     2. Delete (if you're the sender)
    //!     3. React x 3

    /*
    // Reactions
    //! This part's time complexity is scuffed
    //! so just comment it out when testing other stuff
    let msg_reactions = document.createElement("div");

    let string_reaction_bubble = document.createElement("div");

    string_reaction_bubble.className = "string-reaction-bubble";
    //! Insert emoji icon for bubble
    let string_reaction_popup = document.createElement("span");
    string_reaction_popup.textContent = "No reacts";

    let boolean_reaction_bubble = document.createElement("div");
    //! Insert emoji icon for bubble
    boolean_reaction_bubble.className = "boolean-reaction-bubble";
    let boolean_reaction_popup = document.createElement("span");
    boolean_reaction_popup.textContent = "No reacts";

    let number_reaction_bubble = document.createElement("div");
    //! Insert emoji icon for bubble
    number_reaction_bubble.className = "number-reaction-bubble";
    let number_reaction_popup = document.createElement("span");
    number_reaction_popup.textContent = "No reacts";

    let react_string_counter = 0;
    let react_boolean_counter = 0;
    let react_number_counter = 0;

    for (var reaction of msg["react"]) {
        
        // get the name of the reactor
        var reactorUserName;
        get_user_details(reaction["user"]).then((inner_data) => {
            reactorUserName = inner_data["name"];
        });

        if (reaction["react"] === "string") {
            if (react_string_counter == 0) {
                string_reaction_popup.textContent = reactorUserName;
            } else if (react_string_counter == 1) {
                string_reaction_popup.textContent = reactorUserName + " and " + string_reaction_popup.textContent;
            } else {
                string_reaction_popup.textContent = reactorUserName + ", " + string_reaction_popup.textContent;
            }
            react_string_counter++;
        }
        if (reaction["react"] === "boolean") {
            if (react_boolean_counter == 0) {
                boolean_reaction_popup.textContent = reactorUserName;
            } else if (react_boolean_counter == 1) {
                boolean_reaction_popup.textContent = reactorUserName + " and " + boolean_reaction_popup.textContent;
            } else {
                boolean_reaction_popup.textContent = reactorUserName + ", " + boolean_reaction_popup.textContent;
            }
            react_boolean_counter++;
        }
        if (reaction["react"] === "number") {
            if (react_number_counter == 0) {
                number_reaction_popup.textContent = reactorUserName;
            } else if (react_number_counter == 1) {
                number_reaction_popup.textContent = reactorUserName + " and " + number_reaction_popup.textContent;
            } else {
                number_reaction_popup.textContent = reactorUserName + ", " + number_reaction_popup.textContent;
            }
            react_number_counter++;
        }
    }

    let string_reaction_count = document.createElement("h6");
    string_reaction_count.textContent = String(react_string_counter);
    string_reaction_bubble.appendChild(string_reaction_count);
    string_reaction_bubble.appendChild(string_reaction_popup);

    let boolean_reaction_count = document.createElement("h6");
    boolean_reaction_count.textContent = String(react_boolean_counter);
    boolean_reaction_bubble.appendChild(boolean_reaction_count);
    boolean_reaction_bubble.appendChild(boolean_reaction_popup);
    
    let number_reaction_count = document.createElement("h6");
    number_reaction_count.textContent = String(react_number_counter);
    number_reaction_bubble.appendChild(number_reaction_count);
    number_reaction_bubble.appendChild(number_reaction_popup);

    msg_reactions.appendChild(string_reaction_bubble);
    msg_reactions.appendChild(boolean_reaction_bubble);
    msg_reactions.appendChild(number_reaction_bubble);

    msg_bubble.appendChild(msg_reactions);

    msg_page.appendChild(msg_bubble);
    */

    msg_page.appendChild(msg_bubble);
}