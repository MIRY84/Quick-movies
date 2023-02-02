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
