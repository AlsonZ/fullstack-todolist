const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.get('/checkCookies', async (req, res) => {
  const userID = req.session.userID;
  const sessionID = req.sessionID;
  console.log('checked Cookies: '+ userID);
  if(req.session.userID) {
    res.json(req.session.userID);
  } else {
    res.json('Unsuccessful');
  }
})

router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.json('logout success');
})

router.post('/login', async (req, res) => {
  if(req.session.userID) {
    console.log('actualy there is a user: '+req.session.userID);
  }
  let user;
  try {
    [user] = await User.find({email: req.body.email.toLowerCase()});
    if(user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.userID = req.body.email; 
        return res.status(200).json(req.session.userID);
      } else {
        return res.status(401).json('failure');
      }
    } else {
      return res.status(401).json('failure');
    }
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
})

router.post('/register', checkUser, async (req, res) => {
  const password = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    registerIP: req.ip,
    email: req.body.email.toLowerCase(),
    password: password,
  })
  try {
    await user.save();
    console.log('new user registered: '+req.body.email);
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
    [user] = await User.find({email: req.body.email});
    if (user !== undefined) {
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