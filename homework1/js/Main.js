/*
 * Aaron Hsu (ahsu1)
 * ahsu1@andrew.cmu.edu
 */

// globals
var canvas;
var ctx;
var godMode = false;

window.onload = function() {
	runGame();
}

function runGame() {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");

	var onKeyDown = function(e){
		if (player.isDead || player.movement.type === HIT) {
			return;
		}
		switch(e.keyCode) {
			case 37: // left arrow
				player.movement.direction = "left";
				player.walkHeld = true;
				break;
			case 39: // right arrow
				player.movement.direction = "right";
				player.walkHeld = true;
				break;
		}

		if (player.movement.type === JUMPING ||
			player.movement.type === DUCKING) {
			return;
		}

		player.keyCode = e.keyCode;
		switch(e.keyCode){
			case 32: // space bar
				player.interact();
				break;
			case 37: //left arrow
				if (player.movement.type !== WALKING) {
					player.walk("left");
				}
				break;
			case 39: //right arrow
				if (player.movement.type !== WALKING) {
					player.walk("right");
				}
				break;
			case 38: //up arrow
					player.jump();
				break;
			case 40: //down arrow
				player.duck();
				break;
		}
	};

	var onKeyUp = function(e) {
		if (e.keyCode === 37 || e.keyCode === 39) {
			player.walkHeld = false;
		}
		
		if (player.isDead){
			return;
		}

		switch(e.keyCode){
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
			case 40: //down arrow
				player.shouldStand = true;
				break;
		}
	};

	player = new Player(0, canvas.height - groundHeight);
	levelIndex = 0;
	initNextLevel();
	engine = new PhysicsEngine();
	engine.startEngine();
	canvas.addEventListener("keydown", onKeyDown, true);
	canvas.addEventListener("keyup", onKeyUp, true);
	canvas.setAttribute('tabindex', '0');
	canvas.focus();
}
