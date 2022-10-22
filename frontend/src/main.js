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

// // Bind ENTER key to login
// login_form.addEventListener('keydown', (event) => {
//     if (event.keyCode === 13) {
//         submit_login();
//     }
// });

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
signup_name.addEventListener('change', signup_name_handler);
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
    // // Unbind ENTER key for login
    // let old_login_form = document.getElementById("login_form");
    // let new_login_form = old_login_form.cloneNode(true);
    // old_login_form.parentNode.replaceChild(new_login_form, old_login_form);
    // login_form = document.forms.login_form;
    // // Bind ENTER key for signup
    // signup_form.addEventListener('keydown', (event) => {
    //     if (event.keyCode === 13) {
    //         signout_function();
    //     }
    // });
    new_login_form.reset();
}
const signup_hyperlink = document.getElementById("signup-hyperlink");
signup_hyperlink.addEventListener("click", display_signup);

// Display the login page
const display_login = () => {
    const signup_bubble = document.getElementById("signup-bubble");
    signup_bubble.style.display = "none";
    const login_bubble = document.getElementById("login-bubble");
    login_bubble.style.display = "block";
    // // Unbind ENTER key for signup
    // let old_signup_form = document.getElementById("signup_form");
    // let new_signup_form = new_signup_form.cloneNode(true);
    // old_signup_form.parentNode.replaceChild(new_signup_form, old_signup_form);
    // signup_form = documents.forms.signup_form;
    // // Bind ENTER key for login
    // login_form.addEventListener('keydown', (event) => {
    //     if (event.keyCode === 13) {
    //         submit_login();
    //     }
    // });    
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

// These functions are related to Milestone 3 but milestone 2 uses them
let view_pinned_only = false;
// Function that updates the view_pinned_only_button
const update_view_pinned_only_button = () => {
    let view_pinned_only_button = document.getElementById("view-pinned-only-button");
    if (view_pinned_only) { 
        view_pinned_only_button.className = "view-pinned-only-on";
        view_pinned_only_button.textContent = view_pinned_only_button.textContent.replace("OFF", "ON");
    } else {
        view_pinned_only_button.className = "view-pinned-only-off";
        view_pinned_only_button.textContent= view_pinned_only_button.textContent.replace("ON", "OFF");
    }
}

// Function that changes the view_pinned_only_variable
let toggle_view_pinned_only = (channel_id) => {
    view_pinned_only = !view_pinned_only;
    update_view_pinned_only_button();
    display_channel_msgs(channel_id, view_pinned_only);
}

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
            // Kill all children of wrapper and tabs first
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
                    channel_name.className = "channel-name";
                    channel_name.textContent = channel["name"];
                    channel_heading.appendChild(channel_name);
                    // Show channel details (that's not desc)
                    // Priv?
                    let channel_details = document.createElement("i");
                    channel_details.textContent = channel["private"] ? "Private" : "Public";
                    channel_details.textContent = channel_details.textContent + " channel - Created ";
                    let channel_desc = document.createElement("p");
                    channel_desc.className = "channel-desc";
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
                    // console.log("tab_label's id: ", tab_label.id);
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
    // Remove ENTER key send bind
    let old_message_box = document.getElementById("message-box");
    let new_message_box = old_message_box.cloneNode(true);
    old_message_box.parentNode.replaceChild(new_message_box, old_message_box);
}

// Opening the channel
let open_channel = (channel_id) => {
    
    // If new channel form is open, close it
    let new_channel_bubble = document.getElementById("new-channel-bubble");
    new_channel_bubble.style.display = "none";

    console.log("open_channel be opening: ", channel_id);

    let channel_heading_wrapper = document.getElementById('channel-heading-wrapper');
    for (var channel_heading of channel_heading_wrapper.children) {
        channel_heading.style.display = channel_heading.id == ("channel-heading-for-" + channel_id) ? "inline-block" : "none";
        
    }
    // To make tab pressed
    let channel_tabs_wrapper = document.getElementById('channel-tabs-wrapper');
    // console.log("Tabs LOOP!!");
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

    // Milestone 3 - Viewing pinned msgs only
    view_pinned_only = false;
    update_view_pinned_only_button();
    let view_pinned_only_button = document.getElementById("view-pinned-only-button");
    view_pinned_only_button.onclick = (() => toggle_view_pinned_only(channel_id));

    // Milestone 3 - Display channel msgs
    display_channel_msgs(channel_id, view_pinned_only);

    // Milestone 3 - Update send button for this channel
    update_send_button(channel_id);

    // Milestone 3 - Clear the message box
    document.getElementById("message-box").value = "";

    // Bind ENTER key to send button
    // Remove old binds
    let old_message_box = document.getElementById("message-box");
    let new_message_box = old_message_box.cloneNode(true);
    old_message_box.parentNode.replaceChild(new_message_box, old_message_box);
    // Chuck in new bind
    new_message_box.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
            send_message(channel_id);
        }
    });

    const channel_screen = document.getElementById("channel-screen");
    channel_screen.style.display = "flex";
}

// Tab that displays a create channel bubble
const new_channel_tab = document.getElementById("create-channel-tab");
const display_new_channel_form = () => {
    // Unpress the tabs
    let channel_tabs_wrapper = document.getElementById('channel-tabs-wrapper');
    // console.log("Tabs LOOP!!");
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
    
    //! Stop them from creating a channel with no name
    //! Or a name that has already been taken ooooh

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

// Some message global variables xd
let current_page_index = 0;
let pages_array = [];
let num_pages = 0;
let msg_bubbles_list = [];

// Function that displays channel messages
const display_channel_msgs = (channel_id, view_pinned_only) => {
    
    let channel_messages = document.getElementById("channel-messages");
    // Kill all children heehaw
    while (channel_messages.firstChild) {
        channel_messages.removeChild(channel_messages.lastChild);
    }

    //* Pagination happens here
    // To do pagination you need the number of *total* msgs

    // Pages array will be an array of HTML elements
    pages_array = [];
    num_pages = 0;

    current_page_index = 0;

    // Putting fetch in a while loop is death
    // So I used recursion instead
    
    if (view_pinned_only) {
        msg_bubbles_list = [];
        display_pinned_msgs_only_recursion(channel_id, 0);
    } else {
        generate_msg_pages_recursion(channel_id, 0);
    }


    // // Making it view from the bottom
    // let channel_messages_screen = document.getElementById("channel-messages");
    // channel_messages_screen.scrollTop = channel_messages_screen.scrollHeight;

    // console.log("number of pages: " + num_pages);

}

// Function that updates the paginator
const update_paginator = () => {
    // console.log("Current page index: " + current_page_index);

    // Update page indicator in navi
    let page_indicator = document.getElementById("page-indicator");
    page_indicator.textContent = num_pages ? "Page " + String(current_page_index + 1) + " of " + String(num_pages): "Page " + String(0) + " of " + String(num_pages);
    
    // Toggle buttons
    if (current_page_index == 0) {
        document.getElementById("more-recent-button").setAttribute("disabled", "");
        document.getElementById("more-recent-button").removeAttribute("enabled");
    } else {
        document.getElementById("more-recent-button").setAttribute("enabled", "");
        document.getElementById("more-recent-button").removeAttribute("disabled");
    }
    
    if (num_pages <= 1 || current_page_index == num_pages - 1) { 
        document.getElementById("earlier-button").setAttribute("disabled", "");
        document.getElementById("earlier-button").removeAttribute("enabled");
    } else {
        document.getElementById("earlier-button").setAttribute("enabled", "");
        document.getElementById("earlier-button").removeAttribute("disabled");
    }
    
    // Special case if view_pinned_only is true
    if (view_pinned_only) {
        page_indicator.textContent = "Page 1 of 1";
        document.getElementById("earlier-button").setAttribute("disabled", "");
        document.getElementById("earlier-button").removeAttribute("enabled");
        document.getElementById("more-recent-button").setAttribute("disabled", "");
        document.getElementById("more-recent-button").removeAttribute("enabled");
    }
}

// Function that recursively generates a pinned messages on a SINGLE page
const display_pinned_msgs_only_recursion = (channel_id, msg_index) => {
    fetch(url + "/message/" + channel_id + "?" + new URLSearchParams({ 
        start: msg_index 
    }), {
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
            // Keep track how many messages the fetch caught
            let num_msgs_on_page = data["messages"].length;

            for (var msg of data['messages']) {
                if (msg['pinned']) {
                    msg_bubbles_list.push(create_message_bubble(channel_id, msg));
                }
            }
            
            // If there's more messages in future pages
            if (num_msgs_on_page == 25) {
                // Keep going
                display_pinned_msgs_only_recursion(channel_id, msg_index + 25);
            
            // Otherwise lets wrap it up
            } else {
                // Reverse the msg_bubbles_list
                msg_bubbles_list = msg_bubbles_list.reverse();

                // Create a page
                let msg_page = document.createElement('div');
                msg_page.className = "msg-page";

                // Now load it on a single page
                for (var msg_bubble of msg_bubbles_list) {
                    load_msg_bubble_onto_page(msg_bubble, msg_page);
                }

                msg_page.style.display = "flex";

                // Push the page reference into the pages_array
                pages_array.push(msg_page);

                // msg_page becomes a child of channel_messages
                let channel_messages = document.getElementById('channel-messages');
                channel_messages.appendChild(msg_page);

                update_paginator();

                // Making it view from the bottom
                let channel_messages_screen = document.getElementById("channel-messages");
                channel_messages_screen.scrollTop = channel_messages_screen.scrollHeight;
            }
        })
        .catch(err => {
            console.log('Error:', err);
        });
}

// Function that recursively generates a page of messages
const generate_msg_pages_recursion = (channel_id, msg_index) => {

    let channel_messages = document.getElementById('channel-messages');

    // console.log("Parameters check:", channel_id, msg_index);

    fetch(url + "/message/" + channel_id + "?" + new URLSearchParams({
        start: msg_index
    }), {
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
            
            // Keep track how many messages on page
            let num_msgs_on_page = data["messages"].length;
            
            // console.log('num_msgs_on_page:', num_msgs_on_page);
            
            // Create a page
            let msg_page = document.createElement('div');
            msg_page.className = "msg-page";

            // Load in the messages
            //? Note: The msgs come from most recent to earliest so you would want
            //?       the last msgs to be appended first
            let data_msgs_dup = data["messages"];

            // console.log("I made it here");

            // console.log(data_msgs_dup);
            for (var msg of data_msgs_dup.reverse()) {
                // console.log(msg);
                load_msg_bubble_onto_page(create_message_bubble(channel_id, msg), msg_page);
            }

            // console.log("I made it here x 2");


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

            // If no messages then should have 0 pages
            if (data["messages"].length) {
                num_pages++;
            }

            // Recursive case --> if there's 25 messages in the page
            if (num_msgs_on_page == 25) {
                generate_msg_pages_recursion(channel_id, msg_index + 25);
            } else {
                update_paginator();
            }
            
            // Making it view from the bottom
            let channel_messages_screen = document.getElementById("channel-messages");
            channel_messages_screen.scrollTop = channel_messages_screen.scrollHeight;
        })
        .catch(err => {
            console.log('Error:', err);
        });
}

// Function to display a different page
const display_new_page = (new_index) => {
    
    current_page_index = new_index;

    if (new_index < num_pages - 1) {
        pages_array[new_index + 1].style.display = "none";
    }
    if (new_index > 0) {
        pages_array[new_index - 1].style.display = "none";
    }
    pages_array[new_index].style.display = "flex";

    // Make it view from the bottom
    let channel_messages_screen = document.getElementById("channel-messages");
    channel_messages_screen.scrollTop = channel_messages_screen.scrollHeight;

    // Update page indicator in navi
    update_paginator();


    // console.log("Current page index: " + current_page_index);

    // // Disable/Enable buttons
    // if (current_page_index == 0) { 
    //     document.getElementById("earlier-button").setAttribute("disabled", "");
    //     document.getElementById("earlier-button").removeAttribute("enabled");
    // } else {
    //     document.getElementById("earlier-button").setAttribute("enabled", "");
    //     document.getElementById("earlier-button").removeAttribute("disabled");
    // }

    // if (current_page_index == num_pages - 1) {
    //     document.getElementById("more-recent-button").setAttribute("enabled", "");
    //     document.getElementById("more-recent-button").removeAttribute("disabled");
    // } else {
    //     document.getElementById("more-recent-button").setAttribute("disabled", "");
    //     document.getElementById("more-recent-button").removeAttribute("enabled");
    // }
}
document.getElementById("earlier-button").onclick = () => display_new_page(current_page_index + 1);
document.getElementById("more-recent-button").onclick = () => display_new_page(current_page_index - 1);


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
let send_button = document.getElementById("send-msg-button");
const send_message = (channel_id) => {

    let msg = document.getElementById("message-box").value;

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
            'Content-Type': 'application/json'
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
            display_channel_msgs(channel_id, view_pinned_only);
        })
        .catch(err => {
            console.log("Error:", err);
        });
}
// send_button.onclick = send_message(0);

// Function that updates which channel the send button sends messages to
const update_send_button = (channel_id) => {
    send_button.onclick = () => send_message(channel_id);
}


// Function that delete messages
const delete_message = (channel_id, msg_id) => {
    console.log('Deleting message ' + msg_id + " from channel " + channel_id);
    fetch(url + "/message/" + channel_id + "/" + msg_id, {
        method: "DELETE",
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
        .then (data => {
            console.log('Success:', data);
            // This data variable contains nothing
            // just redisplay the entire channel messages
            display_channel_msgs(channel_id, view_pinned_only);
        })
        .catch(err => {
            console.log('Error:', err);
        });
}

// Function that updates messages
const update_message = (channel_id, msg_id, new_msg, new_img) => {
    
    let data = {
        'message': new_msg,
        'image': new_img
    }
    
    fetch(url + "/message/" + channel_id + "/" + msg_id, {
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
            display_channel_msgs(channel_id, view_pinned_only);
        })
        .catch(err => {
            console.log('Error:', err);
        });
}

// Function that toggles whether messages are pinned or not
const toggle_pin = (channel_id, msg_id, pin_status) => {
    if (pin_status) {
        fetch(url + "/message/unpin/" + channel_id + "/" + msg_id, {
            method: "POST",
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
            .then (data => {
                console.log('Success:', data);
                // This data variable contains nothing
                // just redisplay the entire channel messages
                display_channel_msgs(channel_id, view_pinned_only);
                let pin_button = document.getElementById("pin-button-for-" + String(msg_id));
                pin_button.onclick = (() => toggle_pin(channel_id, msg_id, false));
            })
            .catch(err => {
                console.log('Error:', err);
            });
    } else {
        fetch(url + "/message/pin/" + channel_id + "/" + msg_id, {
            method: "POST",
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
            .then (data => {
                console.log('Success:', data);
                // This data variable contains nothing
                // just redisplay the entire channel messages
                display_channel_msgs(channel_id, view_pinned_only);
                let pin_button = document.getElementById("pin-button-for-" + String(msg_id));
                pin_button.onclick = (() => toggle_pin(channel_id, msg_id, true));

            })
            .catch(err => {
                console.log('Error:', err);
            });
    }
}

// Function that alters the message bubble so that
// you can type in the edited message
const display_edit_msg_menu = (channel_id, msg_id) => {
    // Change the p tag in msg_itself to a textarea
    let msg_itself = document.getElementById("msg text of " + String(msg_id));
    let edit_textbox = document.createElement("textarea");
    edit_textbox.className = "edit-textbox";
    let original_message = msg_itself.textContent;
    edit_textbox.value = msg_itself.textContent;
    msg_itself.parentNode.replaceChild(edit_textbox, msg_itself);
    edit_textbox.addEventListener('keydown', (event) => {
        if (event.keyCode === 13 || event.keyCode === 27) {
            let new_msg_itself = document.createElement('p');
            new_msg_itself.className = "msg-itself";
            new_msg_itself.id = "msg text of " + String(msg_id);
            new_msg_itself.textContent = event.keyCode === 13 ? edit_textbox.value : original_message;
            if (event.keyCode === 13) {
                update_message(channel_id, msg_id, new_msg_itself.textContent, "");
            } 
            edit_textbox.parentNode.replaceChild(new_msg_itself, edit_textbox);
            new_msg_itself.parentNode.removeChild(document.getElementById("edit-hyperlinks"));
        }
    });

    let edit_hyperlinks = document.createElement('div');
    edit_hyperlinks.id = "edit-hyperlinks";
    let save_link = document.createElement('a');
    save_link.className = "edit-links";
    save_link.id = "save-link-for-" + String(msg_id);
    save_link.href = "##";
    save_link.textContent = "save";
    let cancel_link = document.createElement('a');
    cancel_link.className = "edit-links";
    cancel_link.id = "cancel-link-for-" + String(msg_id);
    cancel_link.href = "###";
    cancel_link.textContent = "cancel";
    save_link.addEventListener('click', () => {
        let new_msg_itself = document.createElement('p');
        new_msg_itself.className = "msg-itself";
        new_msg_itself.id = "msg text of " + String(msg_id);
        new_msg_itself.textContent = edit_textbox.value;
        update_message(channel_id, msg_id, new_msg_itself.textContent, "");
        edit_textbox.parentNode.replaceChild(new_msg_itself, edit_textbox);
        new_msg_itself.parentNode.removeChild(document.getElementById("edit-hyperlinks"));
    });
    cancel_link.addEventListener('click', () => {
        let new_msg_itself = document.createElement('p');
        new_msg_itself.className = "msg-itself";
        new_msg_itself.id = "msg text of " + String(msg_id);
        new_msg_itself.textContent = original_message;
        edit_textbox.parentNode.replaceChild(new_msg_itself, edit_textbox);
        new_msg_itself.parentNode.removeChild(document.getElementById("edit-hyperlinks"));
    });
    let msg_bubble = document.getElementById(String(msg_id));
    let enter_to_ = document.createElement('pre');
    enter_to_.className = "edit-links";
    enter_to_.textContent = "enter to ";
    edit_hyperlinks.appendChild(enter_to_);
    edit_hyperlinks.appendChild(save_link);     //! Change this to insertBefore later
    let space = document.createElement('pre');
    space.className = "edit-links";
    space.textContent = " • ";
    edit_hyperlinks.appendChild(space);
    let escape_to_ = document.createElement('pre');
    escape_to_.className = "edit-links";
    escape_to_.textContent = "escape to ";
    edit_hyperlinks.appendChild(escape_to_);
    edit_hyperlinks.appendChild(cancel_link);   //! Change this to insertBefore later
    msg_bubble.appendChild(edit_hyperlinks);

}

// Function that reacts to a message
const react_to_msg = (channel_id, msg_id, reaction) => {
    let data = {
        'react': reaction
    };

    fetch(url + "/message/react/" + channel_id + "/" + msg_id, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
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
        .then (data => {
            console.log('Success:', data);
            // This data variable contains nothing
            // just redisplay the entire channel messages
            display_channel_msgs(channel_id, view_pinned_only);
        })
        .catch (err => {
            console.log('Error:', err);
        })
}

// Function that unreacts to a message
const unreact_to_msg = (channel_id, msg_id, reaction) => {
    let data = {
        'react': reaction
    };

    fetch(url + "/message/unreact/" + channel_id + "/" + msg_id, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
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
        .then (data => {
            console.log('Success:', data);
            // This data variable contains nothing
            // just redisplay the entire channel messages
            display_channel_msgs(channel_id, view_pinned_only);
        })
        .catch (err => {
            console.log('Error:', err);
        })
}

// Helper function that creates msg bubble
const create_message_bubble = (channel_id, msg) => {
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
    msg_details.className = "msg-details";

    // Peg on dp first to msg_details
    let sender_dp = document.createElement("img");
    sender_dp.className = "sender-dp";
    sender_dp.style.height = "40px";

    // Sender's name
    let sender_name = document.createElement("h5");
    sender_name.className = "sender-name";
    // console.log(msg);
    // console.log(msg["sender"]);
    get_user_details(msg["sender"]).then((inner_data) => {
        sender_dp.src = inner_data["image"] ? inner_data["image"] : "./src/images/no_dp.svg";
        sender_name.textContent = inner_data["name"];
    });
    msg_details.appendChild(sender_dp);
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
        let edit_time = new Date(msg["editedAt"]);
        sent_time.textContent += ", edited " + ("0" + edit_time.getHours()).slice(-2) + ":" + ("0" + edit_time.getMinutes()).slice(-2) + " " + ("0" + edit_time.getDate()).slice(-2) + "/" + ("0" + (edit_time.getMonth() + 1)).slice(-2) + "/" + edit_time.getFullYear();
    }
    // Pinned status --> peg it on the end of the sent_time
    if (msg["pinned"]) {
        sent_time.textContent += ", pinned";
    }

    msg_details.appendChild(sent_time);
    msg_bubble.appendChild(msg_details);

    // The message itself
    let msg_itself = document.createElement("p");
    msg_itself.className = "msg-itself";
    msg_itself.id = "msg text of " + msg_bubble.id;
    msg_itself.textContent = msg["message"];
    msg_bubble.appendChild(msg_itself);

    //! Secret Edit menu

    //! Implement a popup that appears when you press on message (toggle)
    //! Popup includes buttons to:
    //      1. Pin --> Still need to view pinned msgs
    //      2. Edit (if you're the sender)
    //      3. Delete (if you're the sender)
    //!     4. React x 3 --> This will be in a separate popup

    let msg_utility_popup = document.createElement("span");
    msg_utility_popup.className = "msg-utility-popup";
    msg_utility_popup.id = "msg-utility-popup-for-" + msg_bubble.id;

    // Pin
    let pin_button = document.createElement("button");
    pin_button.className = "utility-button";
    pin_button.id = "pin-button-for-" + msg_bubble.id;
    let pin_icon = document.createElement("img");
    pin_icon.className = "utility-icon";
    pin_icon.src = "./src/images/pin-icon.svg";
    pin_button.appendChild(pin_icon);
    pin_button.onclick = (() => toggle_pin(channel_id, msg_bubble.id, msg["pinned"]));
    msg_utility_popup.appendChild(pin_button);

    // Edit
    let edit_button = document.createElement("button");
    edit_button.className = "utility-button";
    edit_button.id = "edit-button-for-" + msg_bubble.id;
    let edit_icon = document.createElement("img");
    edit_icon.className = "utility-icon";
    edit_icon.src = "./src/images/pencil-icon.svg";
    edit_button.appendChild(edit_icon);
    edit_button.onclick = (() => display_edit_msg_menu(channel_id, msg_bubble.id));
    msg_utility_popup.appendChild(edit_button);

    // Delete
    let delete_button = document.createElement("button");
    delete_button.className = "utility-button";
    delete_button.id = "delete-button-for-" + msg_bubble.id;
    let delete_icon = document.createElement("img");
    delete_icon.className = "utility-icon";
    delete_icon.src = "./src/images/delete-icon.svg";
    delete_button.appendChild(delete_icon);
    delete_button.onclick = (() => delete_message(channel_id, msg_bubble.id));
    msg_utility_popup.appendChild(delete_button);

    msg_bubble.appendChild(msg_utility_popup);
    // Animation things for popup to appear
    msg_bubble.addEventListener('mouseenter', () => {
        let popup = document.getElementById("msg-utility-popup-for-" + msg_bubble.id);
        popup.className = "msg-utility-popup-show";
    });
    msg_bubble.addEventListener('mouseleave', () => {
        let popup = document.getElementById("msg-utility-popup-for-" + msg_bubble.id);
        popup.className = "msg-utility-popup";
    });

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
   return msg_bubble;
}

// Helper function that loads msg bubble onto page
const load_msg_bubble_onto_page = (msg_bubble, msg_page) => {

    msg_page.appendChild(msg_bubble);
}