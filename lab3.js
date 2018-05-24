/* PART 1 */
var map;
var Toronto = { lat: 43, lng: -79.38 };
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: Toronto,
        zoom: 8
    });
}
