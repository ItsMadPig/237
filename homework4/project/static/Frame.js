
 
// a frame is used to get the exact pixels to border an image
// it is especially useful for sprites and were generated
// using a tool on www.spritecow.com
var Frame = function(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
// sprite containing player Images
var PlayerSprite = new Image();
PlayerSprite.src = "./giridao.png";

var OppSprite = new Image();
OppSprite.src = "./giridao2.png";


var nBulletFrame = new Frame(478, 709, 12, 12);
var fBulletFrame = new Frame(421, 709, 12, 12);
var lBulletFrame = new Frame(402, 709, 12, 12);

var standingRightFrame = new Frame(12, 10, 63, 48);
var standingLeftFrame = new Frame(12, 71, 63, 48);

var rightFrames =
[
	//walkRightFrames
	[
		new Frame(12, 10, 63, 48),
		new Frame(88, 10, 63, 48),
		new Frame(156, 10, 63, 48),
		new Frame(227, 10, 63, 48),
		new Frame(296, 10, 63, 48),
		new Frame(369, 11, 63, 48),
		new Frame(443, 12, 63, 48)
	],

	//thirtyRightFrames
	[
		new Frame(7, 140, 61, 50),
		new Frame(83, 141, 61, 49),
		new Frame(151, 140, 61, 50),
		new Frame(222, 141, 61, 49),
		new Frame(291, 141, 63, 49),
		new Frame(364, 142, 62, 49),
		new Frame(438, 143, 62, 49)
	],

	//fourtyFiveRightFrames
	[
		new Frame(8, 268, 61, 52),
		new Frame(84, 268, 61, 52),
		new Frame(152, 267, 61, 53),
		new Frame(223, 268, 61, 52),
		new Frame(292, 268, 61, 52),
		new Frame(365, 269, 62, 52),
		new Frame(439, 269, 62, 53)
	],

	//sixtyRightFrames
	[
		new Frame(7, 397, 61, 55),
		new Frame(83, 397, 61, 55),
		new Frame(151, 396, 61, 56),
		new Frame(222, 397, 61, 55),
		new Frame(291, 396, 61, 56),
		new Frame(364, 398, 62, 55),
		new Frame(438, 399, 62, 55)
	],

	//ninetyRightFrames
	[
		new Frame(7, 535, 61, 59),
		new Frame(83, 536, 61, 58),
		new Frame(151, 536, 61, 58),
		new Frame(222, 536, 61, 58),
		new Frame(291, 536, 61, 58),
		new Frame(364, 536, 62, 59),
		new Frame(438, 536, 62, 60)
	]
]

//walkLeftFrames
var leftFrames = 
[
	[
		new Frame(12, 71, 63, 48),
		new Frame(83, 71, 63, 48),
		new Frame(153, 71, 63, 48),
		new Frame(227, 71, 63, 48),
		new Frame(300, 70, 63, 48),
		new Frame(371, 69, 63, 48),
		new Frame(443, 69, 63, 48)
	],

	//thirtyLeftFrames
	[
		new Frame(8, 209, 62, 50),
		new Frame(80, 210, 61, 49),
		new Frame(150, 209, 61, 50),
		new Frame(223, 210, 62, 49),
		new Frame(297, 210, 61, 48),
		new Frame(367, 208, 62, 49),
		new Frame(439, 208, 62, 49)
	],

	//fourtyFiveLeftFrames
	[
		new Frame(10, 329, 61, 52),
		new Frame(81, 329, 61, 52),
		new Frame(151, 328, 61, 53),
		new Frame(225, 329, 61, 52),
		new Frame(298, 327, 61, 53),
		new Frame(368, 327, 62, 52),
		new Frame(440, 327, 62, 52)
	],

	//sixtyLeftFrames
	[
		new Frame(9, 457, 61, 56),
		new Frame(80, 459, 61, 54),
		new Frame(150, 458, 61, 55),
		new Frame(224, 458, 61, 55),
		new Frame(295, 459, 61, 55),
		new Frame(367, 459, 62, 55),
		new Frame(437, 458, 62, 55)
	],

	//ninetyLeftFrames
	[
		new Frame(6, 613, 61, 58),
		new Frame(77, 613, 61, 58),
		new Frame(147, 613, 61, 58),
		new Frame(221, 613, 61, 58),
		new Frame(294, 612, 61, 58),
		new Frame(364, 610, 62, 59),
		new Frame(436, 610, 62, 59)
	],
]

var hurtRightFrames = [
	new Frame(17, 966, 61, 47),
	new Frame(84, 965, 61, 48),
	new Frame(151, 962, 61, 51),
	new Frame(219, 962, 61, 51),
	new Frame(288, 962, 61, 51),
	new Frame(356, 962, 61, 51),
	new Frame(426, 961, 61, 52)
];

var hurtLeftFrames = [
	new Frame(427, 1039, 61, 46),
	new Frame(360, 1037, 61, 48),
	new Frame(293, 1033, 61, 52),
	new Frame(225, 1031, 61, 54),
	new Frame(156, 1032, 61, 53),
	new Frame(88, 1035, 61, 50),
	new Frame(19, 1033, 60, 52)
];


var dieRightFrames = [
	new Frame(22, 871, 61, 23),
	new Frame(89, 867, 61, 27),
	new Frame(156, 856, 61, 38),
	new Frame(224, 859, 61, 35),
	new Frame(293, 863, 61, 31),
	new Frame(361, 864, 61, 30),
	new Frame(431, 864, 61, 30)
];

var dieLeftFrames = [
	new Frame(18, 916, 61, 30),
	new Frame(88, 916, 61, 30),
	new Frame(156, 915, 61, 31),
	new Frame(225, 911, 61, 35),
	new Frame(293, 907, 61, 39),
	new Frame(360, 919, 61, 27),
	new Frame(427, 923, 61, 23)
];

var explosionFrames = [
	new Frame(530, 10, 68, 56),
	new Frame(610, 11, 66, 54),	
	new Frame(530, 10, 68, 56),
	new Frame(610, 11, 66, 54),
	new Frame(530, 10, 68, 56),
	new Frame(610, 11, 66, 54)
];

var levelBackgrounds = [
	"./background0.jpg",
	"./background1.png",
	"./background2.jpg",
	"./background3.jpg",
	"./background4.jpg",
	"./background5.jpg"
];

//background image

var backgroundFrame = new Frame(0, 0, 1000, 224);

//button image
var buttonImage = new Image();
buttonImage.src = "./button.png";
var nButtonFrame = 
[
	new Frame(81, 33, 198, 70),
	new Frame(81, 112, 198, 70),
	new Frame(81, 194, 198, 70)
];

var fButtonFrame = 
[
	new Frame(81, 279, 198, 70),
	new Frame(81, 361, 198, 70),
	new Frame(81, 441, 198, 70)
];

var lButtonFrame = 
[
	new Frame(81, 605, 198, 70),
	new Frame(81, 525, 198, 70),
	new Frame(81, 686, 198, 70)
];


//lightning image
var lightningImage = new Image();
lightningImage.src = "./lightning.png";
var lightningFrame = new Frame(0, 0, 310, 1235);

// heart image
var heartImage = new Image();
heartImage.src = "./betterHeart.png";
var heartFrameBackgroundColor = "rgba(0, 0, 0, .5)";
var heartFrame = new Frame(0, 0, 200, 183);
var heartFrames = [];

// platform image
var platformImage = new Image();
platformImage.src = "./platform.png";
var platformFrame = new Frame(0, 0, 40, 10);
