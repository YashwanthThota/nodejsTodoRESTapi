const validator = require('validator');//to valid the email
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,//remove spaces at front and back
    minlength: 1,
    unique: true,//check the email id unique
    //custom validator
    validate: {
     /*validator: (value) => {
         return validator.isEmail(value);
      },*/
      //the above steps can be written as the below one
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  /*
  The Access Token is a credential that can be used by an application to access an API.
It can be any type of token (such as an opaque string or a JWT) and is meant for an API. Its purpose is to inform the API that the bearer of this token has been authorized to access the API and perform specific actions (as specified by the scope that has been granted).
  */
  //tokens are applicable to nosql  not for mysql
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
     type: String,
     required: true
    }
  }]
});

//it will sent the mentioned objects to the user eliminating all the objects
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};
UserSchema.methods.generateAuthToken = function () {
//this keyword cant be used with arrow function
var user = this;//uses the current user
//creation of token follow user model
var access = 'auth';


//user._id gets the current user id and store it in _id
//access = 'auth'
//abc123 is secretkey
var token = jwt.sign({_id: user._id.toHexString(),access},'abc123').toString();

//it updates the tokens in the user model with generated access and token
//the tokens object is an array(check model), so we can use normal array operations for its manipulation
user.tokens = user.tokens.concat({ access,token});

//saving the above updates
return user.save().then(() => {
  return token;
})
};

UserSchema.methods.removeToken = function (token) {
var user = this;

return user.update({
//it is an aarray function, it pulls or delete the value out
  $pull: {
   tokens: {
     //token: token
     // OR
     token
   }
  }
});
};

////////////////////////////////////////////////////
//statics is used for model method and methods is user for insatnce method (refer upper scenario)
UserSchema.statics.findByToken = function (token) {
var User = this;//it calls the entire model because it is a model method
var decoded;

try {
//it will verify the user based on the token supplied
 decoded = jwt.verify(token, 'abc123');
} catch (e){
  //if the token invalid the promise rejects and remaining lines won't get executed
// return new Promise((resolve, reject) => {
// reject();
// OR
return Promise.reject();
}
//if try block is successful then the return statement get executed
//findOne function queries the db based on the token value
return User.findOne({
//REFER USER MODEL
//the _id in the user model should be equal to the decoded id
//_id: decoded._id,
        //OR
'_id': decoded._id,
//both token and access were encapsulated in an array so we can access by using eg: tokens.token
'tokens.token': token,
'tokens.access': 'auth'
});
};

UserSchema.statics.findByCredentials = function (email, password) {
var user = this;

return User.findOne({email}).then((user) => {
  //if there is no user with the entered email reject it
  if(!user){
    return Promise.reject();
  }
  //if email exists
  return new Promise ((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, res) => {
      if(res){
        resolve(user);
      }
      return reject();
    });
  })

})
};
//middleware to run an event before saving the user model data to db
UserSchema.pre('save', function (next) {
  var user = this;
  //if the user password already save and want changed it again after sometime this will upadete the password
  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err,hash) => {
       user.password = hash;
       next();
      });
    });
  }else {
    next();
  }
});

var User = mongoose.model('User', UserSchema);
module.exports = {
  User: User
};
