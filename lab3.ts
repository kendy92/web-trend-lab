/* PART 1 */
let map : any;


//interface
interface LatLng{
  lat: number,
  lng: number
}

let Toronto: LatLng = {lat: 43, lng: -79.38}


function initMap() {
  map = new google.maps.Map (
    document.getElementById("map"),
    {
      center: Toronto,
      zoom: 8
    }
  );
}
