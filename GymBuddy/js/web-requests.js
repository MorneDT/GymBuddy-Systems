var baseURL = 'http://localhost:5000/api';

function loginRequest(username, password, goToPage) {
    request = new XMLHttpRequest();
    var jsonstring = {"Username": username, "Password": password};

    $.ajax({
        url: baseURL + '/auth/login',
        type: 'POST',
        data: JSON.stringify(jsonstring),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success:function(res){
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.userToReturn));
            //console.log(JSON.stringify(res.userToReturn));
            //alert("welcome");
            var current = window.location.protocol + "//"+ window.location.hostname + ":" + window.location.port;
            current = current +"/GymBuddy/" + goToPage;
            //console.log("current", current);
            window.location.assign(current);
            
        },
        error:function(res){
            alert("Email Or username Invalid " + res.statusText);
        }
    });
}

function registerRequest(username, password, name, surname, goToPage) {
    request = new XMLHttpRequest();
    var jsonstring = {
        "EmailAddress": username, 
        "Password": password,
        "Name": name,
        "Surname": surname,
        "DateOfBirth": new Date()
    };

    $.ajax({
        url: baseURL + '/auth/register',
        type: 'POST',
        data: JSON.stringify(jsonstring),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success:function(res){
            var current = window.location.protocol + "//"+ window.location.hostname + ":" + window.location.port;
            current = current +"/GymBuddy/" + goToPage;
            console.log("current", current);
            window.location.assign(current);
            alert("Welcome!");
        },
        error:function(res){
            alert("Bad things happend! " + res.statusText);
        }
    });
}