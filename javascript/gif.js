//  Initial array of teams
var teams = ["Los Angeles Lakers", "Brooklyn Nets", "Cleveland Cavaliers", "Golden State Warriors"];

// function
function displayTeamGif() {
  var team = $(this).attr("data-name");
  apiKey = "IQzfKk8hZbWBXOrmRF8YqiWZgo3Aw8tq"
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&limit=10&q=" + team;
  console.log("Team: " + team);
  console.log("queryURL: " + queryURL);

  //  AJAX 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function (response) {


    
    dAll = $("<div>");

    for (var i = 0; i < 10; i++) {

      
      dTag = $("<div class='gifs'>");

      
      dRating = $("<div>");
      dRating.append("Rating: " + response.data[i].rating);

      //div to show gif
      dGif = $("<div>");

      var image = $("<img class='gif' data-state='still'>");
      image.attr("src", response.data[i].images.fixed_height_still.url);
      image.attr("data-still", response.data[i].images.fixed_height_still.url);
      image.attr("data-animate", response.data[i].images.fixed_height.url)



      dGif.append(image)
 dTag.append(dRating);
      dTag.append(dGif);
      dAll.append(dTag);

    }


    $("#gifDiv").html(dAll);


  }); 


} 


//Function to render buttons
function renderButtons() {
  //Empties div
  $("#buttons-view").empty();

  //Loops through the array of teams
  for (var i = 0; i < teams.length; i++) {
    var a = $("<button class='team'>");
    a.attr("data-name", teams[i]);
    a.text(teams[i]);
    $("#buttons-view").append(a);
  }


} 


//Function add team
$("#add-team").on("click", function (event) {

  event.preventDefault();
  var team = $("#team-input").val().trim();
  teams.push(team);
  renderButtons();

}); 

//  click event listener 
$(document).on("click", ".team", displayTeamGif);

//animate on click
$(document).on("click", ".gif", function () {

  var state = $(this).attr("data-state");
  var animateUrl = $(this).attr("data-animate");
  var stillUrl = $(this).attr("data-still");

  if (state === "still") {
    $(this).attr("src", animateUrl);
    $(this).attr("data-state", "animate");
  }

  if (state === "animate") {
    $(this).attr("src", stillUrl);
    $(this).attr("data-state", "still")
  }

}); 

//renders buttons on load
renderButtons();