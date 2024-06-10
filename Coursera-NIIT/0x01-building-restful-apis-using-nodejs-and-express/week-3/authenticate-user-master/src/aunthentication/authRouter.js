const express = require('express');
const authController = require('./authController');
const router = express.Router();

//This method post will regiater the use
router.post('/register', (req, res) => {
        try {
                const { name, email, password } = req.body;
                if (!(name && email && password)) {
                        return res.status(400).send({ error: "Required inputs missing" })
                }
                const userDetails = { name, email, password }
                authController.registerUser(userDetails, (err, result) => {
                        if (err) {
                                console.error(err)
                                res.status(400).send({ error: "A user with this email already exists" })
                        } else {
                                res.status(201).send({STATUS: "OK", data: result})
                        }

                })
        } catch (err) {
                console.error(err)
                res.status(500).send({error: "An unexpected error occurred", err})
        }
})

//This method post will login the user once they are registered
router.post('/login', (req, res) => {
        try {
                const { email, password } = req.body;
                if (!(email && password)) {
                        return res.status(400).send({ error: "Required inputs missing" })
                }
                authController.loginUser({ email, password }, (err, result) => {
                        if (err) {
                                res.status(401).send({ error: "Invalid email or password" })
                        } else {
                                res.status(200).send({STATUS: "OK", data: result})
                        }
                })
        } catch (err) {
                res.status(500).send({error:"An unexpected error occurred"})
        }

})

module.exports = router