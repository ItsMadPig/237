/*
 * Aaron Hsu (ahsu1)
 * ahsu1@andrew.cmu.edu
 */

// globals
var canvas;
var ctx;
var waitMode = false;
var myID, oppID;
var amIfirst = false;
var player;
var buttonAction;
var hoveredButtonNumber;
var clickedButtonNumber;
var alignX;
$(document).ready(function() {

	data = new Object();
if(window.name)
		data  = JSON.parse(window.name);
	if(!data||!data.playerID){
		window.location = 'login.html'
	}
	      canvas = document.getElementById("myCanvas");
            ctx = canvas.getContext("2d");
        ctx.font="bold 20px Verdana";
        ctx.fillStyle = "yellow";
        ctx.fillText("Waiting...", canvas.width/2, 20);
			myID = data.playerID;
			oppID = data.oppID;
            player1 = new Player(0, canvas.height - groundHeight,myID);
            player2 = new Player(1100, canvas.height - groundHeight,oppID);
            player2.movement.direction = "left";
            
            if (data.youFirst){
            	amIfirst = true;
                message = "YOUR TURN!";
                player = player1
            } else{
                waitMode = true;
                player = player2
            }

            runGame();
            getCurrentState();
            if (myID === 2){
                message = "Waiting..."
                getCurrentBullet();

}})

function endGame(){
					window.name = JSON.stringify({"playerID":myID,
						});
 $.ajax({
        type: "post",
        url: "/forfeit",
        data: {"playerID": myID},

        success: function(data) {
        }

    })
                 	window.location = 'main.html';

}

function runGame() {
	if (myID === 1){
		alignX = canvas.height/16
	} else{
		alignX = canvas.width - canvas.height/4;
	}
	clickedButtonNumber = 1;
	hoveredButtonNumber = 0;

	var onKeyDown = function(e){
		e.preventDefault();
		if(!waitMode){
			if (player.isDead || player.bullet.charging) {
				//if not your turn
				return;
			}
			switch(e.keyCode) {
				case 32: // space key
					break;
				case 37: // left arrow
					if (player.oilLeft <=0){
						player.stop()
						break;
					}
					player.movement.direction = "left";
					player.walkHeld = true;
					break;
				case 39: // right arrow
					if (player.oilLeft <=0){
						player.stop()
						break;
					}
					player.movement.direction = "right";
					player.walkHeld = true;
					break;
				default: 
					break;
			}


			switch(e.keyCode){
				case 32: // space bar
					//powers up
					if (player.bullet.charging === false){
						player.bullet.power = INITPOWER;
						player.bullet.charging = true;
						player.charge();
					}
					break;
				case 37: //left arrow
					if (player.oilLeft <=0){
						player.movement.direction = "left";
						player.stop()
						break;
					} else if (player.movement.type !== WALKING) {
						player.walk("left");
					}
					break;
				case 39: //right arrow
					if (player.oilLeft <=0){
						player.movement.direction = "right";
						player.stop()
						break;
					} else if (player.movement.type !== WALKING) {
						player.walk("right");
					}
					break;
				case 38: //up arrow
					player.aimUp();
					break;
				case 40: //down arrow
					player.aimDown();
					break; 
				case 72: // h
					player.getHurt();
					break;
				default: 
					break;
			}
		}
	};

	var onKeyUp = function(e) {
		e.preventDefault();
		if(!waitMode){
			if (e.keyCode === 37 || e.keyCode === 39) {
				player.walkHeld = false;
			}
			if (e.keyCode === 32){
				player.bullet.charging = false;
			}

			if (player.isDead){
				return;
			}

			switch(e.keyCode){
				case 32: // space bar
					//signals server other players turn
					player.bullet.charging = false;
					player.fire();
					break;
				case 37: //left arrow
					if (player.movement.direction === "left" &&
						player.movement.type === WALKING) 
					{
						player.stop();
					}
					break;

				case 39: //right arrow
					if (player.movement.direction === "right" &&
						player.movement.type === WALKING) 
					{
						player.stop();
					}
					break;
			}
		}
	};

	var onMouseDown = function(event) {
		var x = event.pageX - canvas.offsetLeft;
		var y = event.pageY - canvas.offsetTop;

		/* If in the right vertical range */
		if (alignX <=x && (x <= alignX+nButtonFrame[0].width/2)) {
			buttonAction = 2;
			if (canvas.height/7 <= y && 
				y < canvas.height/7 + fButtonFrame[0].height/2)	{
				clickedButtonNumber = 1;
				player.bullet.type = NORMAL;
			}

			if (canvas.height/7 + fButtonFrame[0].height/2 <= y &&
			 	y < canvas.height/7 + fButtonFrame[0].height)	{
				clickedButtonNumber = 2;
				player.bullet.type = FIRE;
			}

			if (canvas.height/7 + fButtonFrame[0].height <= y &&
				 y < canvas.height/7 + fButtonFrame[0].height*3/2) {
				clickedButtonNumber = 3;
				player.bullet.type = LIGHTNING;
			}
		}
	}
	var onMouseMove = function(event) {
		var x = event.pageX - canvas.offsetLeft;
		var y = event.pageY - canvas.offsetTop;

		if (alignX <=x && (x <= alignX+nButtonFrame[0].width/2)) {

			if (canvas.height/7 <= y && 
				y < canvas.height/7 + fButtonFrame[0].height/2)	{
				hoveredButtonNumber = 1;
			}

			if (canvas.height/7 + fButtonFrame[0].height/2 <= y &&
			 	y < canvas.height/7 + fButtonFrame[0].height)	{
				hoveredButtonNumber = 2;
			}

			if (canvas.height/7 + fButtonFrame[0].height <= y &&
				 y < canvas.height/7 + fButtonFrame[0].height*3/2) {
				hoveredButtonNumber = 3;
			}
		} else{
			hoveredButtonNumber = 0;
			buttonAction = 0;
		}
	}

	levelIndex = 0;
	initLevel();
	engine = new PhysicsEngine();
	engine.startEngine()
	canvas.addEventListener("keydown", onKeyDown, true);
	canvas.addEventListener("keyup", onKeyUp, true);
	canvas.addEventListener("mousedown", onMouseDown, false);
	canvas.addEventListener("mousemove", onMouseMove, false);
	canvas.setAttribute('tabindex', '0');
	canvas.focus();
}

function gameOverScreen()	{
		/* Figure out what to display */
		if (myID == loser)
			text = "You lost!";
		else
			text = "You won!"
		
		/* Draw a box and text */
		ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
		ctx.fillRect(400, 75, 400, 300)
		ctx.font = "60px Arial";
		ctx.textAlign = "center";
		ctx.fillStyle = "White";
		ctx.fillText(text, 600, 150);

		/* Show links to restart and back */
		$(".gameover").show();
}
