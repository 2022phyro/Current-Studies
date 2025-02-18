require('../dbconfig/dbfile')
const Movie = require('./movieModel')
//create async function saveMovie to save movie in database taking two parameters
//movie object and a callback
//return callback 
const saveMovie = async (movie, callback) => {
    try {
        const newMovie = await new Movie(movie).save();
        callback(null, newMovie)
    } catch (err) {
        console.error(err)
       callback(err, null) 
    }
}



//create async function getMovieById to get movieId from database taking three parameters
//movie object, movieId and a callback
//return callback 
const getMovieById = async (movieId, callback) => {
    try {
        const movie = await Movie.findOne({movieId: movieId}).lean().exec();
        callback(null, movie)
    } catch(err) {
        console.error(err)
        callback(err, null)
    }
}

module.exports = {saveMovie,getMovieById}