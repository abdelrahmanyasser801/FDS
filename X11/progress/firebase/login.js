var sign;

document.getElementById("login").addEventListener("click", login);
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
    if (type == "login" && mark == undefined) {
        window.location.href = 'https://waslnyangaz.firebaseapp.com/user-profile.html';
    } else if (type == "login" && mark != undefined) {
        window.location.href = 'https://waslnyangaz.firebaseapp.com/login.html';
    }
}
