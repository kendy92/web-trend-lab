//define global variable
var map;
var geocoder;
var addresses = [];
var mapMarkers = [];
var Toronto = { lat: 43, lng: -79.38 };
//class
var MapMarker = /** @class */ (function () {
    //add constructor function
    function MapMarker(address, latlng) {
        this.Address = address;
        this.LatLng = latlng;
    }
    return MapMarker;
}());
//making ajax request to server
$.ajax({
    dataType: 'json',
    url: 'locations.json',
    success: function (data) {
        addresses = data;
        for (var _i = 0, addresses_1 = addresses; _i < addresses_1.length; _i++) {
            var i = addresses_1[_i];
            //add map marker to array of map markers
            var newLatLng = { lat: i.lat, lng: i.lon };
            var newMapMarker = new MapMarker(i.address, newLatLng);
            mapMarkers.push(newMapMarker);
        }
    }
});
/* add GEOCODER function to get long and lat from Google */
function codeAddress() {
    // loop through Array of MapMarkers
    for (var _i = 0, mapMarkers_1 = mapMarkers; _i < mapMarkers_1.length; _i++) {
        var i = mapMarkers_1[_i];
        var address = i.Address + 'Toronto, Canada';
        geocoder.geocode({ 'address': address }, function (results, status) {
            for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
                var y = results_1[_i];
                if (status == 'OK') {
                    map.setCenter(y.geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        position: y.geometry.location
                    });
                }
                else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            }
        });
    }
}
function initMap() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById("map"), {
        center: Toronto,
        zoom: 8
    });
    setTimeout(codeAddress, 2000);
}
