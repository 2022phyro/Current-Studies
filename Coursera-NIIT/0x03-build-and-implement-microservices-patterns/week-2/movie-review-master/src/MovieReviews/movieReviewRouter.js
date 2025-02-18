const axios = require('axios');
const MovieReview = require('./movieReviewModel')

//import require module

//This Post will save MovieReview in database

router.post('/', async (req, res) => {
      //Create newMovieReview object from userId and movieId 
      const { userId, movieId } = req.body;
      if (!userId || !movieId) {
        return res.status(400).send({ STATUS: "Err", message: "userId and movieId are required" })
      }
      try {
        const userResponse = await axios.get(`http://localhost:4000/user/${userId}`);
        const user = userResponse?.data;
        if (!user) {
          return res.status(404).send({ STATUS: "Err", message: "User not found" })
        }
    
      } catch (err) {
        console.error(err)
        return res.status(404).send({ STATUS: "Err", message: "User not found" })
      }
      try {
        const newMovieReview = await new MovieReview({ userId, movieId }).save();
        res.status(200).send({ STATUS: "OK", message: "MovieReview saved successfully", data: newMovieReview })
      } catch (err) {
        console.error(err)
        res.status(400).send({ STATUS: "Err", message: "Error in saving MovieReview" })
      }   
 })


 //This get will retreive userid and its movie data
 router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).send({ STATUS: "Err", message: "userId is required" })
  }
  try {
    try{
      const userResponse = await axios.get(`http://localhost:4000/user/${userId}`);
      const user = userResponse?.data;
      if (!user) {
        return res.status(404).send({ STATUS: "Err", message: "User not found" })
      }
  
    } catch (err) {
      console.error(err)
      return res.status(404).send({ STATUS: "Err", message: "User not found" })
    }
    const movieReviews = await MovieReview.find({ userId }).lean().exec();
    if (!movieReviews || movieReviews.length === 0) {
      return res.status(200).send({ ...user, movies: [] })
    }
    let movies = await Promise.all(movieReviews.map(async (rev) => {
      try {
        const movieResponse = await axios.get(`http://localhost:5000/movie/${rev.movieId}`);
        return movieResponse?.data;
      } catch (err) {
        console.error(err)
        return null;
      }
    }));
    movies = movies.filter((m) => m);
    if (!movies || movies.length === 0) {
      return res.status(200).send({ ...user, movies: [] })
    }
    res.status(200).send({ ...user, movies })
  } catch (err) {
    console.error(err)
    res.status(400).send({ STATUS: "Err", message: "Error in getting movie information for this user" })
  }
})
  






module.exports = router
