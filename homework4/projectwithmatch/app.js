
var express = require("express"); // imports express
var app = express();        // create a new instance of express
var fs = require("fs");
var gameState = new Object()
var users = new Object()
var randomIndex = Math.floor((Math.random()*5)+0);

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
var searching = new Array();
var matched = new Object();
var responses = new Object();

var chatline = new Object();
// the bodyParser middleware allows us to parse the
// body of a request
app.use(express.bodyParser());
app.use(express.methodOverride());



function makeStartState (id,first) { 
  if(first){
return ( {"oppID": id, "xTank": 0, "yTank": 450, 
                 "xBullet": undefined, "yBullet": undefined, 
                 "angleFrame": 0, "bulletType": 0, "direction": "right",
                 "bulletPower": 0, "going": true, "victory": false, "levelIndex": randomIndex})
}
return ({

"oppID": id, "xTank": 1100, "yTank": 450,
                 "xBullet": undefined, "yBullet": undefined,
                 "angleFrame": 0, "bulletType": 0, "direction": "left",
                 "bulletPower": 0, "going": false, "victory": true, "levelIndex": randomIndex})

}
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
// Asynchronously write file contents, then call callbackFn
function matchUp() {
  if(searching.length > 1){
    var p2 = searching.pop();
    var p1 = searching.pop()
matched[p1.playerID] = makeStartState(p2.playerID,true)
matched[p2.playerID] = makeStartState(p1.playerID,false)
 p1.tosend.send({ 
        "playerID": p1.playerID,
        "oppID": p2.playerID,
        "youFirst": true,
        "success": true,
        "levelIndex": randomIndex
      })
 p2.tosend.send({ 
            "playerID": p2.playerID,
        "oppID": p1.playerID,
        "youFirst": false,
        "success": true,
        "levelIndex": randomIndex
      })
}
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

function ensureConsistency(){
for (i in matched) {
  var p = matched[i]
  if (!i || !p || !(p.oppID)){
 p["error"] = "Fatal error"
  } else
{
  var opp = matched[p.oppID]
  if(!opp || opp.oppID !== i){
 p["victory"] = "You win"
  p["going"] = true;


  } else
  if (opp.error) p["error"] = "fatal error"

}
  }
  next()
}

app.all('/post', ensureConsistency)

//Simple ping function just to see if the server is still on and connected.  
app.get('/ping', function(request, response){
  response.send({ 
    "success": true 
  });
});

//If playerID is in database, logins in user.  Else fail
app.post('/login', function(request, response){
if(users[request.body.playerID] && !online[request.body.playerID]){
  online[request.body.playerID] = true;
  response.send({ 
    "success": true 
  });
} else{
 response.send({ 
    "success": false 
  });
}});

app.post('/logout', function(request, response){
if(users[request.body.playerID] && online[request.body.playerID]){
  online[request.body.playerID] = undefined;
  matched[request.body.playerID] = undefined;
  var i =searching.indexOf(request.body.playerID)
  if(i > -1){
searching.splice(i,1)
 response.send({ 
    "success": true 
  });
  }} else response.send({ 
    "success": false 
  })
})



app.post('/register', function(request, response){

if(!users[request.body.playerID]){
  users[request.body.playerID] = true;
          writeFile("users.txt", JSON.stringify(users));
  response.send({ 
    "success": true 
  });
} else{
 response.send({ 
    "success": false 
  });
}});

app.post('/match', function(request, response){
if(online[request.body.playerID]){
  searching.push({"playerID": request.body.playerID, "tosend": response})
  matchUp()
} else{
 response.send({ 
    "success": false 
  });
}});
          writeFile("matches.txt", JSON.stringify(matched));

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

  if(!matched[request.body.playerID].going){
    response.send({
      "success": false
    })
  } else{
var opp = matched[request.body.playerID].oppID
      matched =  calcGameState(matched,request.body);
      matched[request.body.playerID].going = false
      matched[opp].going = true
         gameState[request.body.playerID] = matched[request.body.playerID]
gameState[opp] = matched[opp]
      temp = ({
        "gameState": gameState,
        "success": true 
      })
                writeFile("matches.txt", JSON.stringify(matched));

      response.send(temp);
           responses[opp].send(temp);
  }
});
app.post("/forfeit", function(request, response) {

  if(!matched[request.body.playerID].going){
    var o = matched[request.body.playerID].oppID
          matched[request.body.playerID] = undefined =  calcGameState(matched,request.body);
matched[o] = undefined
responses[o].send({
      "victory": false,
            "success": true

    })
    response.send({
"success":true
})
    responses[o] = undefined
    responses[request.body.playerID] = undefined
}
   else{

  }
});


// Returns each players' ID. Upon recieving two getID requests from two different browsers or computers,
//returns a reponse to each player containing that player's ID, the opponent's ID, and whether that player is going
//first.


//When the player whose turn it is calls this function, returns the current gameState.  If the other player calls this function,
//the server will not respond and instead store that player's response object in a local variable for use in /sendmove.
app.post("/getCurrentState", function (request, response) {

  if(matched[request.body.playerID].going){
    var gameState = new Object();
    var opp = matched[request.body.playerID].oppID
    gameState[request.body.playerID] = matched[request.body.playerID]
gameState[opp] = matched[opp]
    response.send({ 
      "gameState": gameState,
      "success": true
    })
  } else {
    responses[request.body.playerID] = response;
 
}});





// This is for serving files in the static directory
app.get("/static/:staticFilename", function (request, response) {
    response.sendfile("static/" + request.params.staticFilename);
});





function initServer() {
  // When we start the server, we must load the stored data
  var defaultList = "{}";
    var defaultList2 = "[]";
readFile("users.txt", defaultList, function(err, data) {
    users = JSON.parse(data);
  });
readFile("matches.txt", defaultList, function(err, data) {
    matched = JSON.parse(data);
  });
  readFile("chat.txt", defaultList, function(err, data) {
  //  chat = JSON.parse(data);
  });
}

initServer();
app.listen(8889);
