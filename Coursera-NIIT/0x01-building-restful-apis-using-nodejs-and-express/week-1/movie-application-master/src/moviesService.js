// Import the axios library
const axios = require('axios')
baseUrl = "http://localhost:3000/movies"
const getMovies = (done) => {
  axios.get(baseUrl)
  .then(response => {
    done(null, response.data)
  })
  .catch(error => {
    done(error)
  });
}

const getMoviesById = (movieId, done) => {
  // get movie by id
  axios.get(`${baseUrl}/${movieId}`)
  .then(response => {
    console.log("data", response.data)
    done(null, response.data)
  })
  .catch(error => {
    done(error)
  });
}

const saveMovie = function (newMovie, done) {
  // save the details of a movie read from the request body
  axios.post(`${baseUrl}`, newMovie)
  .then(response => {
    done(null, response.data)
  })
  .catch(error => {
    done(error)
  });
}

const updateMovie = function (movieId, updateData, done) {
  axios.put(`${baseUrl}/${movieId}`, updateData)
  .then(response => {
    done(null, response.data)
  })
  .catch(error => {
    done(error)
  }); 
}

const deleteMovieById = function (movieId, done) {
  axios.delete(`${baseUrl}/${movieId}`)
  .then(response => {
    done(null, response.data)
  })
  .catch(error => {
    done(error)
  }); 
}



module.exports = {
  getMovies,
  getMoviesById,
  saveMovie,
  updateMovie,
  deleteMovieById
}
