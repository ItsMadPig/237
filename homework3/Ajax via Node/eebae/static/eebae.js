/* 
 * Aaron Hsu
 * ahsu1@andrew.cmu.edu
 */

  // Global datastore
  var listings;

  //adds a listing whenever clicked on the button
  function addListing(){
      var author = $("#author-input");
      var desc = $("#desc-input");
      var price = $("#price-input");
      var date = new Date();
      if ((author.val() === "") || (desc.val() === "") || (price.val() === "")){
        return;
      }
      add(desc.val(), author.val(), price.val());
      $("#author-input").val("");
      $("#desc-input").val("");
      $("#price-input").val("");
    }
  // refreshes the dom locally
  function refreshDOM() {
    if (listings === undefined) return;
    var container = $(".listings");
    container.html("");
    for (var i = 0; i < listings.length; i++) {
      var index = i;
      var list = listings[i];
      var li = $("<li>");

      var author = list.author;
      var desc = list.desc;
      var price = list.price;
      var sold = list.sold;
      var date = list.date;

      var h3 = $("<h3>").html(author);
      var h6 = $("<h6>").html(date);
      var p1 = $("<p>").html(desc);
      var p2 = $("<p>").html("$" + price);

      //delete button, callback for creating scope
      var delBut = $("<a>").html("Delete").attr("href","#");
      delBut.click(delButtonCallback(i));
      $(document.body).append(delBut);   

      //sold button, callback for creating scope
      var soldBut = $("<a>").html("Sold!").attr("href","#");
      soldBut.click(soldButtonCallback(i,desc,author,price,sold));
      $(document.body).append(delBut);


      li.attr("id",date);
      li.append(h3);
      li.append(h6);
      li.append(p1);
      li.append(p2);
      li.append(delBut);
      li.append(soldBut);

      if (sold) {
        li.addClass("sold");
      }
      container.append(li);
    }
  }

  //manually creates a scope for each delete button
  function delButtonCallback(i){
    return function(){
      del(i);
      listings.splice(i,1);
    }
  }
  //manually creates a scope for each sold button
  function soldButtonCallback(i,desc,author,price,sold){
    return function(){
      var newSold = !sold;
      edit(i,desc,author,price,newSold);
      listings[i].sold = newSold;
    }
  }

  //fetches data from server
  function get() {
    $.ajax({
      type: "get",
      url: "/listings",
      success: function(data) {
        listings = data.listings;
        refreshDOM();
      }
    });
  }

  //adds listing on server
  function add(desc, author, price) {
    $.ajax({
      type: "post",
      data: {"desc": desc, "author": author, "price": price},
      url: "/listings",
      success: function(data) {
        listings.push(data.item);
        refreshDOM()}
    });
  }

  //edits listing on server
  function edit(id, desc, author, price, sold) {
    $.ajax({
      type: "put",
      data: {desc: desc, author: author, price: price, sold: sold},
      url: "/listings/" + id,
      success: function(data) { 
        refreshDOM();
      }
    });
  }

  //deletes item given the id on server
  function del(id) {
    $.ajax({
      type: "delete",
      url: "/listings/" + id,
      success: function(data){
        refreshDOM();
       }
    });
  }

  //deletes all items on the server
  function delAll() {
    $.ajax({
      type: "delete",
      url: "/listings",
      success: function(data) { 
        listings = []
        refreshDOM()
      }
    });
  }

  $(document).ready(function() {
    get();
  });