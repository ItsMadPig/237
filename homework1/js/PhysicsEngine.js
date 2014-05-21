/*
 * Aaron Hsu (ahsu1)
 * ahsu1@andrew.cmu.edu
 */
 
//global
var engine;

// local
var animationDelay = 60;
var gravityStrength = 20;
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
			plat.fixCollisions();
		});

		level.gates.forEach(function(gate) {
			if (gate.hasCollided()) {
				gate.adjustBounds();
				if (gate.locked) {
					displayMessage("The gate is locked. Find the key");
				} else {
					displayMessage("Press space to open the gate");
				}
			}
		});

		level.boulders.forEach(function(boulder){
			if (boulder.hasCollided()) {
				player.getHurt();
			}
		});

		level.arrows.forEach(function(arrow){
			if (arrow.hasCollided()) {
				player.getHurt();
			}
		});

		level.spikes.forEach(function(spike) {
			if (spike.hasCollided()) {
				player.getHurt();
				player.pos.y = canvas.height - groundHeight;
				player.pos.x = 0;
			}
		});

		level.keys.forEach(function(key) {
			if (key !== undefined && key.hasCollided()) {
				ctx.font="20px Verdana";
				ctx.fillStyle = "yellow";
				ctx.fillText("Press space to pick up the key", 10, 20);
			}
		});

		level.tomes.forEach(function(tome) {
			if (tome.hasCollided()) {
				displayMessage("Press space to claim the JAVASCRIPT TOME!");
			}
		});
	};

	var drawEverything = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		level.draw();
		player.draw();
	};

	self.transitionLevel = function() {
		initNextLevel();
	};

	var mainLoop = function() {
		applyGravity();
		//player.update();
		self.detectCollisions();
		drawEverything();
		if (level.isCompleted()) {
			self.transitionLevel();
		}
	};

	self.startEngine = function() {
		self.engineId = setInterval(mainLoop, animationDelay);
	};

	self.stopEngine = function() {
		clearInterval(self.engineId);
	};
};
