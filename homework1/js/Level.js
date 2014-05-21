/*
 * Aaron Hsu (ahsu1)
 * ahsu1@andrew.cmu.edu
 */
 
// global var of current level
var level;
var groundHeight = 50;

// storing level information
var levelIndex = 0;

var levelBackgrounds = [
	"images/intro.png",
	"images/controls.png",
	"images/level1notext.png",
	"images/level2.png",
	"images/level2.png",
	"images/level2.png",
	"images/level2.png",
	"images/level2.png",
	"images/win.png",
	"images/lose.png"
];

var Level = function(image, index) {
	var self = this;
	self.index = index;
	self.image = image;
	self.isLoaded = false;
	self.height = 0;
	self.width = 0;
	
	self.boulders = [];
	self.platforms = [];
	self.gates = [];
	self.arrows = [];
	self.spikes = [];
	self.tomes = [];
	self.keys = [];
	self.completed = false;
	self.timeStep = 0;
	self.distanceFromEdge = 10;

	self.image.onload = function() {
		self.isLoaded = true;
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

		self.gates.forEach(function(gate) {
			gate.update();
			gate.draw();
		});

		self.keys.forEach(function(key) {
			if (key !== undefined) {
				key.draw();
			}
		})

		self.boulders.forEach(function(boulder) {
			boulder.update();
			boulder.draw();
		});

		self.arrows.forEach(function(arrow) {
			arrow.update();
			arrow.draw();
		});

		self.spikes.forEach(function(spike) {
			spike.draw();
		});

		self.tomes.forEach(function(tome){
			tome.update();
			tome.draw();
		})

		// used for a custom level animation such as the text that rises
		// in the 3rd level
		self.animate();
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

	self.createGate = function(x) {
		var gate = new Item(x, 0, 20, canvas.height-groundHeight, gateImage, gateFrame);
		gate.locked = true;
		gate.distanceFromEdge = 15;
		gate.riseSpeed = 8;

		gate.createKey = function(x, y) {
			this.key = new Item(x, y - keyHeight, keyWidth, keyHeight, keyImage, keyFrame);
			this.key.index = self.keys.length;
			this.index = this.key.index;
			self.keys.push(this.key);
		}

		gate.update = function() {
			if (!this.locked && this.y + this.height >= 0) {
				this.y -= this.riseSpeed;
			}
		};

		gate.tryToUnlock = function() {
			if (!this.locked) {
				return;
			} else if (player.pos.x + player.width + this.distanceFromEdge > this.x ) {
				if (this.key !== undefined) {
					if (player.hasKey(this.index)) {
						this.locked = false;
					}
				} else {
					this.locked = false;
				}
			}
		}

		self.gates.push(gate);
		return gate;
	};

	self.createSpikes = function(x, length) {
		var spike = new Item(x, canvas.height - groundHeight/2, length, groundHeight/2, spikeImage, spikeFrame);
		spike.draw = function() {
			ctx.fillStyle = "black";
			ctx.fillRect(
				this.x, canvas.height - groundHeight,
				this.width, this.height*2);
			ctx.drawImage(
            	this.image,
            	this.frame.x, this.frame.y,
            	this.frame.width, this.frame.height,
            	this.x, this.y,
            	this.width, this.height);
		}
		self.spikes.push(spike);
	};

	self.createArrow = function(y, speed) {
		var frame = leftArrowFrame;
		var arrow = new Item(canvas.width - 45, y, 45, 20, leftArrowImage, frame);
		arrow.speed = speed;
		arrow.update = function() {
			if (this.x > 0) {
				this.x -= this.speed;
			} else{
				this.x = canvas.width - this.width;
				this.y = player.pos.y - player.height + 10;
			}
		};

		self.arrows.push(arrow);
	};

	self.createBoulder = function(x, speed, rotate) {
		var randomIndex = Math.floor((Math.random()*boulderFrames.length));
		var frame = boulderFrames[randomIndex];
		var boulder = new Item(x, 0, 45, 45, boulderImage, frame);
		boulder.speed = speed;
		boulder.rotation = 0;
		if (rotate) {
			boulder.angle = Math.PI/8;
		} else {
			boulder.angle = 0;
		}
		boulder.update = function() {
			if (this.y + this.height > canvas.height - groundHeight) {
				this.y = 0;
			} else {
				this.y += this.speed;
			}
		};

		// this function uses context translation to rotate the boulders as they fall
		// mostly to demonstrate that we know how to translate and rotate a context
		boulder.draw = function() {
			ctx.save();
			ctx.translate(this.x + this.width/2, this.y + this.height/2);
			ctx.rotate(this.rotation);
			ctx.drawImage(
				this.image,
				this.frame.x, this.frame.y,
				this.frame.width, this.frame.height,
				0, 0,
				this.width, this.height);
			ctx.restore();
			this.rotation += this.angle;
		};
		self.boulders.push(boulder);
	};

	self.createTome = function(x,y){
		var frame = tomeFrame;
		var tome = new Item(x, y - 60, 45, 60, tomeImage, frame);
		tome.distanceFromEdge = 15;
		tome.touched = false;
		tome.tryToTouch = function() {
			if ((player.pos.x + player.width + tome.distanceFromEdge) > tome.x ) {
				tome.touched = true;
			}
		};
		tome.update = function() {
			if (tome.touched) {
				winScreen();
			}
		};
		self.tomes.push(tome);
	}

	// checks if player is to the left of the screen and the level is
	// completed
	self.isCompleted = function() {
		return (player.pos.x >= canvas.width - player.width - self.distanceFromEdge
			&& self.completed);
	};

	self.animate = function() {};

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
				self.textImage.src = "images/level1text.png";
				self.distanceFromEdge = 180;
				self.textImage.onload  = function() {
					// the animate function raises a text image
					// the level is completed when the text gets to the top
					self.animate = function() {
						if (canvas.height - self.timeStep*2 < 0) {
							self.completed = true;
							self.timeStep--;
							ctx.drawImage(
								self.textImage,
								0, canvas.height- self.timeStep*2, canvas.width, canvas.height);
							return;
						} else {
							ctx.drawImage(
								self.textImage,
								0, canvas.height- self.timeStep*2, canvas.width, canvas.height);
						}
						self.timeStep++;
					};
				}
				break;
			case 3: // first level
                self.completed = true;
                var width = 60;
                var height = 10;
                self.createPlatform(0, canvas.height - groundHeight, 300, groundHeight);
                self.createSpikes(300, 50);
                self.createPlatform(350, canvas.height - groundHeight, 200, groundHeight);
                self.createSpikes(550, 50);
                self.createPlatform(600, canvas.height - groundHeight, 200, groundHeight);
                self.createBoulder(280, 10, false);
                self.createBoulder(575, 15, false);
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
                self.createBoulder(canvas.width*5/12, 10, true);
              	self.createArrow(canvas.height/2, 15);
				break;

             case 5: //third stage
				self.completed = true;
                self.createPlatform(0, canvas.height - groundHeight, 200, groundHeight);
                
                for (var i = 200; i< 700; i+=50){
                	self.createSpikes(i, 50);
                }
                self.createPlatform(700, canvas.height - groundHeight,100, groundHeight);
    			
				var gate = self.createGate(200);
				gate.createKey(100, canvas.height - groundHeight);
				var gate = self.createGate(canvas.width - 20);
				gate.createKey(325, canvas.height - 5.5*groundHeight);

				self.createPlatform(250, canvas.height - 2*groundHeight, 80, 30);
				self.createPlatform(400, canvas.height - 3*groundHeight, 80, 30);
				self.createPlatform(550, canvas.height - 4*groundHeight, 80, 30);
				self.createPlatform(300, canvas.height - 5.5*groundHeight, 80, 30);

				self.createArrow(canvas.height/2,7);
                
                break;
            case 6: // fourth stage
            	self.completed = true;
            	self.createPlatform(0, canvas.height - groundHeight, 50, groundHeight);
            	self.createPlatform(700, canvas.height - groundHeight,100, groundHeight);
                for (var i = 50; i< 700; i+=50){
                	self.createSpikes(i, 50);
                }
                self.createLeftRightMovablePlatform(90, 300, 100, groundHeight/2, 90, 240, 5);
                self.createUpDownMovablePlatform(400, 300, 100, groundHeight/2,200, 300, 7);
                self.createPlatform(550,130,100,groundHeight/2);
                var gate = self.createGate(canvas.width - 20);
                gate.createKey(575, 130);

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

var initNextLevel = function() {
	var image = new Image();
	image.src = levelBackgrounds[levelIndex];
	level = new Level(image, levelIndex);
	// move player to left side of the screen
	player.pos.x = 0;
	player.pos.y = canvas.height - groundHeight;
	player.stop();
	levelIndex++;
}

var loseScreen = function() {
	levelIndex = levelBackgrounds.length - 1;
	initNextLevel();
	levelIndex = 0;
	player = new Player(0, canvas.height - groundHeight);
};

var winScreen = function() {
	levelIndex = levelBackgrounds.length - 2;
	initNextLevel();
	levelIndex = 0;
	player = new Player(0, canvas.height - groundHeight);
};
