const express = require('express')
const router = express.Router();
const User = require('../models/user')

// session?

// Get one/login
router.post('/login', async (req, res) => {
  let user;
  try {
    user = await User.find({email: req.body.email, password: req.body.password});
    if (user[0] !== undefined) {
      console.log('login');
      // email as userID for now
      req.session.userID = req.body.email; 
      return res.status(200).json(req.session.userID);
    } else {
      return res.status(401).json('failure');
    }
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
})
// Create one
router.post('/register', checkUser, async (req, res) => {
  const user = new User({
    registerIP: req.ip,
    email: req.body.email,
    password: req.body.password,
  })
  try {
    const newUser = await user.save();
    // console.log(user);
    console.log('new user registered: '+req.body.email);
    // res.status(201).json(newUser);
    res.status(201).json('registered');
  } catch (error) {
    console.log(error);
    res.status(400).json({message: error.message});
  }
})

// get user with email
async function checkUser(req, res, next) {
  let user;
  try {
    user = await User.find({email: req.body.email});
    if (user[0] !== undefined) {
      // email is taken already exists
      console.log('User exists');
      return res.status(409).json({message: "Email exists"})
    }
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
  res.user = user; // duno if need the user
  next();
}


module.exports = router;