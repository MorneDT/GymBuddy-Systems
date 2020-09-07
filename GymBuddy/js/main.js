function getUserInfo(open_id) {

    var user = JSON.parse(localStorage.getItem('user'));
    switch (open_id) {
        case 'profile': {
            $('#profile #fullname')[0].innerHTML = user.fullName;
        }
        default:
            break;
    }
}

function toggle(open_id) {
    console.log(open_id);
    switch (open_id) {
        case 'profile': {
            var profile = document.getElementById('profile');
            getUserInfo(open_id);
            profile.classList.toggle('active');
            break;
        }
        case 'growth': {
            var growth = document.getElementById('growth');
            growth.classList.toggle('active');
            break;
        }
        case 'settings': {
            var settings = document.getElementById('settings');
            settings.classList.toggle('active');
            break;
        }
        default:
            break;
    }
}

var $page = $('.page');
$('.menu_toggle').on('click', function () {
    $page.toggleClass('real');
});
$('.content').on('click', function () {
    $page.removeClass('real');
});

function validation() {
    var SignUp = document.getElementById("SignUp");
    var email = document.getElementById("email").value;
    var text = document.getElementById("text");
    var pattern = /^[^]+@[^]+\.[a-z]{2,3}$/;

    if (email.match(pattern)) {
        SignUp.classList.add("valid");
        SignUp.classList.remove("invalid");
        text.innerHTML = "";
    }
    else {
        SignUp.classList.remove("valid");
        SignUp.classList.add("invalid");
        text.innerHTML = "Please Enter a Valid Email Address";
        text.style.color = "#FD063C";
    }
    if (email == "") {
        SignUp.classList.remove("valid");
        SignUp.classList.remove("invalid");
        text.innerHTML = "";
    }
}

function login() {
    var myloginForm = document.getElementById("Login");
    var user = myloginForm.elements["email"].value;
    var pass = myloginForm.elements["password"].value;

    loginRequest(user, pass, "userpage.html");
}
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    var current = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
    current = current + "/GymBuddy/index.html";
    window.location.assign(current);
}

function register() {
    var myregisterForm = document.getElementById("SignUp");
    var username = myregisterForm.elements["email"].value;
    var password = myregisterForm.elements["password"].value;
    var name = myregisterForm.elements["name"].value;
    var surname = myregisterForm.elements["surname"].value;

    registerRequest(username, password, name, surname, "userpage.html");
}

