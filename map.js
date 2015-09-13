$(document).ready(function() {

});

/*
$.getJSON('https://battletrip.herokuapp.com/misses', function(data) {
	initialize(data.arr);
}); */

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

function initialize(data) 
{
	var myOptions = {center: new google.maps.LatLng(42.2814, -83.7483),
	 zoom: 12,
	 mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);

	// var coordinates = [{latitude:42.290895, longitude:-83.705983},
	// 	{latitude:42.267687, longitude:-83.714981},
	// 	{latitude:42.293469, longitude:-83.780727},
	// 	{latitude:42.267243, longitude:-83.750257},
	// 	{latitude:42.278230, longitude:-83.759012}
	// 	];
	var coordinates = data;

	for(var i=0; i<coordinates.length; i++) {
	  var lat = coordinates[i].lat;
	  var lon = coordinates[i].lon;
	  marker = new google.maps.Marker({
	    position: new google.maps.LatLng(lat, lon),
	    map: map
	  });
	}
	 
}