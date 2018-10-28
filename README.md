# Exercise Tracker REST API

#### A microservice project, part of Free Code Camp's curriculum

### User Stories

1. I can create a user by posting form data username to /api/exercise/new-user and returned will be an object with username and _id.
2. I can get an array of all users by getting api/exercise/users with the same info as when creating a user.
3. I can add an exercise to any user by posting form data userId(_id), description, duration, and optionally date to /api/exercise/add. If no date supplied it will use current date. Returned will the the user object with also with the exercise fields added.
4. I can retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(_id). Return will be the user object with added array log and count (total exercise count).
5. I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)

glitch link - https://glitch.com/edit/#!/coffee-angle?path=README.md:1:0
glitch site link - https://glitch.com/edit/#!/coffee-angle?path=README.md:1:0
Tasks
1. create a user through a POST request from a form - return a json object with username and __id attributes.
2. retrieve and display all the users in an array on a GET request
3. add an exercise for a user through a POST request from a form    
4. retrieve and display an exercise log of a user through a GET request
5. retrieve and display an exercise log of a user with option through a GET request

test query for example tasks 4./5. https://fuschia-custard.glitch.me/api/exercise/log?userId=SkxcYhQ37

test query for tasks 4./5. https://ultra-banjo.glitch.me/api/exercise/log?userId=p-G0YHM-H