
//console.log("script.js linked")

//links to the keys.js file with users api key
const apiKey = "77fef606e4f046370615222d2f17dece";

//need to make this the submit of the form
var movieName = "";


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
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
}

searchMovie();


//use data from the user form submit to search the above API

//variable targetting the button to search
var userSearch = $(".btn-primary")

//variable targetting the form that the user types into

//WORKING BUTTON - SEARCHES WITH ONE API BUT NOT WORKING WITH OMDB
userSearch.on("click", function(){
    var userTypeMovie = $("#movie-input").val();
    var userResult = userTypeMovie.toString()
    console.log(userTypeMovie.toString());
return searchMovie(userResult)}) ; 


console.log("script.js linked");

// loads local storage, library for modal display
$(document).ready(loadModalLibrary);

// function gets a seacrhTerm and searched for movies
function getMoviesInfo(searchTerm) {
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
    // create image, and 2 x paragraphs
    var img = $("<img>");
    img.attr("src", poster);
    var yearInfo = $("<p>").text(year);
    var ratingInfo = $("<p>").text(rating);
    var titleInfo = $("<p>").text(title);
    var plotInfo = $("<p>").text(plot);
    // append all elements to the card
    $("body").append(titleInfo, img, yearInfo, ratingInfo);
  })
};

//function to load favorite movies from the local storage.
function loadModalLibrary(){
  var savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || []
  var savedMovies = ["The Matrix", "Titanic", "Turning red", "The Batman"];
  $(".modal-footer").empty();
  for (var i = 0; i< savedMovies.length; i++) {
    var favoriteMovie = $("<button>");
    
    favoriteMovie.addClass("btn btn-primary");
    favoriteMovie.attr("type", "button")
    favoriteMovie.text(savedMovies[i]);
    console.log(savedMovies[i]);
    $(".modal-footer").append(favoriteMovie);
  }
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

