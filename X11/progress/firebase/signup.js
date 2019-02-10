var sign;
var randomID;
/*window.recaptchaVerifier*/appVer = new firebase.auth.RecaptchaVerifier('recaptcha-container');
//appVer = new firebase.auth.RecaptchaVerifier("recaptcha");

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 28; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
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
                insertData("signup", sign);
            }
        });
    }, 1000);

}
function insertData(type, mark) {
    if (type == "signup" && mark == undefined) {
        console.log("inserting data")
        var address = document.getElementById("address").value;
        var fname = document.getElementById("fname").value;
        var lname = document.getElementById("lname").value;
        var phoneNumber = document.getElementById("phone").value;
        var email = document.getElementById("signupemail").value;
        var password = document.getElementById("signuppassword").value;
         randomID = makeid();

        firebase.database().ref('user/' + randomID + '/personalInfo/').set({
            address: address, fname: fname, lname: lname, phone: phoneNumber, email: email, password: password
        });

        //setTimeout(function () { window.location.href = 'https://waslnyangaz.firebaseapp.com/single-order.html'; }, 3000);
        setTimeout(myFunction0, 1000);
    } else if (type == "signup" && mark != undefined) {
        window.location.href = 'https://waslnyangaz.firebaseapp.com/signup.html';
    }
}

function myFunction0() {
    console.log("inside the function")
    var phone = document.getElementById("phone").value;
    console.log(phone)
    // firebase.auth().currentUser.linkWithPhoneNumber(phoneNumber, appVerifier);
    firebase.auth().currentUser.linkWithPhoneNumber("+20" + phone, appVer)
        .then(function (confirmationResult) {
            window.confirmationResult = confirmationResult;
            console.log(confirmationResult);
        }).catch(function (error) {

            
            firebase.auth().currentUser.delete().then(function () {
                // User deleted.
                firebase.database().ref('user/' + randomID ).remove();
            }).catch(function (error) {
                // An error happened.
            });
            alert(error.message);
            console.log(error.message);
            setTimeout(function () { window.location.href = 'https://waslnyangaz.firebaseapp.com/signup.html';},3000);

        });
}

document.getElementById("submit-code").addEventListener("click", myFunction);

function myFunction() {
    window.confirmationResult.confirm(document.getElementById("verificationcode").value)
        .then(function (result) {
            //alert('login process successfull!\n redirecting');
            //alert('<a href="javascript:alert(\'hi\');">alert</a>')
            // console.log("congratulations!!...")
            setTimeout(function () { window.location.href = 'https://waslnyangaz.firebaseapp.com/user-profile.html'; }, 3000);
        }, function (error) {
            alert(error.message);
            
            firebase.auth().currentUser.delete().then(function () {
                // User deleted.
                firebase.database().ref('user/' + randomID ).remove();
            }).catch(function (error) {
                // An error happened.
            });
            window.location.href = 'https://waslnyangaz.firebaseapp.com/signup.html';
        });
};