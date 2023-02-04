
//console.log("script.js linked")

//links to the keys.js file with users api key




//call function to request the data
function searchMovie(movieName) {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}`)
      .then(response => {
          if (!response.ok) {
              console.error("Failed to fetch data");
              return;
          }
          return response.json();
      })
      .then(data => {
          //console.log(data);
          return data;
      })
      .catch(error => {
          console.error(error);
      });
}

var r = "";

function ajaxSearchMovie(movieName) {

var queryURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}`;
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response){
  r=response;
  var maxResultsToDisplay = 5;
  $("#results").empty();
  for (var i = 0; i< maxResultsToDisplay; i++){
    console.log("i: " + i);
    var title = response.results[i].original_title;
    var year = response.results[i].release_date;
    
    console.log("-------");
    console.log(title, year);

    var uniqueImageID = "image-" + i;
    var uniqueplotID = "plot-" + i;
    var uniqueRatingID = "rating-" + i;


    $(".movie-title1").text(title);
    $(".movie-year").text("Released: " +year);

    var cardDeck = $("<div>").addClass("card-deck");
    var card1 = $("<div>").addClass("card");
    var card1Title = $("<h5>").addClass("card-title").text("Movie Title: " +title);
    var cardImage = $("<img>").addClass("card-img-top");
    cardImage.attr("alt", "Card image cap");
    cardImage.attr("id", uniqueImageID);
    var card1body = $("<div>").addClass("card-body");
    var card1Rating = $("<p>").addClass("card-text");
    card1Rating.attr("id", uniqueRatingID)
    var card1Year = $("<p>").addClass("card-text").text("Released:" + year);
    var card1footer = $("<div>").addClass("card-footer");

    card1body.append(card1Rating, card1Year);
    card1.append(card1Title, cardImage, card1body, card1footer);

    var card2 = $("<div>").addClass("card");
    var card2Title = $("<h5>").addClass("card-title").text("Movie Plot:");
    var card2Plot = $("<p>").addClass("movie-plot").text("LOREM IPSUM");
    card2Plot.attr("id", uniqueplotID);
    var card2body = $("<div>").addClass("card-body");


    //    SAVE TO MY LIBRARY BUTTON 

    var cardButton = $("<button>").addClass("btn btn-warning").text("Save to my library");
    cardButton.attr("name", title);
    cardButton.on("click", function () {
      var clickedBtnID = $(this).attr("name");
      saveToModal(clickedBtnID);
   });
  


    var card2footer = $("<div>").addClass("card-footer");

    card2body.append(cardButton);
    card2.append(card2Title, card2Plot, card2body, card2footer);

    cardDeck.append(card1, card2);
    $("#results").append(cardDeck);

    getMoviesInfo(title, i); //will get a poster and a plot
  }
});
};

//use data from the user form submit to search the above API

//variable targetting the button to search
var userSearch = $("#movie-search");

//variable targetting the form that the user types into

//WORKING BUTTON - SEARCHES WITH ONE API BUT NOT WORKING WITH OMDB
userSearch.on("click", function(event){
  event.preventDefault();
  var userTypeMovie = $("#movie-input").val();
  var userResult = userTypeMovie.toString()
  console.log(userTypeMovie.toString());
  ajaxSearchMovie(userResult);
  // console.log(result) 
});


console.log("script.js linked");

// loads local storage, library for modal display
$(document).ready(loadModalLibrary);

// function gets a seacrhTerm and searched for movies
function getMoviesInfo(searchTerm, i) {
var queryURL = "https://www.omdbapi.com/?t=" + searchTerm + "&apikey=" + omdbApikey + "&plot=full";
$.ajax({
  url:queryURL,
  method: "GET"
}).then(function(response){
  console.log(response);
  // get information from the resposne
  var poster = response.Poster;
  var year = response.Year;
  var rating = response.imdbRating;
  var title = response.Title;
  var plot = response.Plot;
  console.log(poster, year, rating);
  
  var uniqueImageID = "image-" + i;
  var uniqueplotID = "plot-" + i;
  var uniqueRatingID = "rating-" + i;

  $("#" + uniqueImageID).attr("src", poster);
  $("#" + uniqueplotID).text(plot);

  $("#" + uniqueRatingID).text("Rating: " + rating)
  // append all elements to the card
  // $("body").append(titleInfo, img, yearInfo, ratingInfo);
})
};

//function to load favorite movies from the local storage.
function loadModalLibrary(){
var savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || []
// var savedMovies = ["The Matrix", "Titanic", "Turning red", "The Batman"];
$(".modal-footer").empty();
$(".modal-body2").empty();
for (var i = 0; i< savedMovies.length; i++) {
  var favoriteMovie = $("<button>");
  favoriteMovie.addClass("btn-lg btn-outline-success");
  favoriteMovie.attr("type", "button").css("width", "60%")
  favoriteMovie.text(savedMovies[i])
  favoriteMovie.attr("name", savedMovies[i])
  favoriteMovie.on('click', function(){
    var newSavedmovies = $(this).attr("name")
    console.log(newSavedmovies)
    ajaxSearchMovie(newSavedmovies);
    
    
  });
  
  // console.log(savedMovies[i]);
  $(".modal-body2").prepend(favoriteMovie);
  
}


// RESET BUTTON

var clearBtn = $("<button>");
  clearBtn.addClass("btn btn-secondary").attr("type", "button").text("Clear Favourites")
  clearBtn.on('click', function(){
  alert("clicked again")
  localStorage.clear();
  loadModalLibrary()
});

// SAVE CHANGES BUTTON

var saveChngBtn = $("<button>");
saveChngBtn.addClass("btn btn-danger").attr("type", "button").text("Save Changes").css("position: absolute")
saveChngBtn.on('click', function(){
  alert("clicked again")
  localStorage.setItem()
  loadModalLibrary()
});


//appending buttons
$(".modal-footer").append(saveChngBtn)
$(".modal-footer").append(clearBtn);

}







function saveToModal(movie) {
var savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
if (! savedMovies.includes(movie)){
  savedMovies.push(movie);}
  // we need to remove the last one if it is longer than 10
  if (savedMovies.length > 10) {
    savedMovies.shift()
  }
  // now save to localstorage
  localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
  // finally redraw library
  loadModalLibrary();
}





// getMoviesInfo("the matrix");
// getMoviesInfo("The Up");
// // getMoviesInfo("the up");
