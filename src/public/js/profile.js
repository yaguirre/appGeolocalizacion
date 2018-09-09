var lat;
var lon;
var usuario;
$.ajax({
    url: "/getUsername",
    method: "GET",
    dataType: "json",
    success: function(response){
        usuario = response.username;
    }
})
var map;
var coordenadas = document.getElementById("coordenadas");
var tiempo = document.getElementById("tiempo");
var fecha = document.getElementById("fecha");
var num = 0;

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
}

var options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
};
  
navigator.geolocation.watchPosition(showPosition, error, options);
function saveLocation(){
    console.log("usuario: " + usuario + " Lat: " + lat + ", Long: " + lon + " -   " + num)
    $.ajax({
        url:"/location",
        headers:{
            "Content-Type":"application/json"
        },
        method:"POST",
        dataType:"json",
        data:JSON.stringify({
            email:usuario,
            latitude:lat,
            longitude:lon
        })
    })
    //document.geolocation.email.value = usuario
    //document.geolocation.latitude.value = lat
    //document.geolocation.longitude.value = lon
    addMarker()
    //document.getElementById("info").submit();
}
function initMap() {
    //options
    var options = {
        zoom:13,
        center: new google.maps.LatLng(6.27053,-75.57211999999998)
    }
    //new map
    map = new google.maps.Map(document.getElementById('map'), options);
    
    $.ajax({
        url:"/getLocations",
        method:"GET",
        dataType:"json",
        success: function(response){
            response.locations.forEach(function(location) {
                lat = location.latitude;
                lon = location.longitude;
                addMarker();
            }); 
        }
    })
}
function addMarker(){
    var coordinates = new google.maps.LatLng(lat,lon)
    var marker = new google.maps.Marker({
        position: coordinates,
        map:map
    })
}
function updateDate(){
    actualDate = new Date()
    year = actualDate.getFullYear()
    month = actualDate.getMonth() + 1
    day = actualDate.getDay()
    showDate = day + "/" + month + "/" + year
    fecha.innerHTML = "<strong> Fecha: </strong> " + showDate
    setTimeout("updateDate()",100000) 
}
function updateClock(){ 
       actualMoment = new Date() 
       hour = actualMoment.getHours() 
       min = actualMoment.getMinutes() 
       sec = actualMoment.getSeconds() 
    
    showClock = hour + " : " + min + " : " + sec 
    tiempo.innerHTML = "<strong> Hora: </strong> " + showClock
       setTimeout("updateClock()",1000) 
} 

function showPosition(position) {
    coordenadas.innerHTML = " <strong> Latitude: </strong> " + position.coords.latitude + 
    "<br> <strong> Longitude: </strong> " + position.coords.longitude; 
    lat = position.coords.latitude
    lon = position.coords.longitude
    console.log(lat)
    console.log(lon)
    console.log(num);
    num = num + 1;
    saveLocation();
}
//function getLocation() {
  //  if (navigator.geolocation) {
    //    navigator.geolocation.getCurrentPosition(showPosition);
    //} else {
      //  x.innerHTML = "Geolocation is not supported by this browser.";
    //}
    //setTimeout("getLocation()",5000) 
//} 
