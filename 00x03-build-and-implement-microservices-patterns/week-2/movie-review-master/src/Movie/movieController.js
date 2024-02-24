const movieService = require('./movieService');
function saveMovie(movie, done) {
    //call service saveMovie function and pass the parameter
    movieService.saveMovie(movie,done);
   
}



function getMovieById(movie,movieId,done){
      //call service getMovieById function and pass the parameter
      movieService.getMovieById(movieId,done);
   
}

module.exports = {saveMovie,getMovieById}