//import axios module
const axios = require('axios')
const baseUrl = "http://localhost:3000/movies"

//After starting the JSOn server check the port on which is running accordingly change 
//the port in url given below

//This method will get all movies from json server
const getMovies = (done) => {
  // This url can be used - axios.get("http://localhost:3000/movies")
  axios.get(baseUrl)
  .then(response => {
    done(null, response.data)
  })
  .catch(error => {
    done(error)
  });
}

//This method will get specific movie id from json server
const getMovieById = (movieId, done) => {
  // This url can be used- axios.get(`http://localhost:3000/movies/${movieId}`)
  axios.get(`${baseUrl}/${movieId}`)
  .then(response => {
    done(null, response.data)
  })
  .catch(error => {
    done(error)
  });
 
}
//This method will save Movie details in Json server
const saveMovieDetails = (movieDetails, done) => {
  //This url can be used  -  axios.post(`http://localhost:3000/movies`, movieDetails)
  axios.post(`${baseUrl}`, movieDetails)
  .then(response => {
    done(null, response.data)
  })
  .catch(error => {
    done(error)
  });
 
}

//This method will update MovieDetails in Json Server
const updateMovieDetails = (movieId, movieDetails, done) => {
  //This url can be used - axios.patch(`http://localhost:3000/movies/${movieId}`, movieDetails)
  axios.put(`${baseUrl}/${movieId}`, movieDetails)
  .then(response => {
    done(null, response.data)
  })
  .catch(error => {
    done(error)
  }); 
}

//This method will delete specific movie from Json Server
const deleteMovieById = (movieId, done) => {
  //This url can be used -  axios.delete(`http://localhost:3000/movies/${movieId}`)
  axios.delete(`${baseUrl}/${movieId}`)
  .then(response => {
    done(null, response.data)
  })
  .catch(error => {
    done(error)
  }); 
 
}

module.exports = {
  getMovies, getMovieById, saveMovieDetails, deleteMovieById, updateMovieDetails
}
