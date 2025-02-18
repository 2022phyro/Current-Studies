const User = require('../model/user')
const Movie = require('../model/movie')

const getMovies = async (req, res) => {
    /**
        Write the code to get the movie details from database
    */
    try {
        const {userId} = req.params;
        const user = await User.findOne({email: userId});
        if (!user) {
            return res.status(404).send({"message": "User not found"})
        }
        const movies = await Movie.find({movieId: {$in: user.watchList}}).lean().exec();
        res.status(200).send(movies);
    } catch(err) {
        console.error(err)
        res.status(404).send({"message": "Error in getting the movie details"})
    }

}

const addMovie = async (req, res) => {
    /**
        Write the code to add the movie details to the database
    */
    try {
        const {userId} = req.params;
        const user = await User.findOne({email: userId});
        if (!user) {
            return res.status(404).send({"message": "User not found"})
        }
        const mData = req.body;
        if (!mData.movieId || !mData.movieName || !mData.yearReleased ) {
            return res.status(400).send({"message": "Invalid input"})
        }
        if (mData.movieId) {
            const existingMovie = await Movie.findOne({movieId: mData.movieId}).lean().exec();
            if (existingMovie) {
                return res.status(409).send({"message": "Movie already exists"})
            }
        }
        const newProduct = new Movie(mData).save();
        user.watchList.push(mData.movieId);
        await user.save();
        res.status(200).send(user.watchList);
    } catch (err) {
        console.error(err)
        res.status(400).send({"message": "Error in adding the movie"}) 
    }
}

const deleteMovie = async (req, res) => {
    /**
        Write the code to delete the movie details from database
    */
    try {
        const {userId} = req.params;
        const user = await User.findOne({email: userId});
        if (!user) {
            return res.status(404).send({"message": "User not found"})
        }
        await user.updateOne({$pull: "watchList"});
        res.status(200).send({"message": "Movies deleted successfully"})
    } catch (err) {
        console.error(err)
        res.status(400).send({"message": "Error in deleting the movie"})
    }
}

module.exports = { getMovies, addMovie, deleteMovie };