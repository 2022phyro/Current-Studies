

//import DAO layer
const movieDAO = require('./movieDAO');
function saveMovie(movie, done) {
    //call DAO saveMovie function and pass the parameter
    movieDAO.saveMovie(movie,done);
 
}



function getMovieById(movie,movieId,done){
     //call DAO getMovieById function and pass the parameter
     movieDAO.getMovieById(movieId,done);
  
}

module.exports = {saveMovie,getMovieById}