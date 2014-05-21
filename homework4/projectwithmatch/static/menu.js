/*
 * Aaron Hsu (ahsu1)
 * ahsu1@andrew.cmu.edu
 */

$(document).ready(function() {
sessvars = new Object();
if(window.name)
		sessvars  = JSON.parse(window.name);
	// Return unlogged in user to login.html
	if(!sessvars.playerID){
		window.location = 'login.html'
	}
	$("#instButton").click(function(event) {
			$(this).children("#inst").slideToggle();
	});
	$("#find-match").focus();

		sessvars.inGame = false;

	$("#creditsButton").click(function(event) {
		$(this).children("#cred").slideToggle();
	})
	window.onbeforeunload = logout
})
	function logout(){
    $.ajax({
		type: "post",
		url: "/logout",
		data: {"playerID": sessvars.playerID},
		success: function(data) {
			window.name = undefined
			window.location = 'login.html';
		}
	});
}


function findMatch(){

	$.ajax({
		type: "post",
		url: "/match",
		data: {"playerID": sessvars.playerID},
		success: function(data) {
			if(data.success){
				cancelSearch();
				window.name = JSON.stringify(data);
				window.location = 'game.html';
				
				return;
			}
		}
	});
}

// Stops a player from searching
function cancelSearch(){                                               	
	$.ajax({
		type: "post",
		url: "/cancel-search",
		data: {"playerID": sessvars.playerID},
		success: function(data) {
		}
	});
}
