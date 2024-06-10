const User = require('../model/user')

const addUser = async (req, res) => {
    /**
        Write the code to add the user details to the database
    */
    try {
        const userData = req.body;
        if (Object.keys(userData).length == 0) {
            return res.status(400).send({"message": "Invalid data"})
        }
        if (userData.email) {
            const existingUser = await User.findOne({email: userData.email});
            if (existingUser) {
                return res.status(409).send({"message": "User already exists"})
            }
        }
        const user = new User(userData);
        const results = await user.save();
        res.status(201).send(results);
    } catch (err) {
        console.error(err)
        res.status(400).send({"message": "Error in adding the user"})
    }
}


module.exports = addUser;