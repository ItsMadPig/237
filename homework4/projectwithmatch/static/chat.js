
  // Global datastore
  var chat;
  // Implement addListing()
  function getindoc(id){
    return $("#"+id).val()
   }

  // Implement refreshDOM()
  function refreshDOM(){
     $(".chat-history").empty("li");
for (var i =0; i < chat.length; i++) {
  var id = encodeURIComponent(chat[i].date);
  (function(id){
var item= $("<p/>").addClass("chat-listing").attr("id",id);
$(".chat-history").append(item);
/* item.append($("<h3/>").append("Player " + chat[i].playerID + ": " + chat[i].message)); */
item.append("Player " + chat[i].playerID + ": " + chat[i].message);
//item.append($("<h6/>").append(chat[i].date));
}) (id)}
$(".chat-history").scrollTop($(".chat-history").height());
}
  
  // Implement the get() function
  function getChat() {
    $.ajax({
      type: "get",
      url: "/getchat",
      success: function(data) {
        chat = data.chat;
        refreshDOM();
      }
    });
  }

 function get() {
    $.ajax({
      type: "get",
      url: "/listings",
      success: function(data) {
        listings = data.listings;
        //console.log(listings);
        refreshDOM();
      }
    });
  }

  // Implement the add(desc, author, price) function
  function addChat() {
    if(myID){
    $.ajax({
      type: "post",
      data: {"playerID": myID, "message": getindoc("chat-input")},
      url: "/addchat",
      success: function(data) { 
        $("#chat-input").val("");
        getChat();
      }
    });
  }
  }

  function edit(id, desc, author, price, sold) {
    $.ajax({
      type: "put",
      data: {desc: desc, author: author, price: price, sold: sold},
      url: "/listings/" + id,
      success: function(data) { }
    });
  }

  function del(id) {
    $.ajax({
      type: "delete",
      url: "/listings/" + id,
      success: function(data) { 
      }
    });
  }

  function delAll() {
    $.ajax({
      type: "delete",
      url: "/listings",
      success: function(data) { }
    });
  }

  $(document).ready(function() {
    getChat();
    setInterval(function(){ getChat()},2000)

  });
