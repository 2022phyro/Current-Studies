const express = require('express');
const config = require("../config");
const router = express.Router();
const oauthCtrl = require("./auth.controller");

// redirects the login to consent authorization screen from github
router.get('/login', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.CLIENT_ID}`)
});


// Callback url to which github oauth code is sent 
router.get('/callback', (req, res) => {
        try {
                oauthCtrl.oauthProcessor(req.query.code, (err, data) => {
                        if (err) {
                                res.status(401).send({error: "Bad request"})
                        } else {
                                if (!data) {
                                        res.status(401).send({error: "Bad request"})
                                } else {
                                        res.redirect(`/welcome.html?token=${data}`)
                                }
                        }
                })
        } catch (err) {
                console.error(err)
                res.status(500).send({error: "An unexpected error occurred"})

        }
        // Return the token in cookie
        // Data should be sent either in cookie or in session storage
       
});

module.exports = router;