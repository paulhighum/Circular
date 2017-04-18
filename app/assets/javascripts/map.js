$(document).ready(function(){
  initMap();
  addAddress();
});

let map;

function initMap() {
  var denver = { lat: 39.7392, lng: -104.9903 };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: denver
  });
}

function addAddress(){
  $('.submit-address').on('click', function(e){
    e.preventDefault();
    var address = $('#street-address').val();
    if (!address) {
      $('.panel-body').append("Street address can't be blank").css('color', 'red')
    } else {
      $.ajax({
        method: "GET",
        url: "/apartments/find",
        data: {"street_address": address}
      });
    // $('.modal').modal();
//       codeAddress(address);
    };
  });
}

function codeAddress(address){
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': address}, function(results, status){
    if(status == google.maps.GeocoderStatus.OK){
      var markerLocation = results[0].geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        zoom: 12,
        position: markerLocation,
        center: markerLocation
      });
    } else {
      alert("Geocode was not successful because " + status);
    }
  })
}


// $(document).ready(() => {
//   $('#address_search').on('click', (event) => {
//   event.preventDefault()
// let streetAddress = $('input[name=apartment]').val()
// if (!streetAddress) {
//   $('.panel-body').append("Street address can't be blank").css('color', 'red')
// } else {
//   $.ajax({
//     url: '/apartments/find',
//     method: 'GET',
//     data: {"street_address": streetAddress}
//   })
//     .done(response => {
//     response()
//   })
// .fail((error) => {
//     $('.modal').modal()
// })
// }
// })
// })
