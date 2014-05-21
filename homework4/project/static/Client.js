
var myID, oppID;
var levelIndex;
function getID(){
         canvas = document.getElementById("myCanvas");
            ctx = canvas.getContext("2d");
        ctx.font="bold 20px Verdana";
        ctx.fillStyle = "yellow";
        ctx.fillText("Waiting..", canvas.width/2, 20);
	$.ajax({
    	type: "get",
  		url: "/getID",
  		success: function(data) {
			myID = data.playerID;
			oppID = data.player2ID;
            player1 = new Player(0, canvas.height - groundHeight,1);
            player2 = new Player(1100, canvas.height - groundHeight,2);
            player2.movement.direction = "left";
            levelIndex = data.levelIndex;
            if (data.youFirst){
                message = "YOUR TURN!";
                player = player1
            } else{
                waitMode = true;
                player = player2
            }

            runGame();
            getCurrentState();
            if (myID === 2){
                message = "Waiting.."
                getCurrentBullet();
            }
        }
  	});
}

function reset(){
    $.ajax({
        type: "get",
        url: "/reset",
        success: function(data) {
            console.log("reset")
        }
    });
}

function send(){

	$.ajax({
	  	type: "post",
		data: {playerID: myID,
               xTank: player.pos.x, 
               yTank: player.pos.y, 
               xBullet: player.pos.x + player.width/2, 
               yBullet: player.pos.y - player.height*0.8,
               angleFrame: player.angleFrame, 
               bulletType: player.bullet.type,
               direction: player.movement.direction,
               bulletPower: player.bullet.power},
		url: "/sendmove",
		success: function(data) {
            waitMode = true;
            message = "Waiting.."
            getCurrentBullet();
		}
	});
}

function getCurrentState(){
	$.ajax({
	  	type: "post",
		url: "/getCurrentState",
        data: {"playerID": myID},

		success: function(data) {

            waitMode = false;
            var myState = data.gameState[myID];
            var oppState = data.gameState[oppID];
            if (myID === 1){
                player1.pos.x = 1*myState.xTank;
                player1.pos.y = 1*myState.yTank;
                player1.movement.direction = myState.direction;
                player1.angleFrame = 1*myState.angleFrame;

                player2.pos.x = 1*oppState.xTank;
                player2.pos.y = 1*oppState.yTank;
                player2.movement.direction = oppState.direction;
                player2.angleFrame = 1*oppState.angleFrame;

            } else if (myID === 2){
                player2.pos.x = 1*myState.xTank;
                player2.pos.y = 1*myState.yTank;
                player2.movement.direction = myState.direction;
                player2.angleFrame = 1*myState.angleFrame;

                player1.pos.x = 1*oppState.xTank;
                player1.pos.y = 1*oppState.yTank;
                player1.movement.direction = oppState.direction;
                player1.angleFrame = 1*oppState.angleFrame;
            }

			
		}
	});

}

function getCurrentBullet(){
    $.ajax({
        type: "post",
        url: "/getCurrentBullet",
        data: {"playerID": myID},

        success: function(data) {

            waitMode = false;
            message = "YOUR TURN!"
            var myState = data.gameState[myID];
            var oppState = data.gameState[oppID];

            if (myID === 1){
         //       player1.pos.x = 1*myState.xTank;
         //       player1.pos.y = 1*myState.yTank;
         //       player1.movement.direction = myState.direction;
         //       player1.angleFrame = 1*myState.angleFrame;

                player2.pos.x = 1*oppState.xTank;
                player2.pos.y = 1*oppState.yTank;
                player2.movement.direction = oppState.direction;
                player2.angleFrame = 1*oppState.angleFrame;
     //           player2.bullet.type = oppState.bulletType;
     //           player2.angleFrame = oppState.angleFrame;
     //           player2.bullet.power = oppState.bulletPower;
                level.createBullets(player2.pos.x + player2.width/2,
                                    player2.pos.y - player2.height*0.8,
                                    12,12,oppState.bulletType,
                                    oppState.angleFrame,
                                    oppState.direction, oppState.bulletPower);

            } else if (myID === 2){
         //       player2.pos.x = 1*myState.xTank;
         //       player2.pos.y = 1*myState.yTank;
         //       player2.movement.direction = myState.direction;
         //       player2.angleFrame = 1*myState.angleFrame;

                player1.pos.x = 1*oppState.xTank;
                player1.pos.y = 1*oppState.yTank;
                player1.movement.direction = oppState.direction;
                player1.angleFrame = 1*oppState.angleFrame;
     //           player1.bullet.type = oppState.bulletType;
     //           player1.angleFrame = oppState.angleFrame;
     //           player1.bullet.power = oppState.bulletPower;
                level.createBullets(player1.pos.x + player1.width/2,
                                    player1.pos.y - player1.height*0.8,
                                    12,12,oppState.bulletType,
                                    oppState.angleFrame,
                                    oppState.direction, oppState.bulletPower);
            }  
        }
    });
}
