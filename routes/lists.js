const express = require('express')
const router = express.Router();
const User = require('../models/user')
const List = require('../models/list')


router.post('/addNewList', isLoggedIn, async (req, res) => {
  //make new list document for user/ add it to existing if exists
  let listObj = req.body.listObj;
  console.log('this is new list');
  // console.log(listObj);
  try {
    let existingList = await List.find({email: req.session.userID});
    if(existingList[0] !== undefined) {
      // list document for user exists
      console.log('user exists');
      let checkDuplicateListName = await List.findOne({email: req.session.userID, items: { $elemMatch: listObj} })
      if(checkDuplicateListName) {
        console.log('duplicate list name')
        res.status(409).json('Duplicate List Name');
      } else {
        let updatedList = await List.findOneAndUpdate(
          { email: req.session.userID},
          { $addToSet: {items: listObj}},
          { new: true,  },
          (error) => { 
            console.log(error);
          }
        )
        console.log('check if pushed into list');
        console.log(updatedList);
        res.status(201).json('New List Document made');
      }
    } else {
      // document does not exist
      const newListDocument = new List({
        email: req.session.userID,
        items: listObj
      });
      const newListMade = await newListDocument.save();
      console.log('new list made for: '+req.session.userID);
      res.status(201).json('New List Document made');
    }
  } catch (error) {
    res.status(400).json({message: error.message});
  }
})

router.get('/getall', isLoggedIn, async (req, res) => {
  // return list data
  try {
    const list = await List.find({email: req.session.userID});
    if(list) {
      res.json(list);
    } else {
      res.json("No list for User");
    }
    
  } catch (error) {
    console.log('get list of user error')
    console.log(error)
    res.status(500).json(error.message);
  }
  
})

async function isLoggedIn(req, res, next) {
  let user;
  try {
    user = await User.find({email: req.session.userID});
    // console.log('this is loggedin');
    // console.log(user[0]);
    if (user[0] !== undefined) {
      next();
    } else {
      // this happens when people dont login
      return res.status(401).json('Email does not exist');
    }
  } catch (error) {
    console.log('error? ' + error.message);
  }
  
}


module.exports = router;