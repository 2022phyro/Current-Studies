

//import the require Module

//Post method will post user in database
router.post('/', async (req, res) => {


        //retreive user from the req body
        const user = req.body;

        //calling saveUser on controller layer
        //return result or err
        userController.saveUser(newUser, (err, result) => {
                if (err) {
                        res.status(400).send({ STATUS: "Err", message: "Error in saving user" })
                }
                else {
                        res.status(200).send({ STATUS: "OK", message: "User saved successfully", data: result })
                }

        })
})

////Get method will get specific  user from database
router.get('/:id', async (req, res) => {

        //retreive userId from the req.params
        const userId = req.params.id;
        //calling getUserById on controller layer
        //return result or err
        userController.getUserById(userId, (err, result) => {
                if (err || !result) {
                        res.status(404).send({ STATUS: "Err", message: "User not found" })
                }
                else {
                        res.status(200).send({ STATUS: "OK", message: "User found successfully", data: result })
                }



        })
})

module.exports = router