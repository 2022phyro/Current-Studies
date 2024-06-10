const express = require('express')
const userController = require('./userController')
const router = express.Router()


//This get method will get the user with token
router.get('/',(req,res)=>{
    try {
       //retrive userdata from req claims
        const userdata = req.claims
        if (!userdata.email) {
                return res.status(400).send("User's email not available")
        }

        //Calling controller findUser method return the error or result
        userController.findUser(userdata.email,(err,result)=>{
                if (err) {
                        res.status(404).send("User not found")
                } else {
                        res.status(200).send(result)
                }
           
        })
    } catch (err) {
        res.status(500).send({error:"An unexpected error occurred", err})

    }
   
})


module.exports = router