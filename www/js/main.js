//All you js code goe here!


//ejs up script
$(document).ready(function() {
	if($(".ejsCheck").html() !== "") {
		$(".ejsStatus").css("color", "green");
		$(".ejsStatus").html("ejs is up");
	}
});

//socket.io code
var socket = io.connect('localhost');//connect to our server

socket.on('connect', function (data) {//updates connection status
		$(".socketConnectionStatus").css("color", "green");
		$(".socketConnectionStatus").html("connected");
		socket.on('connectionMsg', function(data) {
			$(".socketConnectionMessage").html(data);
		});
});

socket.on('disconnect', function () {//updates connection status
		$(".socketConnectionStatus").css("color", "red");
		$(".socketConnectionMessage").html("There is no connection to the server :(");
		$(".socketConnectionStatus").html("disconnected");
});