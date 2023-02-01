console.log("script.js linked");

// function gets a seacrhTerm and searched for movies
function getMoviesInfo(searchTerm) {
  var queryURL = "https://www.omdbapi.com/?t=" + searchTerm + "&apikey=trilogy";
  $.ajax({
    url:queryURL,
    method: "GET"
  }).then(function(response){
    console.log(response);
    // get information from the resposne
    var poster = response.Poster;
    var year = response.Year;
    var rating = response.imdbRating;
    console.log(poster, year, rating);
    // create image, and 2 x paragraphs
    var img = $("<img>");
    img.attr("src", poster);
    var yearInfo = $("<p>").text(year);
    var ratingInfo = $("<p>").text(rating);
    // append all elements to the card
    $("body").append(img, yearInfo, ratingInfo);


  })
};

getMoviesInfo("star wars");
// getMoviesInfo("the up");
