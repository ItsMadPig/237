/*
 * Aaron Hsu (ahsu1)
 * ahsu1@andrew.cmu.edu
 */
 
// a frame is used to get the exact pixels to border an image
// it is especially useful for sprites and were generated
// using a tool on www.spritecow.com
var Frame = function(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
// sprite containing player images
var PlayerSprite = new Image();
PlayerSprite.src = "images/player.png";

var standingRightFrame = new Frame(1, 1, 12, 48);
var standingLeftFrame = new Frame(262, 50, 12, 48);

var walkRightFrames = [
	new Frame(30, 1, 13, 48),
	new Frame(59, 1, 23, 47),	
	new Frame(88, 1, 24, 47),
	new Frame(117, 1, 19, 47),
	new Frame(146, 1, 12, 48),
	new Frame(175, 1, 16, 48),
	new Frame(204, 1, 25, 47),
	new Frame(233, 1, 25, 46),
	new Frame(262, 1, 18, 46)
];

var walkLeftFrames = [
	new Frame(233, 50, 13, 48),
	new Frame(204, 50, 24, 47),
	new Frame(175, 50, 24, 47),
	new Frame(146, 50, 19, 48),
	new Frame(117, 50, 12, 48),
	new Frame(88, 50, 16, 48),
	new Frame(59, 51, 26, 47),
	new Frame(30, 51, 25, 47),
	new Frame(1, 50, 18, 46)
];

var duckRightFrames = [
	new Frame(1, 99, 13, 48),
	new Frame(30, 104, 17, 41),
	new Frame(59, 112, 19, 35),
	new Frame(88, 118, 24, 28)
];

var duckLeftFrames = [
	new Frame(1, 147, 13, 48),
	new Frame(30, 152, 17, 43),
	new Frame(59, 160, 19, 35),
	new Frame(88, 166, 24, 29)
];

var jumpRightFrames = [
	new Frame(1, 198, 14, 46),
	new Frame(30, 197, 18, 47),
	new Frame(59,208,20,36),
	new Frame(88,196,23,48),
	new Frame(117,209,23,34),
	new Frame(146,206,22,38),
	new Frame(175,202,19,40),
	new Frame(203,202,20,43)
];

var jumpLeftFrames = [
	new Frame(204,247,15,46),
	new Frame(175,246,18,47),
	new Frame(146,257,21,36),
	new Frame(117,245,23,48),
	new Frame(88,258,23,35),
	new Frame(59,255,22,38),
	new Frame(30,251,19,42),
	new Frame(1,251,19,42)
];

var dieRightFrames = [
	new Frame(1,301,36,41),
	new Frame(59,323,39,19)
];

var dieLeftFrames = [
	new Frame(117,301,36,41),
	new Frame(175,323,39,19)
];

// heart image
var HeartImage = new Image();
HeartImage.src = "images/heart.png"
var heartFrameBackgroundColor = "rgba(0, 0, 0, .5)";
var heartFrame = new Frame(0, 0, 200, 183);
var heartFrames = [];

// platform image
var platformImage = new Image();
platformImage.src = "images/platform.png";
var platformFrame = new Frame(0, 0, 40, 10);

// gate image
var gateImage = new Image();
gateImage.src = "images/gate.png";
var gateFrame = new Frame(0, 0, 126, 1357);

// boulders image and frames
var boulderImage = new Image();
boulderImage.src = "images/boulders.png";
var boulderFrames = [
	new Frame(0, 0, 210, 322),
	new Frame(283, 41, 218, 234),
	new Frame(574, 53, 188, 210),
	new Frame(843, 34, 217, 249),
	new Frame(1142, 61, 281, 200),
	new Frame(1522, 51, 215, 217)
];

// left arrow image
var leftArrowImage = new Image();
leftArrowImage.src = "images/arrowLeft.png";
var leftArrowFrame = new Frame (0, 0, 408, 77);
var rightArrowImage = new Image();
rightArrowImage.src = "images/arrowRight.png";
var rightArrowFrame = new Frame(0, 0, 408, 77);

// spikes
var spikeImage = new Image();
spikeImage.src = "images/spikes.png";
var spikeFrame = new Frame(0, 0, 163, 140);

// key
var keyImage = new Image();
keyImage.src = "images/SmallKeySprite.gif";
var keyFrame = new Frame(1, 1, 12, 13);
var keyWidth = 30;
var keyHeight = 20;

//tome image
var tomeImage = new Image();
tomeImage.src = "images/tome.png";
var tomeFrame = new Frame (0, 0, 804, 1052);
