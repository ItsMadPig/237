/*
 * Aaron Hsu (ahsu1)
 * ahsu1@andrew.cmu.edu
 */
 
//global
var engine;

// local
var animationDelay = 60;
var gravityStrength = 1;
var hitDelay = 8;

var PhysicsEngine = function() {
	var self = this;
	self.engineId = 0;

	var applyGravity = function() {
		player.pos.y += gravityStrength;
	};

	var displayMessage = function(msg) {
		ctx.font="20px Verdana";
		ctx.fillStyle = "yellow";
		ctx.fillText(msg, 10, 20);
	}

	self.detectCollisions = function() {
		// check that the player hasn't collided with a
		// peice of terrain

		level.platforms.forEach(function(plat) {
			plat.fixCollisions(player1);
			plat.fixCollisions(player2);
		});

		level.bullets.forEach(function(bullet){
			if (bullet.hasCollided(player1)){
				player1.getHurt(bullet);
			} else if (bullet.hasCollided(player2)){
				player2.getHurt(bullet);
			}

		});

	};

	var drawEverything = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		level.draw();
		player1.draw();
		player2.draw();

		if (loser > 0)		/* -1 initially */
			gameOverScreen()		
	};

	var mainLoop = function() {
		applyGravity();
		//player.update();
		self.detectCollisions();
		drawEverything();

	};

	self.startEngine = function() {
		self.engineId = setInterval(mainLoop, animationDelay);
	};

	self.stopEngine = function() {
		clearInterval(self.engineId);
	};
};
