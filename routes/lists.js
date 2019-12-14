const express = require('express')
const router = express.Router();
const User = require('../models/user')
const List = require('../models/list')

router.get('/getall', isLoggedIn, async (req, res) => {
  // return list data
})

async function isLoggedIn(req, res, next) {
  let user;
  try {
    user = await User.find({email: req.session.userID});
    console.log('this is loggedin');
    console.log(user[0]);
    if (user[0] !== undefined) {
      next();
    } else {
      // this should never happen
      return res.json({message: "Email does not exist"})
    }
  } catch (error) {
    console.log('error? ' + error.message);
  }
  
}


module.exports = router;