window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

var orderID;
var sname;
var saddress;
var sphone;
var rname;
var raddress;
var rphone;
var object;
var wgt;

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 28; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

document.getElementById("unSingleOrderSubmit").addEventListener("click", unregSingleOrder);
document.getElementById("submit-code").addEventListener('click', myFunction);





function unregSingleOrder(sname, saddress, sphone, rname, raddress, rphone, obj, wgt) {

  sname = document.getElementById('sname').value;
  saddress = document.getElementById('saddress').value;
  sphone = document.getElementById('sphone').value;
  rname = document.getElementById('rname').value;
  raddress = document.getElementById('raddress').value;
  rphone = document.getElementById('rphone').value;
  object = document.getElementById('obj').value;
  wgt = document.getElementById('wgt').value;
  orderID = makeid();
  console.log("inside the function")
  //var phone = document.getElementById("phonenumber").value;
  console.log(sphone)
  firebase.auth().signInWithPhoneNumber("+20" + sphone, window.recaptchaVerifier).then(function (confirmationResult) {

    window.confirmationResult = confirmationResult;
    console.log(confirmationResult);



  });
  //alert('Done');
}

function myFunction() {
  window.confirmationResult.confirm(document.getElementById("verificationcode").value)
    .then(function (result) {
      firebase.database().ref('orders/wait/unregistered/single/' + orderID + '/').set({
        sname: sname,
        saddress: saddress,
        sphone: sphone,
        rname: rname,
        raddress: raddress,
        rphone: rphone,
        object: object,
        wgt: wgt

      });
      console.log("congratulations!!...")
    }, function (error) {
      alert(error);
    });
};



/*function regMulOrder(sname, saddress, sphone, rname, raddress, rphone, obj, wgt) {
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
}*/