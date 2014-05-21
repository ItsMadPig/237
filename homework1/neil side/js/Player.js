/*
 * Group Members:
 * Aaron Hsu (ahsu1)
 * Neil Batlivala (nbatliva)
 */

// main player global
var player;

// player attributes
var walkSpeed = 7;
var runSpeed = 12;
var jumpLength = 15;
var jumpHeight = 20 + gravityStrength;
var maxHealth = 5;
var sizeMultiplier = 1.5;

// vars for player states
var STANDING = 0;
var WALKING = 1;
var JUMPING = 2;
var DUCKING = 3;
var DYING = 4;
var HIT = 5;

// main function to create a player object
var Player = function(xPos, yPos) {
	var self = this;
	self.keyCode;
	self.pos = {
		"x": xPos,
		"y": yPos
	};

	self.movement = {
		"type": STANDING,
		"step": 0, // this is the index in a array of frames for a particular action
		"direction": "right"
	};
	self.height = standingRightFrame.height;
	self.width = standingRightFrame.width;
	self.health = maxHealth;

	self.isDead = false;
	self.hit = false;
	self.hitDelay = 0;
	self.shouldStand = false;
	self.walkHeld = false;
	self.keys = [];

	// initialize the frame of the hearts depending on max health
	self.initHearts = function() {
		//draw hearts in top right corner
		self.heartFrames = [];
		var rectWidth = canvas.width/5;
		var rectHeight = canvas.height/13;
		var rectYPos = canvas.height/15;
		var rectXPos = canvas.width-rectYPos-rectWidth;
		ctx.fillStyle = heartFrameBackgroundColor;
		ctx.fillRect(
			rectXPos, rectYPos,
			rectWidth, rectHeight);
		var heartWidth = rectWidth/(maxHealth + 2);
		var gapWidth = (rectWidth-maxHealth*heartWidth)/(maxHealth+1);

		for(var i = 0; i < maxHealth; i++) {
			var y = rectYPos + gapWidth/1.5;
			var x = rectXPos + i*(gapWidth + heartWidth) + gapWidth;
			var frame = new Frame(x,y,heartWidth, heartWidth);
			self.heartFrames.push(frame);
		}
	};

	self.initHearts();

	// draw the hearts into their frames
	self.drawHearts = function() {
		var rectWidth = canvas.width/5;
		var rectHeight = canvas.height/13;
		var rectYPos = canvas.height/15;
		var rectXPos = canvas.width-rectYPos-rectWidth;
		ctx.fillStyle = heartFrameBackgroundColor;
		ctx.fillRect(
			rectXPos, rectYPos,
			rectWidth, rectHeight);
		for (var i = 0; i < self.health; i++) {
			var frame = self.heartFrames[self.health - i - 1];
			ctx.drawImage(
				HeartImage,
				heartFrame.x, heartFrame.y,
				heartFrame.width, heartFrame.height,
				frame.x, frame.y,
				frame.width, frame.height);
		}
	};


	// main function to draw the player
	// this is called by PhysicsEngine on an interval
	self.draw = function() {
		self.drawHearts();
		var frames, frame;
		switch(self.movement.type) {
			case STANDING:
				if (self.movement.direction === "right") {
					frame = standingRightFrame;
				} else {
					frame = standingLeftFrame;
				}
				if (self.walkHeld) {
					//self.walk(self.movement.direction);
				}
				break;
			case WALKING:
				if (self.movement.direction === "right") {
					frames = walkRightFrames;
				} else {
					frames = walkLeftFrames;
				}
				if (self.movement.step >= frames.length) {
					self.movement.step = 0;
				}
				self.walk(self.movement.direction);
				break;
			case JUMPING:
				if(self.movement.direction === "right") {
					frames = jumpRightFrames;
				} else {
					frames = jumpLeftFrames;
				}
				if (self.movement.step >= frames.length) {
					self.stop();
					if (self.movement.direction === "right") {
						frame = standingRightFrame;
					} else {
						frame = standingLeftFrame;
					}
				} else {
					self.jump();
				}
				break;
			case DUCKING:
				if(self.movement.direction === "right") {
					frames = duckRightFrames;
				} else {
					frames = duckLeftFrames;
				}
				if (self.movement.step >= frames.length) {
					self.movement.step = frames.length - 1;
				} else if (self.movement.step < 0) {
					self.stop();
					if (self.movement.direction === "right") {
						frame = standingRightFrame;
					} else {
						frame = standingLeftFrame;
					}
				}
				break;
			case DYING:
				if (self.movement.direction === "right") {
					frames = dieRightFrames;
				} else {
					frames = dieLeftFrames;
				}
				if (self.movement.step >= frames.length) {
					loseScreen();
				}
				break;
			case HIT:
				if (self.hitDelay > 0) {
					self.hitDelay--;
					if (self.movement.direction === "right") {
						frame = dieRightFrames[0];
					} else {
						frame = dieLeftFrames[0];
					}
				} else {
					self.stop();
					if (self.movement.direction === "right") {
						frame = standingRightFrame;
					} else {
						frame = standingLeftFrame;
					}
				}
				break;
			default: 
				break;
		}

		if (frame === undefined) {
			frame = frames[self.movement.step];
		}

		self.height = sizeMultiplier * frame.height;
		self.width = sizeMultiplier * frame.width;
		engine.detectCollisions();
		ctx.drawImage(
			PlayerSprite,
			frame.x, frame.y,
			frame.width, frame.height,
			self.pos.x, self.pos.y - self.height,
			self.width, self.height);
		if (self.shouldStand) {
			self.movement.step--;
		} else {
			self.movement.step++;
		}
	};

	self.adjustOutOfBounds = function(){
		if(self.pos.x < 0){
			self.pos.x = 0;
		} else if(self.pos.x + self.width > canvas.width) {
			self.pos.x = canvas.width - self.width;
		}
	};

	self.stop = function() {
		if (self.walkHeld) {
			self.movement.type = WALKING;
		} else {
			self.movement.type = STANDING;
		}
		self.movement.step = 0;
		self.shouldStand = false;
	};

	self.walk = function(direction) {
		if(self.movement.direction !== direction ||
			self.movement.type !== WALKING) 
		{
			self.movement.type = WALKING;
			self.movement.direction = direction;
			self.movement.step = 0;
		}

		var directionMultiplier;
		if(self.movement.direction === "right") {
			directionMultiplier = 1;
		} else {
			directionMultiplier = -1;
		}

		self.pos.x += (directionMultiplier * walkSpeed);
		self.adjustOutOfBounds();
	};

	self.jump = function(){
		if (self.movement.type !== JUMPING) {
			self.movement.type = JUMPING;
			self.movement.step = 0;
		} else {
			if (self.walkHeld) {
				var directionMultiplier;
				if(self.movement.direction === "right") {
					directionMultiplier = 1;
				} else {
					directionMultiplier = -1;
				}
				self.pos.x += directionMultiplier * jumpLength;
			}
			if (self.movement.step > jumpRightFrames.length/2){
				self.pos.y += jumpHeight;
			} else{
				self.pos.y -= jumpHeight;
			}

			self.adjustOutOfBounds();
		}
	};

	self.duck = function() {
		if (self.movement.type !== DUCKING) {
			self.movement.type = DUCKING;
			self.movement.step = 0;
		}
	};

	self.getHurt = function() {
		if (self.movement.type === HIT) {
			return;
		}
		if (!godMode) {
			self.health--;
		}
		self.stop();
		if (self.health <= 0) {
			self.die();
		} else if (!self.hit){
			self.movement.type = HIT;
			self.hitDelay = hitDelay;
		}
	};

	self.die = function() {
		self.stop();
		self.isDead = true;
		self.movement.type = DYING;
		self.movement.step = 0;
	};

	self.hasKey = function(index) {
		return self.keys[index];
	}

	self.pickUpKey = function() {
		for (var i = 0;  i < level.keys.length; i++) {
			var key = level.keys[i];
			if (key === undefined) {
				continue;
			}
			if (key.hasCollided()) {
				self.keys.push(key);
				level.keys[i] = undefined;
			}
		}
	};

	self.interact = function() {
		level.gates.forEach(function(gate) {
			gate.tryToUnlock();
		});
		level.tomes.forEach(function(tome) {
			tome.tryToTouch();
		})
		self.pickUpKey();
	}

	self.stop();
};