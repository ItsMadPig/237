/*
 * Aaron Hsu (ahsu1)
 * ahsu1@andrew.cmu.edu
 */
 
// global var of current level
var level;
var groundHeight = 50;
var message = "";
// storing level information

var Level = function(image, index) {
	var self = this;
	self.index = index;
	self.image = image;
	self.isLoaded = false;
	self.height = 0;
	self.width = 0;
	
	self.bullets = [];
	self.platforms = [];
	self.completed = false;
	self.distanceFromEdge = 10;
	self.image.onload = function() {
		self.isLoaded = true;
	}

	//tells if user's turn or waiting
	var displayMessage = function(msg) {
		ctx.font="bold 20px Verdana";
		ctx.fillStyle = "yellow";
		ctx.fillText(msg, alignX-20, 20);
	}

	//draws the types of weapons
	var drawButtons = function(){
		var xPos;
		var frame;
		ctx.drawImage(buttonImage,
					  nButtonFrame[0].x, nButtonFrame[0].y,
					  nButtonFrame[0].width, nButtonFrame[0].height, 
					  alignX, canvas.height/7, 
					  nButtonFrame[0].width/2, nButtonFrame[0].height/2);

		ctx.drawImage(buttonImage, 
					  fButtonFrame[0].x, fButtonFrame[0].y,
					  fButtonFrame[0].width, fButtonFrame[0].height, 
					  alignX, canvas.height/7 + fButtonFrame[0].height/2, 
					  nButtonFrame[0].width/2, nButtonFrame[0].height/2);

		ctx.drawImage(buttonImage, 
			          lButtonFrame[0].x, lButtonFrame[0].y,
					  lButtonFrame[0].width, lButtonFrame[0].height, 
					  alignX, canvas.height/7 + nButtonFrame[0].height, 
					  nButtonFrame[0].width/2, nButtonFrame[0].height/2);

		switch(hoveredButtonNumber){
			case 1:
				ctx.drawImage(buttonImage,
				  nButtonFrame[1].x, nButtonFrame[1].y,
				  nButtonFrame[1].width, nButtonFrame[1].height, 
				  alignX, canvas.height/7, 
				  nButtonFrame[1].width/2, nButtonFrame[1].height/2);
				break;
			case 2:
				ctx.drawImage(buttonImage,
				  fButtonFrame[1].x, fButtonFrame[1].y,
				  fButtonFrame[1].width, fButtonFrame[1].height, 
				  alignX, canvas.height/7 + fButtonFrame[0].height/2, 
				  fButtonFrame[1].width/2, fButtonFrame[1].height/2);
				break;
			case 3:
				ctx.drawImage(buttonImage,
				  lButtonFrame[1].x, lButtonFrame[1].y,
				  lButtonFrame[1].width, lButtonFrame[1].height, 
				  alignX, canvas.height/7 + nButtonFrame[0].height, 
				  lButtonFrame[1].width/2, lButtonFrame[1].height/2);
				break;
			default:
				break;
			}



		switch(clickedButtonNumber){
			case 1:
				ctx.drawImage(buttonImage,
				  nButtonFrame[2].x, nButtonFrame[2].y,
				  nButtonFrame[2].width, nButtonFrame[2].height, 
				  alignX, canvas.height/7, 
				  nButtonFrame[2].width/2, nButtonFrame[2].height/2);

				break;
			case 2:
				ctx.drawImage(buttonImage,
				  fButtonFrame[2].x, fButtonFrame[2].y,
				  fButtonFrame[2].width, fButtonFrame[2].height, 
				  alignX, canvas.height/7 + fButtonFrame[0].height/2, 
				  fButtonFrame[2].width/2, fButtonFrame[2].height/2);
				break;

			case 3:
				ctx.drawImage(buttonImage,
				  lButtonFrame[2].x, lButtonFrame[2].y,
				  lButtonFrame[2].width, lButtonFrame[2].height, 
				  alignX, canvas.height/7 + nButtonFrame[0].height, 
				  lButtonFrame[2].width/2, lButtonFrame[2].height/2);
				break;
			default:
				break;
			}
	}

	// called by PhysicsEngine on an interval
	self.draw = function() {
		if (!self.isLoaded) {
			return;
		}
		ctx.drawImage(
			self.image,
			0, 0, self.image.width, self.image.height,
			0, 0, canvas.width, canvas.height);

		self.platforms.forEach(function(plat) {
			plat.update();
			plat.draw();
		});

		self.bullets.forEach(function(bullet){
			bullet.update();
			bullet.draw();
			if (self.bullets === []){
				return;
			}
			if ((self.bullets[0]).x >= canvas.width || 
				(self.bullets[0]).y >= (canvas.height-groundHeight)){
				self.bullets.splice(0,1);
			}
		})

		drawButtons();
		displayMessage(message);

		// used for a custom level animation such as the text that rises
		// in the 3rd level
	};

	// all platforms, boulders, spikes, gates, keys, tomes, and arrows
	// are created on a level using the following create functions
	self.createPlatform = function(x, y, width, height) {
		var platform = new Item(x, y, width, height, platformImage, platformFrame);
		self.platforms.push(platform);
	};

	self.createLeftRightMovablePlatform = function(x, y, width, height, leftX, rightX, speed) {
		var platform = new Item(x, y, width, height, platformImage, platformFrame);
		platform.leftX = leftX;
		platform.rightX = rightX;
		platform.speed = speed;
		platform.direction = 1;
		platform.update = function() {
			if (this.x < this.leftX) {
				this.direction = 1;
			} else if (this.x > this.rightX) {
				this.direction = -1;
			}
			this.x += this.direction * this.speed;
		}
		self.platforms.push(platform);
	};

	self.createUpDownMovablePlatform = function(x, y, width, height, botY, topY, speed) {
		var platform = new Item(x, y, width, height, platformImage, platformFrame);
		platform.topY = topY;
		platform.botY = botY;
		platform.speed = speed;
		platform.direction = 1;
		platform.update = function() {
			if (this.y < this.botY) {
				this.direction = 1;
			} else if (this.y > this.topY) {
				this.direction = -1;
			}
			this.y += this.direction * this.speed;
		}
		self.platforms.push(platform);
	};

	self.createBullets = function(x, y, width, height, type, angle, direction, power){
		switch(type){
			case 0: // normal bullet
				var bulletFrame = nBulletFrame;
				break;
			case 1: // fire bullet
				var bulletFrame = fBulletFrame;
				break;
			case 2: // light bullet
				var bulletFrame = lBulletFrame;
				break;
			default:
				break;
		}

		var bullet = new Item(x, y, width, height, PlayerSprite, bulletFrame);
		/* Find the angle the player is aiming at */
		var theta;

		switch(angle) {
			case 0:
				theta = 0;
				break;

			case 1:
				theta = Math.PI/6;
				break;

			case 2:
				theta = Math.PI/4;
				break;

			case 3:
				theta = Math.PI/3;
				break;

			case 4:
				theta = Math.PI/2;
				break;
		}

		/* If the player is facing left, the angle is reflected
		   across the y axis */

		if (direction==="left")
		{
			theta = Math.PI-theta;
		}

		/* To start with */
		bullet.type = type;
		bullet.vx = power * Math.cos(theta);
		bullet.vy = -power * Math.sin(theta);
		bullet.ax = 0;
		bullet.ay = gravityStrength;
		bullet.x = x + (4*bullet.vx);
		if (direction === "left"){
			bullet.x += (2*bullet.vx);
		}
		bullet.y = y + (4*bullet.vy);

		bullet.update = function(){
			this.vx = this.vx + this.ax;
			this.vy = this.vy + this.ay;
			this.x += this.vx;
			this.y += this.vy;
		}
		self.bullets.push(bullet);
	}

	// create levels based on level index, starting from 0
	self.init = function() {
	switch (self.index) {
			case 0: // title screen
				self.completed = true;
				self.createPlatform(0, canvas.height - groundHeight, canvas.width, groundHeight);
				break;
			case 1: // control screen
				self.completed = true;
				self.createPlatform(0, canvas.height - groundHeight, canvas.width, groundHeight);
				break;
			case 2: // cave screen
				self.createPlatform(0, canvas.height - groundHeight, canvas.width, groundHeight);
				self.textImage = new Image();
				self.textImage.src = "./level1text.png";
				self.distanceFromEdge = 180;
				break;
			case 3: // first level
                self.completed = true;
                var width = 60;
                var height = 10;
                self.createPlatform(0, canvas.height - groundHeight, 300, groundHeight);
                self.createPlatform(350, canvas.height - groundHeight, 200, groundHeight);
                self.createPlatform(600, canvas.height - groundHeight, 200, groundHeight);
                //self.createBoulder(280, 10, false);
                //self.createBoulder(575, 15, false);
                break;

            case 4: // second level same as first with arrows
             	self.completed = true;
				self.createPlatform(0, canvas.height - groundHeight, canvas.width, groundHeight);
			    var width = 60;
                var height = 40;
                self.createPlatform(canvas.width/6, canvas.height*4/6, width, height);
                self.createPlatform(canvas.width*2/6, canvas.height*3/6, width, height);
                self.createPlatform(canvas.width*3/6, canvas.height*2/6, width, height);
                self.createPlatform(canvas.width*4/6, canvas.height*1/6, width, height);
                self.createPlatform(canvas.width*4/6 + width, canvas.height/6,
                                     width, (height+canvas.height));
				break;

             case 5: //third stage
				self.completed = true;
                self.createPlatform(0, canvas.height - groundHeight, 200, groundHeight);
                
                
                self.createPlatform(700, canvas.height - groundHeight,100, groundHeight);
				self.createPlatform(250, canvas.height - 2*groundHeight, 80, 30);
				self.createPlatform(400, canvas.height - 3*groundHeight, 80, 30);
				self.createPlatform(550, canvas.height - 4*groundHeight, 80, 30);
				self.createPlatform(300, canvas.height - 5.5*groundHeight, 80, 30);
                break;
            case 6: // fourth stage
            	self.completed = true;
            	self.createPlatform(0, canvas.height - groundHeight, 50, groundHeight);
            	self.createPlatform(700, canvas.height - groundHeight,100, groundHeight);
               
                self.createLeftRightMovablePlatform(90, 300, 100, groundHeight/2, 90, 240, 5);
                self.createUpDownMovablePlatform(400, 300, 100, groundHeight/2,200, 300, 7);
                self.createPlatform(550,130,100,groundHeight/2);
               
            	break;
            case 7: // last stage
				self.completed = false;
				var width = 15;
				var height = 30;
				var i;
				self.createPlatform(0, canvas.height - groundHeight, 150, groundHeight);
				for (i = 1.1; i < 6; i+=0.1){
					self.createPlatform(canvas.width*i/6.2, canvas.height-i*groundHeight*0.8, width, 2*i*height);
				}
				self.createTome(canvas.width*(i-0.3)/6.2, canvas.height-(i-0.3)*groundHeight*0.8);
                break;
			default: // create no platforms/obstacles
				self.completed = true;
				self.createPlatform(0, canvas.height - groundHeight, canvas.width, groundHeight);
				break;
		}
	};

	self.init();
};

var initLevel = function() {
	var backgroundImage = new Image();
	backgroundImage.src = levelBackgrounds[levelIndex];
	level = new Level(backgroundImage, levelIndex);
}