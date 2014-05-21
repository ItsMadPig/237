/*
 * Aaron Hsu (ahsu1)
 * ahsu1@andrew.cmu.edu
 */
 
// Handles JS actions in the login screen/
sessvars = new Object();
$(document).ready(function() {
	if(window.name)
		sessvars  = JSON.parse(window.name);
	// If user is already logged in, go to lobby.
	if(sessvars.playerID){
		window.location = 'main.html';
		return;
	}

	sessvars = new Object();
	$("#username").focus();
	
});	

function register() {
	$.ajax({
		type: "post",
		url: "/register",
		data: {"playerID": $("#username").val()},
		success: function(data) {
			if(data.success){
			$("#message").html("New playerID created");
		} else{
			$("#message").html("User already exists");

		}
		
	}});
}

function login() {
	var playerID = $("#playerID").val();
	$.ajax({
		type: "post",
		url: "/login",
		data: {"playerID": $("#username").val()},
		success: function(data) {
			if(data.success){
				sessvars.playerID = $("#username").val()
				window.name = JSON.stringify(sessvars);
				window.location = 'main.html';
			}
			else{
				$("#message").html("login fail");
			}
		}
	});
	
	
}

function howToPlay(){
	window.location = 'howToPlay.html';
}


