'use strict';

let Users = require('../models/users.js');
let Exercises = require('../models/exercises.js');


exports.hello = (req, res) => {
  res.send("Hello World");
}

exports.addExerciseTrackerUser = (req, res)=>{
  let username = req.body.username;
  
  //Check to see if user currently exists
  Users.findOne({username: username}, (err, data)=>{
    if(err) return console.log(err);
    if(data){
      console.log("A user with this username already exists   "+data);
      return res.json({username: data.username, _id: data._id});
    }else{
      //There is no existing user with that username - Create one
      console.log("I need to create a user");
      let newUser = new Users({username: username});
      newUser.save( (err, data)=>{
        if(err) return console.log(err);
        res.json({
          username: data.username,
          _id: data._id
        });
      });
    }
  });

};

exports.addExercise = (req, res)=>{
  
  Users.findOne({_id: req.body.userId}, (err, data)=>{
    if(err) return console.log(err);
    //Check if the user exists
    if(!data) return res.send("there is no matching userId");
    if(data){
      console.log("The user exists. We now need to add the exercise to the DB");
      let newExercise = new Exercises({
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date ? req.body.date : new Date(),
        username: data.username,
        userId: req.body.userId
      });
      newExercise.save( (err, data)=>{
        if(err) return console.log(err);
      });
      //return the entry to the client
      res.json({
        username: newExercise.username,
        description: newExercise.description,
        duration: newExercise.duration,
        date: new Date(newExercise.date).toDateString()
      });
      
    }
  });

};


exports.getUsers = (req, res)=>{
  
  Users.find({}, (err, data)=>{
    if(err) return console.log(err);
    res.json(data);
  });

};


exports.getExerciseLog = (req, res)=>{
  
  let fromDate = req.query.from;
  let toDate = req.query.to;
  
  Users.findOne({_id: req.query.userId}, (err, data)=>{
    if(err) return console.log(err);
    if(data){
      let user = data;
      console.log("this is the user data object:  "+ user);
      Exercises.find({
        userId: req.query.userId,
        date: {
          $lt: toDate ? toDate.getTime() : Date.now(),
          $gt: fromDate ? fromDate.getTime() : 0
        }
      },
      {},
      {
        limit: 10,
        sort: { date: -1 }
      },
      (err, data)=>{
        if(err) return console.log(err);
        if(data){
          let clientView = {
            _id: user._id,
            username: user.username,
            count: data.length,
            log: data
          };
          res.json(clientView);
        }

      });
      
    }else{
      res.send("unkown userId");
    }
  });
  

};

























exports.test = (req, res) => {
  res.send("Hello World");
};

//generate and add username to the DB
exports.addUser = (req, res) => {
  
};

//add an exercise 