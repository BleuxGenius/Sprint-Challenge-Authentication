const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../users-model.js');
const jwt = require('jsonwebtoken');
const auth = require('./authenticate-middleware.js')

const {jwtSecret} = require('../secrets.js');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  User.add(user)
  .then(saved => {
    
    // req.session.loggedIn = true;
    res.status(201).json(saved);
  })
  .catch(error => {
    // console.log(error)
    res.status(201).json(error)
  })
});


router.post('/login', (req, res) => {
  // implement login
  let {username, password} = req.body;

  User.findBy({ username })
.first()
.then(user => {
  if (user && bcrypt.compareSync(password, user.password)){
    req.session.user = user; // svaing the information about the user from the session. 
    // now that we have it saved 
    // a cookie will be created and sent back to the client. 
    const token = generateToken(user); // get the token 
    res.status(200).json({
      message: `welcome ${user.username}`, token,
    })
  } else {
    res.status(401).json({
      message: 'you shall not pass'
    })
  }
})
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role || "user",
  };

  const options = {
    expiresIn: "8h",
  };

  return jwt.sign(payload, jwtSecret, options);
}


module.exports = router;
