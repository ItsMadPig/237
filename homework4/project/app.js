var express = require("express"); // imports express
var app = express();        // create a new instance of express
var fs = require("fs");
var playergoing, playerwaiting,tosend;
var gameState = [];
var users = [];
var randomIndex = Math.floor((Math.random()*5)+0);;


var default1=  {"playerID": 1, "xTank": 0, "yTank": 450, 
                 "xBullet": undefined, "yBullet": undefined, 
                 "angleFrame": 0, "bulletType": 0, "direction": "right",
                 "bulletPower": 0}
var default2 = {"playerID": 2, "xTank": 1100, "yTank": 450,
                 "xBullet": undefined, "yBullet": undefined,
                 "angleFrame": 0, "bulletType": 0, "direction": "left",
                 "bulletPower": 0}
gameState[1] = default1
gameState[2] = default2
var chat = new Array();
var online = new Array();

var chatline = new Object();
// the bodyParser middleware allows us to parse the
// body of a request
app.use(express.bodyParser());
app.use(express.methodOverride());




// Asynchronously read file contents, then call callbackFn
function readFile(filename, defaultData, callbackFn) {
  fs.readFile(filename, function(err, data) {
    if (err) {
      console.log("Error reading file: ", filename);
      data = defaultData;
    } else {
      console.log("Success reading file: ", filename);
    }
    if (callbackFn) callbackFn(err, data);
  });
}



// Asynchronously write file contents, then call callbackFn
function writeFile(filename, data, callbackFn) {
  fs.writeFile(filename, data, function(err) {
    if (err) {
      console.log("Error writing file: ", filename);
    } else {
      console.log("Success writing file: ", filename);
    }
    if (callbackFn) callbackFn(err);
  });
}
//This function takes a gamestate and a move and returns an updated gamestate.
function calcGameState(gs, pm) {
  gs[pm.playerID].xTank = 1*pm.xTank;
  gs[pm.playerID].yTank = 1*pm.yTank;
  gs[pm.playerID].xBullet = 1*pm.xBullet;
  gs[pm.playerID].yBullet = 1*pm.yBullet;
  gs[pm.playerID].direction = pm.direction;
  gs[pm.playerID].angleFrame = 1*pm.angleFrame;
  gs[pm.playerID].bulletType = 1*pm.bulletType;
  gs[pm.playerID].bulletPower = 1*pm.bulletPower;
  return gs;
}
//Simple ping function just to see if the server is still on and connected.  
app.get('/ping', function(request, response){
  response.send({ 
    "success": true 
  });
});

//If username is in database, logins in user.  Else fail
app.post('/login', function(request, response){
if(users[request.body.userName] && !online[request.body.userName]){
  online[request.body.userName] = true;
  response.send({ 
    "success": true 
  });
} else{
 response.send({ 
    "success": false 
  });
}});

app.post('/register', function(request, response){
if(!users[request.body.userName]){
  users[request.body.userName] = true;
          writeFile("users.txt", JSON.stringify(users));
  response.send({ 
    "success": true 
  });
} else{
 response.send({ 
    "success": false 
  });
}});


app.post('/login', function(request, response){
if(users[request.body.userName] && !online[request.body.userName])
  online[request.body.userName] = true;
  response.send({ 
    "success": true 
  });
});

//Sends the calcGameState function so that the client can use it as well
app.get('/physics', function(request, response){
  response.send({
    "physics":calcGameState,
    "success":true
  })
});

// create a new chat line.  Takes in a request with a playerID and a message.  
app.post("/addchat", function(request, response){
  var chatline = ({
    playerID: request.body.playerID,
    message: request.body.message,
    "date": new Date()
  })
  chat.push(chatline)
        writeFile("chat.txt", JSON.stringify(chat));

  temp = ({
    success: true 
  })
  // writeFile("chat.txt", JSON.stringify(chat));
  response.send(temp)
});

//Gets all the current chat lines.  
//Returns an  response with an array of all chat lines.  
//Each chat line has a playerID, message, and Date.
app.get("/getchat", function(request, response) {
  temp = ({
    chat: chat,
    success: true
  })
  response.send(temp)
});

// Sends a move to the server. 
//Takes in a request with a x and y attributes.  
//Calculates the new gamestate,
//And sends to both players
//Ends the current player's turn
app.post("/sendmove", function(request, response) {

  if(1*request.body.playerID !== playergoing){
    response.send({
      "success": false
    })
  } else{
      gameState =  calcGameState(gameState,request.body);
      var temp = playergoing;
      playergoing = playerwaiting;
      playerwaiting = temp;

      temp = ({
        "gameState": gameState,
        "success": true 
      })
      response.send(temp);
      tosend.send(temp);
  }
});

// Returns each players' ID. Upon recieving two getID requests from two different browsers or computers,
//returns a reponse to each player containing that player's ID, the opponent's ID, and whether that player is going
//first.
app.get("/getID", function (request, response, next) {

  if(playergoing === undefined){
    playergoing = 1;
    tosend = response;
  } else {

    if(playerwaiting === undefined){
      playerwaiting = 2;
      response.send({ 
        "playerID": playerwaiting,
        "player2ID": playergoing,
        "youFirst": false,
        "success": true,
        "levelIndex": randomIndex

      })
      tosend.send({
        "playerID": playergoing,
        "player2ID": playerwaiting,
        "youFirst": true,
        "success": true,
        "levelIndex": randomIndex

      })
    } else{
      response.send ({
        "success":false
      });
    }
  }
});

//When the player whose turn it is calls this function, returns the current gameState.  If the other player calls this function,
//the server will not respond and instead store that player's response object in a local variable for use in /sendmove.
app.post("/getCurrentState", function (request, response) {

  if(1*request.body.playerID === playergoing){
    response.send({ 
      "gameState": gameState,
      "success": true 
    })
  } else if(1*request.body.playerID === playerwaiting){
    tosend = response;
  } else{
    response.send({
      "success": false
    })
  }
});

app.post("/getCurrentBullet", function (request, response) {

  if((1*request.body.playerID)=== playergoing){
    response.send({ 
      "gameState": gameState,
      "success": true 
    })
  } else if((1*request.body.playerID) === playerwaiting){
    tosend = response;
  } else{
    console.log("reach 3")
    response.send({
      "success": false
    })
  }
});

//Resets the player IDs and the gameState
app.get("/reset", function (request, response) {
  console.log("reset");
  playergoing = undefined
  playerwaiting = undefined
  tosend = undefined
  var randomIndex = Math.floor((Math.random()*5)+0);;
  var gameState = [];
  gameState[1] = {"xTank": 0, "yTank": 450, "xBullet": undefined, 
                  "yBullet": undefined, "bulletType": 0, "direction": "right",
                  "bulletPower": 0, "levelIndex": randomIndex, "angleFrame": 0}
  gameState[2] = {"xTank": 1100, "yTank": 450, "xBullet": undefined, 
                  "yBullet":undefined, "bulletType": 0, "direction": "left",
                  "bulletPower": 0, "levelIndex": randomIndex, "angleFrame": 0}

  response.send({ 
    "success": true 
  })
});

// This is for serving files in the static directory
app.get("/static/:staticFilename", function (request, response) {
    response.sendfile("static/" + request.params.staticFilename);
});





function initServer() {
  // When we start the server, we must load the stored data
  var defaultList = "[]";
    var defaultList2 = "[]";
readFile("users.txt", defaultList, function(err, data) {
    users = JSON.parse(data);
  });
  readFile("chat.txt", defaultList, function(err, data) {
    chat = JSON.parse(data);
  });
}

//initServer();
app.listen(8889);
