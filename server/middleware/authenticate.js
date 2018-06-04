var {User} = require('./../models/user');
//custom middleware for making route private
//it verifies and authenticates the user based on the values provided
var authenticate = (req, res, next) => {
  //get the header token value from the req url
  var token = req.header('x-auth');

  //User method
  User.findByToken(token).then((user) => {
  //if there is no user with the parameters sent
    if(!user) {
      //the next line after reject won't gets executed, the catch block gets executed directly
     return Promise.reject();
    }
   //after successful verification the user nad token are updated with respective values from db
    req.user = user;
    req.token = token;
   //next should be called to execute the route
    next();
  }).catch((e) => {
    //after the reject promise inuser model this will be sent if the token is invalid after verification
    res.status(401).send();
  });
};

module.exports = {authenticate};
