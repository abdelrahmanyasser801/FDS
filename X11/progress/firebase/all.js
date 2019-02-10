var sign;
function comment(name, email, phone, message) {
    var name = document.forms["myForm"]["name"].value;
    var phone = document.forms["myForm"]["phone"].value;
    var email = document.forms["myForm"]["email"].value;
    var message = document.forms["myForm"]["message"].value;
    firebase.database().ref('comments/' + makeid() + '/personal info/').set({
        name: name,
        message: message,
        phone: phone,
        email: email

    });
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 28; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function regMulOrder(sname, saddress, sphone, rname, raddress, rphone, obj, wgt) {
    var sname = document.forms["myForm"]["sname"].value;
    var saddress = document.forms["myForm"]["saddress"].value;
    var sphone = document.forms["myForm"]["sphone"].value;
    var rname = document.forms["myForm"]["rname"].value;
    var raddress = document.forms["myForm"]["raddress"].value;
    var rphone = document.forms["myForm"]["rphone"].value;
    var object = document.forms["myForm"]["obj"].value;
    var wgt = document.forms["myForm"]["wgt"].value;
    firebase.database().ref('orders/wait/registered/multi/' + makeid() + '/').set({
        sname: sname,
        saddress: saddress,
        sphone: sphone,
        rname: rname,
        raddress: raddress,
        rphone: rphone,
        object: object,
        wgt: wgt

    });
    alert('Done');
}

function regSingleOrder(sname, saddress, sphone, rname, raddress, rphone, obj, wgt) {
    var sname = document.forms["myForm"]["sname"].value;
    var saddress = document.forms["myForm"]["saddress"].value;
    var sphone = document.forms["myForm"]["sphone"].value;
    var rname = document.forms["myForm"]["rname"].value;
    var raddress = document.forms["myForm"]["raddress"].value;
    var rphone = document.forms["myForm"]["rphone"].value;
    var object = document.forms["myForm"]["obj"].value;
    var wgt = document.forms["myForm"]["wgt"].value;

    firebase.database().ref('orders/wait/registered/single/' + makeid() + '/').set({
        sname: sname,
        saddress: saddress,
        sphone: sphone,
        rname: rname,
        raddress: raddress,
        rphone: rphone,
        object: object,
        wgt: wgt

    });
    alert('Done');
}

function unregMulOreder(sname, saddress, sphone, rname, raddress, rphone, obj, wgt) {
    var sname = document.forms["myForm"]["sname"].value;
    var saddress = document.forms["myForm"]["saddress"].value;
    var sphone = document.forms["myForm"]["sphone"].value;
    var rname = document.forms["myForm"]["rname"].value;
    var raddress = document.forms["myForm"]["raddress"].value;
    var rphone = document.forms["myForm"]["rphone"].value;
    var object = document.forms["myForm"]["obj"].value;
    var wgt = document.forms["myForm"]["wgt"].value;
    firebase.database().ref('orders/wait/unregistered/multi/' + makeid() + '/').set({
        sname: sname,
        saddress: saddress,
        sphone: sphone,
        rname: rname,
        raddress: raddress,
        rphone: rphone,
        object: object,
        wgt: wgt

    });
    alert('Done');
}

function unregSingleOrder(sname, saddress, sphone, rname, raddress, rphone, obj, wgt) {
    var sname = document.forms["myForm"]["sname"].value;
    var saddress = document.forms["myForm"]["saddress"].value;
    var sphone = document.forms["myForm"]["sphone"].value;
    var rname = document.forms["myForm"]["rname"].value;
    var raddress = document.forms["myForm"]["raddress"].value;
    var rphone = document.forms["myForm"]["rphone"].value;
    var object = document.forms["myForm"]["obj"].value;
    var wgt = document.forms["myForm"]["wgt"].value;
    firebase.database().ref('orders/wait/unregistered/single/' + makeid() + '/').set({
        sname: sname,
        saddress: saddress,
        sphone: sphone,
        rname: rname,
        raddress: raddress,
        rphone: rphone,
        object: object,
        wgt: wgt

    });
    alert('Done');
}

document.getElementById("signup").addEventListener("click", signup);
function signup() {
    var em = document.getElementById("signupemail").value;
    var p = document.getElementById("signuppassword").value;
    // var url = "https://translate.google.com/";
    // alert(em + " : " + p);

    firebase.auth().createUserWithEmailAndPassword(em, p).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert(errorMessage); sign = true;
        } else if (errorCode == 'auth/email-already-in-use') {
            alert(errorMessage); sign = true;
        } else if (errorCode == 'auth/invalid-email') {
            alert(errorMessage); sign = true;
        } else if (errorCode == 'auth/operation-not-allowed') {
            alert(errorMessage); sign = true;
        } else {
            alert(errorCode);
        }
    });
    setTimeout(function () {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                successRedirect("signup", sign);
            }
        });
    }, 5000);

}

//document.getElementById("login").addEventListener("click", login);
function login() {
    var em = document.getElementById("logemail").value;
    var p = document.getElementById("logpassword").value;
    // alert(em + " : " + p);
    firebase.auth().signInWithEmailAndPassword(em, p).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
            alert(errorMessage);
            sign = true;
        } else if (errorCode === 'auth/user-not-found') {
            alert(errorMessage);
            sign = true;
        } else if (errorCode === 'auth/user-disabled') {
            alert(errorMessage);
            sign = true;
        } else if (errorCode === 'auth/invalid-email') {
            alert(errorMessage);
            sign = true;
        } else {
            alert(errorCode + " : " + errorMessage);
        }
    });
    setTimeout(function () {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                successRedirect("login", sign);
            }
        });
    }, 5000);

}

function successRedirect(type, mark) {
    if (type == "signup" && mark == undefined) {
        var address = document.getElementById("address").value;
        var fname = document.getElementById("fname").value;
        var lname = document.getElementById("lname").value;
        var phoneNumber = document.getElementById("phone").value;
        var email = document.getElementById("signupemail").value;
        var password = document.getElementById("signuppassword").value;
        var appVerifier = window.recaptchaVerifier;

        firebase.database().ref('user/' + makeid() + '/personalInfo/').set({
            address: address, fname: fname, lname: lname, phone: phoneNumber, email: email, password: password
        });
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
            }).catch(function (error) {
                // Error; SMS not sent
                alert(error.message);
                // ...
            });
        setTimeout(function () { window.location.href = 'https://waslnyangaz.firebaseapp.com/single-order.html'; }, 3000);

    } else if (type == "signup" && mark != undefined) {
        window.location.href = 'https://waslnyangaz.firebaseapp.com/signup.html';
    } else if (type == "login" && mark == undefined) {
        window.location.href = 'https://waslnyangaz.firebaseapp.com/single-order.html';
    } else if (type == "login" && mark != undefined) {
        window.location.href = 'https://waslnyangaz.firebaseapp.com/login.html';
    }
}


function signout() {
    firebase.auth().signOut().then(function () {
        console.log('Signed Out');
    }, function (error) {
        console.error('Sign Out Error', error);
    });
}

function redir(wow) {
    var url = "/service.html";
    alert(url)
    alert("redirect0:window.location.pathname=")
    document.write("Redirecting to the url in 50 seconds...");
    setTimeout(function () {
        window.location.pathname = url;
    }, 50000);
    alert("redirect1:window.location.pathname=")

}




/* 
if (signal == true) {
        markSign = true;
        redir(markSign)
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                window.location.href = 'un-index.html'; //After successful login, user will be redirected to home.html
            }
        });
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                window.location.href = '/un-index.html'; //After successful login, user will be redirected to home.html
            }
        });
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                window.location.href = 'https://waslnyangaz.firebaseapp.com/un-index.html'; //After successful login, user will be redirected to home.html
            }
        });
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                window.location.assign('un-index.html') //After successful login, user will be redirected to home.html
            }
        });
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                window.location.assign('/un-index.html') //After successful login, user will be redirected to home.html
            }
        });
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                window.location.assign('https://waslnyangaz.firebaseapp.com/un-index.html') //After successful login, user will be redirected to home.html
            }
        });
        window.location.href = 'un-index.html'; //After successful login, user will be redirected to home.html
        window.location.href = '/un-index.html'; //After successful login, user will be redirected to home.html
        window.location.href = 'https://waslnyangaz.firebaseapp.com/un-index.html'; //After successful login, user will be redirected to home.html
        window.location.assign('un-index.html') //After successful login, user will be redirected to home.html
        window.location.assign('/un-index.html') //After successful login, user will be redirected to home.html
        window.location.assign('https://waslnyangaz.firebaseapp.com/un-index.html') //After successful login, user will be redirected to home.html

    }

    else {
        console.log("Error")
    }

     var url = 'https://waslnyangaz.firebaseapp.com/un-index.html';
    alert(url)
    alert("redirect0:window.location.pathname=")
    document.write("Redirecting to the url in 50 seconds...");
        alert("onuse")
         location= url;

    alert("redirect1:window.location.pathname=")
*/


/*function signin(e, pass, callback) {
    var email = document.getElementById('e').value;
    var password = document.getElementById('pass').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            //var errorMessage = error.message;
            if (errorCode == 'auth/wrong-password') {
                alert('Wrong password.');
            } else if (errorCode == 'auth/invalid-credential') {
                alert('auth/invalid-credential.');
            } else if (errorCode == 'auth/user-disabled') {
                alert('auth/user-disabled.');
            } else if (errorCode == 'auth/user-not-found') {
                alert('auth/user-not-found.');
            } else {
                callback(e);
            }
        });
} */

/*document.getElementById("login-btn").addEventListener("click", function(){
    var email = document.getElementById('e').value;
    var password = document.getElementById('pass').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            //var errorMessage = error.message;
            if (errorCode == 'auth/wrong-password') {
                alert('Wrong password.');
            } else if (errorCode == 'auth/invalid-credential') {
                alert('auth/invalid-credential.');
            } else if (errorCode == 'auth/user-disabled') {
                alert('auth/user-disabled.');
            } else if (errorCode == 'auth/user-not-found') {
                alert('auth/user-not-found.');
            } else {
                document.write("Redirecting to the url in 3 seconds...");
                setTimeout(function () {
                    window.location.pathname = "/service.html";
                }, 3000);
            }
        });
}); */

/*function signup(address, fname, lname, phone, email, password, callback) {
    var address = document.forms["myForm"]["address"].value;
    var fname = document.forms["myForm"]["fname"].value;
    var lname = document.forms["myForm"]["lname"].value;
    var phone = document.forms["myForm"]["phone"].value;
    var email = document.forms["myForm"]["email"].value;
    var password = document.forms["myForm"]["password"].value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');

            } else if (errorCode == 'auth/email-already-in-use') {
                alert('email exists');
            } else if (errorCode == 'auth/invalid-email') {
                alert('auth/invalid-email');
            } else if (errorCode == 'auth/operation-not-allowed') {
                alert('auth/operation-not-allowed');
            } else {
                firebase.database().ref('user/' + makeid() + '/personalInfo/').set({
                    address: address,
                    fname: fname,
                    lname: lname,
                    phone: phone,
                    email: email
                });
                callback(address);
            }
        });
}
 */
