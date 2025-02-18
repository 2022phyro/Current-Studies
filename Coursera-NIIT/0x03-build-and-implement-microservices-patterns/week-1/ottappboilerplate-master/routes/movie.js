const express = require('express');
const router = express.Router();
const { getMovies, addMovie, deleteMovie } = require('../controllers/movie')

/**
Write the code to specify the route of get, add and delete the movie details
*/
router.get('/:userId', getMovies);
router.post('/:userId', addMovie);
router.delete('/:userId', deleteMovie);

module.exports = router