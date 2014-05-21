/*
 * Aaron Hsu (ahsu1)
 * ahsu1@andrew.cmu.edu
 */

// main player global
var player;

//Global for the game loser
var loser = -1;

// player attributes
var walkSpeed = 7;
var runSpeed = 12;
var jumpLength = 15;
var jumpHeight = 20 + gravityStrength;
var maxHealth = 5;
var sizeMultiplier = 1.0;

// vars for bullet types
var NORMAL = 0;
var FIRE = 1;
var LIGHTNING = 2;

//bullet attributes
var POWER = 1;
var INITPOWER = 8;
var POWERLIMIT = 35;
var OILLIMIT = 150;
var OILPERMOVE = 5;

// vars for player states
var STANDING = 0;
var WALKING = 1;
var AIMUP = 2;
var AIMDOWN = 3;
var DYING = 4;
var HIT = 5;
var CHARGING = 6;


// main function to create a player object
var Player = function(xPos, yPos, id) {
	var self = this;
	//self.keyCode;
	self.pos = {
		"x": xPos,
		"y": yPos
	};
	self.bullet = {
		"charging": false,
		"type": NORMAL,
		"power": 0,
	}
	self.id = id;
	self.angleFrame = 0;
	self.walkingFrame = 0;
	self.movement = {
		"type": STANDING,
		"step": 0, // this is the index in a array of frames for a particular action
		"direction": "right"
	};

	self.height = standingRightFrame.height;
	self.width = standingRightFrame.width;
	self.health = maxHealth;
	self.isDead = false;
	self.shouldExplode = false;
	self.explosionStep = 0;
	self.hit = false;
	self.hitDelay = 0;
	self.walkHeld = false;
	self.oilLeft = OILLIMIT;
	self.keys = [];

	switch(self.id === myID)	{
		case true:
		self.sprite = PlayerSprite;

		case false:
		self.sprite = OppSprite;
	}

	// initialize the frame of the hearts depending on max health
	self.initHearts = function() {
		//draw hearts in top right corner
		self.heartFrames = [];
		var rectWidth = canvas.width/6;
		var rectHeight = canvas.height/15;
		var rectYPos = canvas.height/16;
		var rectXPos;

		if (self.id === myID)	{
			rectXPos = rectYPos;
		} else {
			rectXPos = canvas.width-rectYPos-rectWidth;
		}

		ctx.fillStyle = heartFrameBackgroundColor;
		ctx.fillRect(
			rectXPos, rectYPos,
			rectWidth, rectHeight);
		var heartWidth = rectWidth/(maxHealth + 2);
		var gapWidth = (rectWidth-maxHealth*heartWidth)/(maxHealth+1);

		for(var i = 0; i < maxHealth; i++) {
			var y = rectYPos + gapWidth/2;
			var x = rectXPos + i*(gapWidth + heartWidth) + gapWidth;
			var frame = new Frame(x,y,heartWidth, heartWidth);
			self.heartFrames.push(frame);
		}
	};

	self.initHearts();

	// draw the hearts into their frames
	self.drawHearts = function() {
		var rectWidth = canvas.width/6;
		var rectHeight = canvas.height/15;
		var rectYPos = canvas.height/16;
		var rectXPos;
		if (self.id === myID)	{
			rectXPos = rectYPos;
		} else 	{
			rectXPos = canvas.width-rectYPos-rectWidth;
		}

		ctx.fillStyle = heartFrameBackgroundColor;
		ctx.fillRect(
			rectXPos, rectYPos,
			rectWidth, rectHeight);

		for (var i = 0; i < self.health; i++) {
			var frame = self.heartFrames[self.health - i - 1];
			ctx.drawImage(
				heartImage,
				heartFrame.x, heartFrame.y,
				heartFrame.width, heartFrame.height,
				frame.x, frame.y,
				frame.width*3/4, frame.height*3/4);
		}
	};

	self.drawExplode = function(){
		frames = explosionFrames;
		frame = frames[self.explosionStep];
		if (self.explosionStep >= frames.length-1){
			self.shouldExplode = false;
		} else{
			self.explosionStep += 1;
		}

		ctx.drawImage(
			PlayerSprite,
			frame.x, frame.y,
			frame.width, frame.height,
			self.pos.x, self.pos.y - self.height,
			frame.width, frame.height);
	}

	self.drawPowerBar = function(){
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(player.pos.x, player.pos.y - 1.5*player.height,
					player.width,5);
		ctx.lineWidth = 4;
		ctx.strokeStyle = "#000000";
		ctx.strokeRect(player.pos.x, player.pos.y - 1.5*player.height,
					player.width,5);
		ctx.fillStyle = "#FFFF01"
		ctx.fillRect(player.pos.x, player.pos.y - 1.5*player.height,
					player.width/POWERLIMIT * player.bullet.power,5)
	}

	self.drawOilBar = function(){
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(player.pos.x, player.pos.y + 0.5*player.height,
					player.width,5);
		ctx.lineWidth = 4;
		ctx.strokeStyle = "#000000";
		ctx.strokeRect(player.pos.x, player.pos.y + 0.5*player.height,
					player.width,5);
		ctx.fillStyle = "#06D62C"
		ctx.fillRect(player.pos.x, player.pos.y + 0.5*player.height,
					player.width/OILLIMIT * player.oilLeft,5)
	}

	// main function to draw the player
	// this is called by PhysicsEngine on an interval
	self.draw = function() {
		self.drawHearts();
		var frames, frame;
		switch(self.movement.type) {
			case STANDING:

				if (self.movement.direction === "right") {
					frame = rightFrames[self.angleFrame][0];
				} else {
					frame = leftFrames[self.angleFrame][0];
				}

				break;
			case WALKING:
				if (self.movement.direction === "right") {
					frames = rightFrames[self.angleFrame];
				} else {
					frames = leftFrames[self.angleFrame];
				}
				if (self.movement.step >= frames.length-1) {
				self.movement.step = 0;
		}
				self.walk(self.movement.direction);
				self.drawOilBar();
				break;
			case DYING:
				if (self.movement.direction === "right") {
					frames = dieRightFrames;
				} else {
					frames = dieLeftFrames;
				}
				if (self.movement.step >= frames.length-1) {
					//game over
					//implement

				} else{
					self.movement.step +=1;
				}
				break;
			case HIT:
				if (self.movement.step > 0) {
					self.movement.step--;
					if (self.movement.direction === "right") {
						frame = hurtRightFrames[self.movement.step];
					} else {
						frame = hurtLeftFrames[self.movement.step];
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
			case CHARGING:
				self.drawPowerBar();
				if (self.movement.direction === "right") {
					frame = rightFrames[self.angleFrame][0];
				} else {
					frame = leftFrames[self.angleFrame][0];
				}

				self.charge();

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


		self.sprite = PlayerSprite;

		switch(self.id === myID)	{
			case true:
			self.sprite = PlayerSprite;
			break;

			case false:
			self.sprite = OppSprite;
			break;
		}
		ctx.drawImage(
			self.sprite,
			frame.x, frame.y,
			frame.width, frame.height,
			self.pos.x, self.pos.y - self.height,
			self.width, self.height);

		if (self.shouldExplode){
			self.drawExplode();
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
		if (self.bullet.charging){
			self.movement.type = CHARGING;
		}
		self.movement.step = 0;
	};

	self.walk = function(direction) {
		if(self.movement.direction !== direction ||
			self.movement.type !== WALKING) 
		{
			self.movement.type = WALKING;
			self.movement.direction = direction;
			self.movement.step = 0;
		} else{
			self.movement.step += 1;
		}

		var directionMultiplier;
		if(self.movement.direction === "right") {
			directionMultiplier = 1;
		} else {
			directionMultiplier = -1;
		}

		self.pos.x += (directionMultiplier * walkSpeed);
		self.oilLeft -= OILPERMOVE;
		self.adjustOutOfBounds();
		if (self.oilLeft <=0){
			self.movement.type = STANDING;
			self.walkHeld = false;
		}
	};

	self.aimUp = function(){
		if (self.angleFrame >= (rightFrames.length - 1)){
			self.angleFrame = rightFrames.length-1
		} else{
			self.angleFrame +=1;
		}
		self.adjustOutOfBounds();
	};

	self.aimDown = function() {
		if (self.angleFrame <= 0){
			self.angleFrame = 0;
		} else{
			self.angleFrame -= 1;
		}
		self.adjustOutOfBounds();
	};

	self.getHurt = function(bullet) {
		if (self.movement.type === HIT) {
			return;
		}
		if (bullet.type === 0){
			self.health--;
		} else if (bullet.type === 1){
			self.health -= 2;
		} else {
			self.health -=2;
        	ctx.drawImage(lightningImage,
	            lightningFrame.x, lightningFrame.y,
	            lightningFrame.width, lightningFrame.height,
	            self.pos.x, 0,
	            lightningFrame.width, lightningFrame.height/3);
	    	}



		self.stop();
		if (self.health <= 0) {
			self.die();
		} else if (!self.hit){
			self.movement.type = HIT;
			self.movement.step = dieRightFrames.length -1;
		}
	};

	self.die = function() {
		self.isDead = true;
		self.movement.type = DYING;
		self.movement.step = 0;
		self.shouldExplode = true;
		loser = self.id;
	};

	self.charge = function(direction){
		if (self.bullet.power < POWERLIMIT){
			self.bullet.power += POWER;
		}
		self.movement.type = CHARGING;
	}

	self.fire = function(){
		self.movement.type = STANDING;
		send();
		level.createBullets(player.pos.x + player.width/2,
							player.pos.y - player.height*0.8,
							12,12, player.bullet.type, player.angleFrame, 
							player.movement.direction, player.bullet.power);
		self.oilLeft = OILLIMIT;
	}

	self.stop();
};
