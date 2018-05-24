//define global variable
let map : any;
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

function addMarker() {
  //loop through map markers
  for(let i of mapMarkers) {

    //assign latlng to new variable
    let places:LatLng = {lat: i.LatLng.lat, lng: i.LatLng.lng};
    //create map markers
    var marker = new google.maps.Marker({
    position: places,
    map: map,
    title: i.address
  });
  }
}

function initMap() {
  map = new google.maps.Map (
    document.getElementById("map"),
    {
      center: Toronto,
      zoom: 8
    }
  );
  setTimeout(addMarker,200);
}
