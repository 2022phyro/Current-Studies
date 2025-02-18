//import service layer
const sv = require('./movieservice')

const getMovies = (done) => {
//call service method getMovies method
  return sv.getMovies(done);
}

const getMovieById = (movieId, done) => {
    //call service method getMovieById method
    return sv.getMovieById(movieId, done);
 
}

const saveMovieDetails = (movieDetails, done) => {
  //call service method saveMovieDetails method
  return sv.saveMovieDetails(movieDetails, done)
  
}

const updateMovieDetails = (movieId, movieDetails, done) => {
  //call service method updateMovieDetails method
  return sv.updateMovieDetails(movieId, movieDetails, done)
 
}

const deleteMovieById = (movieId, done) => {
  //call service method deleteMovieById method
  return sv.deleteMovieById(movieId, done)
  
}

module.exports = {
  getMovies, getMovieById, saveMovieDetails, updateMovieDetails, deleteMovieById
}
