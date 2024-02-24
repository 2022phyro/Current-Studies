

//import the require Module

//Post method will post movie in database
router.post('/', async (req, res) => {


        //retreive movie from the req body
        const newMovie = req.body;
        //calling SaveMovie on controller layer
        //return result and err
        movieController.saveMovie(newMovie, (err, result) => {
                if (err) {
                        res.status(400).send({ STATUS: "Err", message: "Error in saving movie" })
                }
                else {
                        res.status(200).send({ STATUS: "OK", message: "Movie saved successfully", data: result })
                }

        })
})

////Get method will get specific  movie from database
router.get('/:id', async (req, res) => {


        //retreive movieId from the req.params
        const movieId = req.params.id;
        //calling getMovieById on controller layer
        //return result and err
        movieController.getMovieById(movie, movieId, (err, result) => {
                if (err || !result) {
                        res.status(404).send({ STATUS: "Err", message: "Movie not found" })
                }
                else {
                        res.status(200).send({ STATUS: "OK", message: "Movie found successfully", data: result })
                }

        })
})

module.exports = router