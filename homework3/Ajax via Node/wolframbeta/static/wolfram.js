/* 
 * Aaron Hsu
 * ahsu1@andrew.cmu.edu
 */
$(document).ready(function() {
  $("#compute-form").submit(runQuery);
});

function runQuery() {
  var query = $("#question").val();
  getQuery(query);
  $("#question").val("");

  $("#answer").hide();

  return false;
}

function refreshDOM(data) {

  if (data.success) {
    $("#answerInput").html(data.interpreted);
    $("#answerOutput").html(data.answer);
    $("#answerTimestamp").html(data.date);
    
    $("#answer").slideDown();
  }
}

function getQuery(query) {
  $.ajax({
    type: "get",
  url: "/answer/" + encodeURI(query),
  success: function(data) {
    console.log(data);
    refreshDOM(data);
  }
  });
}

function get() {
  $.ajax({
    type: "get",
  url: "/answer",
  success: function(data) {
    console.log(data);
  }
  });
}

function add(question, answer) {
  $.ajax({
    type: "post",
  data: {question: question, answer: answer},
  url: "/answer",
  success: function(data) {
    console.log(data);
  }
  });
}

$(document).ready(function() {
});

