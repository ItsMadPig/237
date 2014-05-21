/* 
 * Aaron Hsu
 * ahsu1@andrew.cmu.edu
 */

var express = require("express"); // imports express
var app = express();        // create a new instance of express

// imports the fs module (reading and writing to a text file)
var fs = require("fs");

// the bodyParser middleware allows us to parse the
// body of a request
app.use(express.bodyParser());

// The global datastore for this example
var datastore;

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

// Implement findQuestion(query) 
//    return the question if found, undefined otherwise
function findQuestion(query){
  var question;
  for (question in datastore){
    if (question.indexOf(query) !== -1){
      return question;
    }
  }
  return undefined;
}

// Implement computeAnswer(query)
//    try to find the question return a successful response (see spec)
//    otherwise return an unssuccessful response
function computeAnswer(query){
  var answer;
  if (query.indexOf("Math:") === 0){
    //math question
    try{
      answer = eval(query.replace("Math:",""));
    } catch(err){
      //bad math question
      return undefined;
    }
  }
  return answer;
}
  
  //given question is datastore, finds answer
function findAnswer(interpreted){
  return datastore[interpreted]["answer"];
}

// get an answer
app.get("/answer/:query", function(request, response){
  var query;
  var interpreted;
  var answer;
  var successful;
  var date;

  query = request.params.query;
  interpreted = findQuestion(query);

  if (interpreted !== undefined){
    //in datastore
    date = datastore[interpreted]["date"];
    answer = findAnswer(interpreted);
    successful = true;

  } else{
    //not in datastore
    answer = computeAnswer(query);
    if (answer !== undefined){
      //correct math problem
      date = new Date();
      interpreted = query.replace("Math:","");
      successful = true;
    } else{
      //incorrect math problem and not in datastore
      successful = false;
    }
  }

  if (successful){
    //if math question is evaluable or answer is found
    response.send({
      interpreted: interpreted,
      answer: answer,
      date: date,
      success: successful
    });
  } else{
    //if math question is not evaluable or answer can't be found
    response.send({
      success: successful
    });
  }
});



// get all answers
app.get("/answer",function(request, response){
  response.send({
    "answers": datastore,
    "success": true
  })
})



// create new answer
app.post("/answer", function(request, response) {
  datastore[request.body.question] = { 
    "answer": request.body.answer,
    "date": new Date()
  };
  writeFile("data.txt", JSON.stringify(datastore));
  response.send({ success: true });
});


// This is for serving files in the static directory
app.get("/static/:staticFilename", function (request, response) {
    response.sendfile("static/" + request.params.staticFilename);
});

function initServer() {
  // When we start the server, we must load the stored data
  var defaultList = "{}";
  readFile("data.txt", defaultList, function(err, data) {
    datastore = JSON.parse(data);
  });
}

// Finally, initialize the server, then activate the server at port 8889
initServer();
app.listen(8889);

