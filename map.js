var map;
var blue = '#78B7AE';
var orange = '#FB621F';
var yellow = '#FEF200';
var offblack = '#1D1D1D';
var darkYellow = 'CCC000';
var black = '#000000';
var white = '#FFFFFF';
var circleArr = [];

$(document).ready(function() {
  var mapTypeId = "style_uno";
  //load map
  var myOptions = {center: new google.maps.LatLng(42.2814, -83.7483),
     zoom: 12,
     mapTypeControl: false,
     zoomControl: false,
     streetViewControl: false,
     panControl: false,
     mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, mapTypeId]
       },
       mapTypeId: mapTypeId
  };

  var mapStyles = [
      {
        featureType: 'water',
        stylers: [ 
          { color: blue }]
      },{
        featureType: 'water',
        elementType: 'labels.text',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'road',
        elementType: 'labels.text',
        stylers: [ { visibility: "on" }]
      },{
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'road',
        elementType: 'geometry',
        stylers: [ { color: offblack }]
      },{
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [ { color: offblack }]
      },{
        featureType: 'poi',
        elementType: 'labels',
        stylers: [ { visibility: "on" }]
      },{
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [ {color: darkYellow}]
      },{
        featureType: 'poi.park',
        stylers: [ { visibility: "on" }]
      },{
        featureType: 'poi.government',
        stylers: [ { visibility: "on" }]
      },{
        featureType: 'poi.attraction',
        stylers: [ { visibility: "on" }]
      },{
        featureType: 'poi.business',
        stylers: [ { visibility: "on" }]
      },{
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [ {color: darkYellow}]
      },{
        featureType: 'administrative',
        elementType: 'labels.icon',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'administrative.country',
        elementType: 'labels',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'administrative.country',
        elementType: 'geometry.stroke',
        stylers: [ { weight: "0.5" }, { color: offblack }]
      },{
        featureType: 'administrative.locality',
        elementType: 'labels',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'administrative.land_parcel',
        elementType: 'labels',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'administrative.neighborhood',
        elementType: 'labels',
        stylers: [ { visibility: "off" }]
      },{
        featureType: 'administrative.province',
        elementType: 'labels.text.fill',
        stylers: [ { color: orange }]
      }
  ];

  map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);

  var styledMapOptions = {
  name: 'Style Uno'
  };

  var customMapType = new google.maps.StyledMapType(mapStyles, styledMapOptions);

  map.mapTypes.set(mapTypeId, customMapType);
  // infoWindow, markerOptions
  var renderOpt = {
    draggable: false,
    map: map,
    suppressMarkers: true,
    preserveViewport: true
  }

  //matt's shit for misses
  var url = 'http://battletrip.herokuapp.com/misses';
  $.ajax({
    type: "GET",
    url: url,
    dataType: "jsonp",
    contentType: "application/json",
    success: function(result){
      //console.log(result);
      initialize(result.arr);
    },
    error: function(xhr, textStatus, errThrown){
      console.log(errThrown);
    }
  });

  //shit for circles
  var url = 'http://battletrip.herokuapp.com/ships';
  $.ajax({
    type: "GET",
    url: url,
    dataType: "jsonp",
    contentType: "application/json",
    success: function(result){
      //console.log(result);
      drawCircles(result.arr);
    },
    error: function(xhr, textStatus, errThrown){
      console.log(errThrown);
    }
  });

});

setInterval(drawRadar, 500);

function initialize(data) 
{
	var coordinates = data;
	//plot flags
	for(var i=0; i<coordinates.length; i++) {
	  var lat = coordinates[i].lat;
	  var lon = coordinates[i].lon;
	  marker = new google.maps.Marker({
	    position: new google.maps.LatLng(lat, lon),
	    map: map
	  });
	}
}

function drawCircles(data)
{
	var coordinates = data;
	//plot circles
	for(var i=0; i<coordinates.length; i++) {
		var lat = coordinates[i].lat;
	 	var lon = coordinates[i].lon;
	 	var radius = coordinates[i].radius;
		var circle = new google.maps.Circle({
			strokeColor: 'orange',
		    strokeOpacity: 0.8,
		    strokeWeight: 1.5,
		    fillColor: 'orange',
		    fillOpacity: 0.6,
	    	map: map,
	    	center: {lat: lat, lng: lon},
	    	radius: radius
		});
    circleArr.push(circle);
	}
}

var maxRadius = 1500;

function drawRadar()
 {
  for (var i=0; i<circleArr.length; i++)
  {

    var radius = circleArr[i].radius;

    if (radius <= maxRadius) {
      //create null circle
      radius += 50;
    } else {
      i = 0;
    }

    circleArr[i].setMap(null);
    circleArr[i] = new google.maps.Circle({
      strokeColor: 'yellow',
      strokeOpacity: 0.8,
      strokeWeight: 1.5,
      fillColor: 'yellow',
      fillOpacity: 0.6,
      map: map,
      center: {lat: 42.2814, lng: 83.7483},
      radius: radius
    });
//  }
}
}