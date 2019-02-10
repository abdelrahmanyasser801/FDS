document.getElementById("insert").addEventListener("click", intoDB);
function intoDB() {
    var name1 = document.getElementById("inname1").value;
    var name2 = document.getElementById("inname2").value;
    var email = document.getElementById("inemail").value;
    var password = document.getElementById("inpassword").value;
    firebase.database().ref('user/' + makeid() + '/personalInfo/').set({
        fname: name1, lname: name2, email: email, password: password
    });

}
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 28; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}