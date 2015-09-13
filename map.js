var map;
$(document).ready(function() {
	//load map
	var myOptions = {center: new google.maps.LatLng(42.2814, -83.7483),
	 zoom: 12,
	 mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);

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
			strokeColor: '#FF0000',
		    strokeOpacity: 0.5,
		    strokeWeight: 1.5,
		    fillColor: '#FF0000',
		    fillOpacity: 0.35,
	    	map: map,
	    	center: {lat: lat, lng: lon},
	    	radius: radius
		});
	}
}