console.log("script.js linked")

//links to the keys.js file with users api key
const apiKey = "77fef606e4f046370615222d2f17dece";

//need to make this the submit of the form
const movieName = "The Matrix";


//call function to request the data
function searchMovie() {
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
