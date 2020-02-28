const express = require('express');

const User = require('./users-model.js');
const router = express.Router();

const authenticate = require('./auth/authenticate-middleware');

// we would like this to be protected 
router.get('/', authenticate, (req, res) => {
    User.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
})

module.exports = router;