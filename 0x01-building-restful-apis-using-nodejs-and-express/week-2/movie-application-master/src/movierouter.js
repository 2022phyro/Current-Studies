
//import all the modules required 

/**
 * API to get the details of all movies
 * EFFECTIVE URL: GET /api/v1/movies
 */
const movieController = require('./moviecontroller')
const { Router } = require('express')
const router = Router()
router.get("/", (req, res) => {
  try {
    //calling controller method and passing the parameters 
    //return the response as per error or result coming from controller
    movieController.getMovies((err, results) => {
      if (err) {
        res.status(400).send("An unexpected error occurred")
      } else {
        res.status(200).send({STATUS: "OK", data: results})
      }
    })
  } catch (err) {
    res.status(400).send({message: "An unexpected error occurred"})
  }
});
/**
 * API to get the details of specific movie
 * EFFECTIVE URL: GET /api/v1/movie/:movieId
 */
//
router.get("/:movieId", (req, res) => {
  try {
    //retreive moviedId from req.params
    const movieId = req.params.movieId
    //calling controller method and passing the parameters 
    //return the response as per error or result coming from controller
    movieController.getMovieById(movieId, (err, results) => {
      if (err) {
        res.status(404).send("Movie not found")
      } else {
        res.status(200).send({STATUS: "OK", data:results})
      }
    });

  } catch (err) {
    res.status(400).send({message: "An unexpected error occurred"})
  }
});

/**
 * API to save new movie
 * EFFECTIVE URL: POST /api/v1/movies
 */
router.post("/", (req, res) => {
  try {
    //retreive movieDetails from req.body
    const movieDetails = req.body
     //calling controller method and passing the parameters 
    //return the response as per error or result coming from controller
    movieController.saveMovieDetails(movieDetails, (err, results) => {
      if (err) {
        res.status(400).send("Something went wrong")
      } else {
        res.status(201).send({STATUS: "OK", data:results}) 
      }
    });

  } catch (err) {
    res.status(400).send({message: "An unexpected error occurred"})
  }
});

/**
 * API to edit movie detail
 * EFFECTIVE URL: PATCH /api/v1/movies/:movieId
 */
router.patch("/:movieId", (req, res) => {
  try {
     //retreive moviedId from req.params
     const movieId = req.params.movieId
    //retreive movieDetails from req.body
    const movieDetails = req.body
    //calling controller method and passing the parameters 
    //return the response as per error or result coming from controller
    movieController.updateMovieDetails(movieId, movieDetails, (err, results) => {
      if (err) {
        res.status(404).send("Movie not found")
      } else {
        res.status(200).send({STATUS: "OK", data:results})
      }
    });

  } catch (err) {
    res.status(400).send({message: "An unexpected error occurred"})
  }
});

/**
 * API to delete movie
 * EFFECTIVE URL: DELETE /api/v1/movies/:movieId
 */     // "start": "node app.js",
router.delete("/:movieId", (req, res) => {
  try {
    const movieId = req.params.movieId
     //retreive moviedId from req.params
   
       //calling controller method and passing the parameters 
      //return the response as per error or result coming from controller
    movieController.deleteMovieById(movieId, (err, results) => {
      if (err) {
        res.status(404).send("Movie not found")
      } else {
        res.status(204).send({STATUS: "OK", data:results})
      }
    })
     

  } catch (err) {
    res.status(400).send({message: "An unexpected error occurred"})
  }
});

module.exports = router;
