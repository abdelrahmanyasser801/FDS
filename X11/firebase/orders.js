var senderLat;
var senderLong;
var recieverLat;
var recieverLong;
var price = 0;
var totalDistance;
var key;

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 28; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

document.getElementById("SingleOrederSend").addEventListener("click", calculateDistances);
document.getElementById("SingleOrederSubmit").addEventListener("click", regSingleOrder);

/********************************************************************************* */
var map;
var geocoder;
var bounds = new google.maps.LatLngBounds();
var markersArray = [];

//var origin1 = new google.maps.LatLng(55.930, -3.118);
var origin;
var destination;
//var destinationB = new google.maps.LatLng(50.087, 14.421);

var destinationIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';
var originIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';

function initialize() {
  var opts = {
    center: new google.maps.LatLng(30.0444, 31.2357),
    zoom: 10
  };
  console.log("start init")
  map = new google.maps.Map(document.getElementById('map-canvas'), opts);
  console.log("done init")
  geocoder = new google.maps.Geocoder();
}

function calculateDistances() {
  origin = document.getElementById('saddress').value;
  destination = document.getElementById('raddress').value;
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, calcDistance);

  /******************************************************** Getting LAT & lon for sender*/
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({ 'address': origin }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      senderLat = results[0].geometry.location.lat();
      senderLong = results[0].geometry.location.lng();
    }
  });
  geocoder.geocode({ 'address': destination }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      recieverLat = results[0].geometry.location.lat();
      recieverLong = results[0].geometry.location.lng();
    }
  });
  console.log("Sender :" + senderLat, senderLong + " , Reciever :" + recieverLat, recieverLong)
  /********************************************************************************* */
}

function calcDistance(response, status) {
  if (status != google.maps.DistanceMatrixStatus.OK) {
    alert('Error was: ' + status);
  } else {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;
    deleteOverlays();



    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      addMarker(origins[i], false);
      for (var j = 0; j < results.length; j++) {
        addMarker(destinations[j], true);
        totalDistance = (results[j].distance.value) / 1000;

        if (totalDistance >= 5) {
          totalDistance = totalDistance - 5
          price += 5 * 4;
          if (totalDistance >= 5) {
            totalDistance = totalDistance - 5
            price += 5 * 3;

            if (totalDistance > 0) {
              price += totalDistance * 2.5
            }
          } else {
            price += totalDistance * 3
          }
        } else {
          price += totalDistance * 4
        }
        outputDiv.innerHTML = 'source : ' + origins[i] + '<br>' + 'Distenation : ' + destinations[j]
          + '<br>' + ' Distance : ' + results[j].distance.text + '<br>' + ' Costs : ' + price;

      }
    }
  }
}

function addMarker(location, isDestination) {
  var icon;
  if (isDestination) {
    icon = destinationIcon;
  } else {
    icon = originIcon;
  }
  geocoder.geocode({ 'address': location }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      bounds.extend(results[0].geometry.location);
      map.fitBounds(bounds);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        icon: icon
      });
      markersArray.push(marker);
    } else {
      alert('Geocode was not successful for the following reason: '
        + status);
    }
  });
}

function deleteOverlays() {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}

google.maps.event.addDomListener(window, 'load', initialize);

/********************************************************************************* */
function regSingleOrder(sname, saddress, sphone, rname, raddress, rphone, obj, wgt) {

  var sname = document.getElementById('sname').value;
  var saddress = document.getElementById('saddress').value;
  var sphone = document.getElementById('sphone').value;
  var rname = document.getElementById('rname').value;
  var raddress = document.getElementById('raddress').value;
  var rphone = document.getElementById('rphone').value;
  var object = document.getElementById('obj').value;
  var wgt = document.getElementById('wgt').value;
  var ref0 = firebase.database().ref("user");
  var ref1 = firebase.database().ref('orders/wait/' + makeid() + '/');
  
  ref0.orderByChild("personalinfo/phone").equalTo(sphone).on("value", function (snapshot) {
    console.log(snapshot.val());
    console.log(Object.keys(snapshot.val())[0]);
    key = Object.keys(snapshot.val())[0];
  });

  ref1.set({
    s_first_name: sname,
    s_last_name: "",
    s_address: saddress,
    s_lat: senderLat,
    s_long: senderLong,
    s_phone: sphone,
    r_first_name: rname,
    r_last_name: "",
    r_address: raddress,
    e_lat: recieverLat,
    e_long: recieverLong,
    r_phone: rphone,
    description: object,
    wgt: wgt,
    uid: key,
    price:price

  }).catch(function (error) {
    console.log(error.message)
  });
  alert('Done');
}