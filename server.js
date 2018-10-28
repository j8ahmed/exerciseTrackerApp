const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/exercise-track' )

const urlHandler = require('./controllers/urlHandler.js');

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

/*******Routes for exercise Tracker microservice*/

//Generate and add a username to the DB from a form POST Request
app.post('/api/exercise/new-user/', urlHandler.addExerciseTrackerUser);

//Add an exercise to the DB with an existing username from a form POST Request
app.post('/api/exercise/add/', urlHandler.addExercise );

//Retrieve all the existing users through a GET Request
app.get('/api/exercise/users/', urlHandler.getUsers/*method for all users from DB*/);

//Retrieve a full exercise log of any user with a count limit through a GET Request
app.get('/api/exercise/log?', urlHandler.getExerciseLog/*method for all users from DB*/);


//test
app.get('/api/exercise/hello', urlHandler.hello);



/***********************************************/

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
