
var sign;
console.log(sign);

//document.getElementById("signup").addEventListener("click", signup);
//document.getElementById("login").addEventListener("click", login);



function login() {
    var em = document.getElementById("logemail").value;
    var p = document.getElementById("logpassword").value;
    alert(em + " : " + p);
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
        var name1 = document.getElementById("inname1").value;
        var name2 = document.getElementById("inname2").value;
        var email = document.getElementById("inemail").value;
        var password = document.getElementById("inpassword").value;
        alert(name1 + " : " + name2 + " : " + email + " : " + password)
        firebase.database().ref('user/' + makeid() + '/personalInfo/').set({
            fname: name1, lname: name2, email: email, password: password
        });
        setTimeout(function () { window.location.href = 'https://translate.google.com/'; }, 3000);
    } else if (type == "signup" && mark != undefined) {
        window.location.href = 'https://www.google.com.eg/';
    } else if (type == "login" && mark == undefined) {
        window.location.href = 'https://myegy.cc/';
    } else if (type == "login" && mark != undefined) {
        window.location.href = 'https://www.google.com.eg/';
    }
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 28; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}




var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
console.log(appVerifier);
document.getElementById("login").addEventListener("click", send);
function send() {
    var phoneNumber = document.getElementById("phone").value;
    console.log(phoneNumber);
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
        }).catch(function (error) {
            // Error; SMS not sent
            console.log("error");
            // ...
        });
}
document.getElementById("sub").addEventListener("click", ver);
function ver() {
    var code = document.getElementById("code").value;
    console.log(code);
    confirmationResult.confirm(code).then(function (result) {
        // User signed in successfully.
        var user = result.user;
        console.log('done');
        //signup();

        // ...
    }).catch(function (error) {
        // User couldn't sign in (bad verification code?)
        console.log('error');
    });
}

function signup() {
    var em = document.getElementById("signupemail").value;
    var p = document.getElementById("signuppassword").value;
    var url = "https://translate.google.com/";
    alert(em + " : " + p);
    firebase.auth().createUserWithEmailAndPassword(em, p).catch(function (error) {
        var errorCode = error.code;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.'); sign = true;
        } else if (errorCode == 'auth/email-already-in-use') {
            alert('email exists'); sign = true;
        } else if (errorCode == 'auth/invalid-email') {
            alert('auth/invalid-email'); sign = true;
        } else if (errorCode == 'auth/operation-not-allowed') {
            alert('auth/operation-not-allowed'); sign = true;
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












/**phooone***** */
/*        var errorCode = error.code;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.'); return;
        } else if (errorCode == 'auth/email-already-in-use') {
            alert('email exists');return;
        } else if (errorCode == 'auth/invalid-email') {
            alert('auth/invalid-email');return;
        } else if (errorCode == 'auth/operation-not-allowed') {
            alert('auth/operation-not-allowed');return;
        } else {
            alert(errorCode);
        }
        window.location.assign("https://www.google.com.eg/");
 */
/*var errorCode = error.code;
        alert(errorCode);
        switch (errorCode) {
            case 'auth/weak-password':
                url = "https://www.google.com.eg/";
                break;
            case "auth/email-already-in-use":
                url = "https://www.google.com.eg/";
                break;
            case "auth/invalid-email":
                url = "https://www.google.com.eg/";
                break;
            case "":
                url = "https://translate.google.com/";
                break;
            case " ":
                url = "https://translate.google.com/";
                break;
            default:
                url = "https://translate.google.com/";
        }
        alert(url);
        window.location.href = url;
         */
        /*var errorCode = error.code;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.'); 
            window.url = window.url.replace("translate.google.com", "www.google.com.eg");
        } else if (errorCode == 'auth/email-already-in-use') {
            alert('email exists'); 
           window.url = window.url.replace("translate.google.com", "www.google.com.eg");
        } else if (errorCode == 'auth/invalid-email') {
            alert('auth/invalid-email');
            window.url = window.url.replace("translate.google.com", "www.google.com.eg");
        } else if (errorCode == 'auth/operation-not-allowed') {
            alert('auth/operation-not-allowed'); 
            window.url = window.url.replace("translate.google.com", "www.google.com.eg");
        } else {
            alert(errorCode);
           // url="https://www.google.com.eg/";
        }
        window.location.assign(url);
        return;
         */
            /* if (window.location.href == "https://waslnyangaz.firebaseapp.com/" && sign==false){
         window.location.assign("https://translate.google.com/");
     }
 alert(sign);*/

 /*function errhandle(error) {
    var errorCode = error.code;
    if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.'); sign = 1;
    } else if (errorCode == 'auth/email-already-in-use') {
        alert('email exists'); sign = 1;
    } else if (errorCode == 'auth/invalid-email') {
        alert('auth/invalid-email'); sign = 1;
    } else if (errorCode == 'auth/operation-not-allowed') {
        alert('auth/operation-not-allowed'); sign = 1;
    } else if (errorCode == 'auth/user-not-found') {
        alert('auth/user-not-found'); sign = 1;
    } else if (errorCode == 'auth/user-disabled') {
        alert('auth/user-disabled'); sign = 1;
    } else if (errorCode == 'auth/operation-not-allowed') {
        alert('the type of account corresponding to the credential is not enabled. '); sign = 1;
    } else if (errorCode == 'auth/invalid-credential') {
        alert(' the credential is malformed or has expired'); sign = 1;
    } else if (errorCode == 'auth/wrong-password') {
        alert('auth/wrong-password'); sign = 1;
    } else if (errorCode == 'auth/invalid-verification-code') {
        alert('auth/invalid-verification-code'); sign = 1;
    } else if (errorCode == 'auth/invalid-verification-id') {
        alert(' auth/invalid-verification-id'); sign = 1;
    } else {
        alert(errorCode); sign = 1;
    }
}**/