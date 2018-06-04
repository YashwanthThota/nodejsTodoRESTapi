const _ = require('lodash')//this is used for update or patch resource
const {ObjectID} =  require('mongodb');//used for individual resource id invalid check
//CRUD
//CREATE - USE POST FOR CREATE
/* Check Postman app */
const express = require('express');
const bodyParser = require('body-parser');//it is used to read and store the request data
//In video
// var express = require('express');
// var bodyParser = require('body-parser');

//we are using the assigned variables
var {mongoose} = require('./db/mongoose.js');//es6 destructuring
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
var {authenticate} = require('./middleware/authenticate');
var app = express();

//this is for the heroku or aws or for local port setup etc.,
const port = process.env.PORT || 3000;

//3rd party middleware, it freturns a function
app.use(bodyParser.json());



/////////////////////////////////////////////////Todo CRUD Operations////////////////////////////////////////

//it will create a resource
app.post('/todos',authenticate, (req,res) => {
  //console.log(req.body);//the bodyparser stores the body
  //call Todo constructor in todo.js
  var todo = new Todo({
    text: req.body.text,//the bodyparser stores the body and convert it into text
   //it gets the if from authenticate and equals it to _creator
    _creator: req.user._id
  });

  //save the data into database
  todo.save().then((doc) => {
   res.send(doc);
 }, (e) => {
   //if status is zero send error
   //REFER FOR STATUS: https://httpstatuses.com/
   res.status(400).send(e);
  });
});

//it will get the resource
app.get('/todos',authenticate, (req,res) => {
  Todo.find({
    //getting the details of id of the requested user
    //req.user._id comes from authenticate
    _creator: req.user._id
  }).then((todos) => {//we can use (doc) inplace of (todos), it is independent
    //Using object because we can send object along with some othe data for example
    //res.send({todos, status:'345'});
    res.send({todos});
  }, (e) => {
    //if status is zero send error
    //REFER FOR STATUS: https://httpstatuses.com/
    res.status(400).send(e);
  });
});

//it will get individual resource
app.get('/todos/:id', authenticate, (req, res) => {
 //console.log(req.params);//RESULT: { id: '123' } for localhost:3000/todos/123
var id = req.params.id;

//Valid Id or not using ObjectID
//404 - Not Found
if(!ObjectID.isValid(id)) {
  return res.status(404).send();//it will send 404 not found without the error, if u want error use .send(e)
}
//it checks both id and creator for verification, because findbyid can be used by other user to access some other user by using their id's
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    //if todo is empty it shuld return 404
    if(!todo){
      res.status(404).send();//it will send 404 not found without the error, if u want error use .send(e)
    }
    //success
      res.send({todo});
}).catch((e) => {
  res.status(400).send();//it will send 400 bad request without the error, if u want error use .send(e)
  });
});

//removing one resource form db(for all check playground > mongoose-remove)
app.delete('/todos/:id',authenticate, (req,res) => {
//get id
var id = req.params.id;
//validate the id
if(!ObjectID.isValid(id)) {
  return res.status(404).send();//it will send 404 not found without the error, if u want error use .send(e)
}
//it checks both id and creator for verification, because findbyid can be used by other user to access some other user by using their id's
Todo.findOneAndRemove({
  _id: id,
  _creator: req.user._id
}).then((todo) =>
{
  //if todo is empty it should return 404
  if(!todo){
    res.status(400).send();
  }
  //success
  res.send({todo});
}).catch((e) => {
  res.status(400).send();
});
});

//Update or patch the resource
app.patch('/todos/:id', authenticate, (req,res) =>
{
var id = req.params.id;
//this is lodash library function which restricts the user to update only mentioned values in the lodash function
//the user can update text and completed
// the pick function only picks those two values in the data body
var body = _.pick(req.body, ['text', 'completed']);

if(!ObjectID.isValid(id)) {
  return res.status(404).send();//it will send 404 not found without the error, if u want error use .send(e)
}

//it check the body.completed is boolean and true
if(_.isBoolean(body.completed) && body.completed){
body.completedAt = new Date().getTime();//time in milli sec from 1970
}else{
body.completed = false;
body.completedAt = null;
}

//REFER: playground>mongodb-update
//{new:true} is similar to return original in native mongoose(it returns the updated value)
//it checks both id and creator for verification, because findbyid can be used by other user to access some other user by using their id's
Todo.findOneAndUpdate({_id: id, _creator: req.user._id},
   {$set : body},{new: true}).then((todo) => {
if(!todo) {
  return res.status(404).send();
}
res.send({todo});
}).catch((e) => {
res.status(400).send();
});
});

/////////////////////////////////////////////////User CRUD Operations////////////////////////////////////////
/*drop the db after changing the model*/

app.post('/users', (req, res) => {
var body = _.pick(req.body,['email','password']);
var user = new User(body);
//User.findByToken(Custom method)(model methods => donot require an individual document)
//user.generateAuthToken(instance methods => adding token to individual token document)
user.save().then(() =>{
return user.generateAuthToken();
// res.send(user);
}).then((token) => {
  res.header('x-auth', token).send(user);
}).catch((e) => {
  res.status(400).send(e);
});
});

//USER LOGIN FUNCTION
app.post('/users/login', (req,res) => {
  var body = _.pick(req.body,['email','password']);

  User.findByCredentials(body.email, body.password).then((user) => {
   return user.generateAuthToken().then((token) => {
    res.header('x-auth', token).send(user);
   });
  }).catch((e) => {
res.status(400).send();
  });
});

app.get('/users/me',authenticate, (req,res) => {
// //get the header token value from the req url
// var token = req.header('x-auth');
//
// //User method
// User.findByToken(token).then((user) => {
// //if there is no user with the parameters sent
//   if(!user) {
//     //the next line after reject won't gets executed, the catch block gets executed directly
//    return Promise.reject();
//   }
//   res.send(user);
res.send(req.user);
})

//it removes the token not the user credentials
app.delete('/users/me/token', authenticate, (req, res) => {
req.user.removeToken(req.token).then(() => {
  res.status(200).send();
}, () => {
  res.status(400).send();
})
});

app.listen(port, () => {
  console.log(`started on port ${port}`);
});
