function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 28; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


  document.getElementById("SingleOrederSubmit").addEventListener("click", regSingleOrder)


function regSingleOrder(sname, saddress, sphone, rname, raddress, rphone, obj, wgt) {

  var sname = document.getElementById('sname').value;
  var saddress = document.getElementById('saddress').value;
  var sphone = document.getElementById('sphone').value;
  var rname = document.getElementById('rname').value;
  var raddress = document.getElementById('raddress').value;
  var rphone = document.getElementById('rphone').value;
  var object = document.getElementById('obj').value;
  var wgt = document.getElementById('wgt').value;

  
      firebase.database().ref('orders/wait/registered/single/' + makeid() + '/').set({
        sname: sname,
        saddress: saddress,
        sphone: sphone,
        rname: rname,
        raddress: raddress,
        rphone: rphone,
        object: object,
        wgt: wgt

      }).catch(function(error){
        console.log(error.message)
      });
   

  alert('Done');
}









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