const express = require('express')
const router = express.Router();
const User = require('../models/user')
const List = require('../models/list')

router.put('/modifyList/create', isLoggedIn, async (req,res) => {
  let action = req.body.action;
  let listName = req.body.name;
  let item = req.body.item;
  try {
    let [existingList] = await List.find({email: req.session.userID});
    if(action === 'create' && (existingList !== undefined)) {
      await List.findOneAndUpdate(
        { email: req.session.userID, items : { $elemMatch: { name: listName } } }, 
        { $push : {
          'items.$.array': {text: item}
        }},
        { new: true, }
      );
      res.json('Success');
      console.log(`Created ${item} in ${listName} owned by ${req.session.userID}`);
    }
  } catch (error) {
    console.log('Modify list /create error');
    console.log(error);
  }
  
})

router.patch('/modifyList/modify', isLoggedIn, async (req,res) => {
  let action = req.body.action;
  let listName = req.body.name;
  let _id = req.body._id;
  let item = req.body.item;
  try {
    let [existingList] = await List.find({email: req.session.userID});
    if(action === 'modify' && (existingList !== undefined)) {
      await List.findOneAndUpdate(
        {email: req.session.userID},
        { $set: {
          'items.$[i].array.$[j].text': item
        } },
        {
          arrayFilters: [
            {'i.name': listName},
            {'j._id': _id}
          ], 
          new: true
        }
      );
      res.json('Success');
      console.log(`Modified ${item} in ${listName} owned by ${req.session.userID}`);
    }
  } catch (error) {
    console.log('Modify list /modify error');
    console.log(error);
  }
})

router.delete('/modifyList/delete', isLoggedIn, async (req,res) => {
  let action = req.body.action;
  let listName = req.body.name;
  let _id = req.body._id;
  let item = req.body.item;
  try {
    let [existingList] = await List.find({email: req.session.userID});
    if(action === 'delete' && (existingList !== undefined)) {
      console.log('this is delete');
      console.log(listName+" "+_id+" "+item);
      await List.findOneAndUpdate(
        {email: req.session.userID, items : { $elemMatch: { name: listName } } },
        { $pull: {
          'items.$.array': {_id: _id } 
        }}
      );
      res.json('Success');
      console.log(`Deleted ${item} in ${listName} owned by ${req.session.userID}`);
    }
  } catch (error) {
    console.log('Modify list /delete error');
    console.log(error);
  }
})

router.delete('/deleteList', isLoggedIn, async (req,res) => {
  let action = req.body.action;
  let listName = req.body.name;
  let _id = req.body._id;
  try {
    let [existingList] = await List.find({email: req.session.userID});
    if(action === 'delete' && (existingList !== undefined)) {
      console.log('this is deleteList');
      console.log(listName+" "+_id);
      await List.findOneAndUpdate(
        {email: req.session.userID, items : { $elemMatch: { name: listName } } },
        { $pull: {
          'items': { _id: _id } 
        }}
      );
      res.json('Success');
      console.log(`Deleted ${listName} owned by ${req.session.userID}`);
    }
  } catch (error) {
    console.log('Modify list /delete error');
    console.log(error);
  }
})

router.post('/addNewList', isLoggedIn, async (req, res) => {
  //make new list document for user/add it to existing if it already exists
  let listObj = req.body.listObj;
  try {
    let [existingList] = await List.find({email: req.session.userID});
    if(existingList !== undefined) {
      // document exists
      let duplicateListName = await List.findOne({email: req.session.userID, items: { $elemMatch: listObj} })
      if(duplicateListName) {
        console.log('Duplicate list name')
        res.status(409).json('Duplicate List Name');
      } else {
        let updatedList = await List.findOneAndUpdate(
          { email: req.session.userID},
          { $addToSet: {items: listObj} },
          { new: true, },
          (error) => { 
            console.log(error);
          }
        )
        res.status(201).json('New List Document made');
      }
    } else {
      // document does not exist
      const newListDocument = new List({
        email: req.session.userID,
        items: listObj
      });
      await newListDocument.save();
      console.log('new list made for: '+req.session.userID);
      res.status(201).json('New List Document made');
    }
  } catch (error) {
    res.status(400).json({message: error.message});
  }
})

router.get('/getLists', isLoggedIn, async (req, res) => {
  try {
    const list = await List.find({email: req.session.userID});
    if(list.length !== 0) {
      const listNames = list[0].items.map(({_id, name, array, ...extras}) => { return({_id: _id, name: name}) });
      res.json(listNames);
    } else {
      res.json("No list for User");
    }
    
  } catch (error) {
    console.log('get list of user error')
    console.log(error)
    res.status(500).json(error.message);
  }
  
})

router.get('/getList/:index', isLoggedIn, async (req, res) => {
  const index = req.params.index;
  try {
    const list = await List.find({email: req.session.userID});
    const listObject = list[0].items[index];
    res.json(listObject);
  } catch (error) {
    console.log('get List error')
    console.log(error)
  }
})

async function isLoggedIn(req, res, next) {
  let user;
  try {
    user = await User.find({email: req.session.userID});
    if (user[0] !== undefined) {
      next();
    } else {
      return res.status(401).json('Email does not exist');
    }
  } catch (error) {
    console.log('error? ' + error.message);
  }
  
}


module.exports = router;