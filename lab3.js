//define global variable
var map;
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
function addMarker() {
    //loop through map markers
    for (var _i = 0, mapMarkers_1 = mapMarkers; _i < mapMarkers_1.length; _i++) {
        var i = mapMarkers_1[_i];
        //assign latlng to new variable
        var places = { lat: i.LatLng.lat, lng: i.LatLng.lng };
        //create map markers
        var marker = new google.maps.Marker({
            position: places,
            map: map,
            title: i.address
        });
    }
}
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: Toronto,
        zoom: 8
    });
    setTimeout(addMarker, 200);
}
