//define global variable
let map : any;
let geocoder : any;
let addresses : any[] = [];
let mapMarkers: MapMarker[] = [];
let Toronto: LatLng = {lat: 43, lng: -79.38}

//interface
interface LatLng{
  lat: number,
  lng: number
}

//class
class MapMarker{
  Address: string;
  LatLng: LatLng;

  //add constructor function
  public constructor(address: string, latlng: LatLng) {
    this.Address = address;
    this.LatLng = latlng;
  }
}



//making ajax request to server
$.ajax({
  dataType: 'json',
  url: 'locations.json',
  success: function(data){

    addresses = data;
    for(let i of addresses) {
      //add map marker to array of map markers
      let newLatLng: LatLng = {lat: i.lat, lng: i.lon};
      let newMapMarker: MapMarker = new MapMarker(i.address, newLatLng);
      mapMarkers.push(newMapMarker);
    }
  }
});

/* add GEOCODER function to get long and lat from Google */
function codeAddress() {

    // loop through Array of MapMarkers
    for(let i of mapMarkers) {
      var address = i.Address + 'Toronto, Canada';
      geocoder.geocode( { 'address': address}, function(results, status) {
        for(let y of results) {
          if (status == 'OK') {
            map.setCenter(y.geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: y.geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        }

      });
    }

}

function initMap() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map (
    document.getElementById("map"),
    {
      center: Toronto,
      zoom: 8
    }
  );
  setTimeout(codeAddress,2000);
}
