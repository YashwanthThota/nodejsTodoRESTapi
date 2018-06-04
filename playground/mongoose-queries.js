// const {ObjectID} =  require('mongodb');

var {mongoose} = require('./../server/db/mongoose.js');//es6 destructuring
var {Todo} = require('./../server/models/todo.js');
var {User} = require('./../server/models/user.js');

id = '5b0b20a93847ae3430500ac2';

// if(!ObjectID.isValid(id)) {
//   console.log('Id is invalid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
// console.log(todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todos) =>{
// console.log(todos);
// });

//preferred
Todo.findById(id).then((todos) => {
if(!todos) {
  return console.log('Id not found');//if the id is not found in db it will return 'null'
}
console.log('todo By Id', todos);
}).catch((e) => {
  //id = '5b0b20a93847ae3430500ac211'; handling invalid id
  console.log('The id is invalid',e);
  //OR we can handle it with native mongodb
  /*
{ CastError: Cast to ObjectId failed for value "5b0b20a93847ae3430500ac211" at path "_i
......
  */
});

User.findById('5b0b28fc0e345f40473472af').then((user) =>{
if(!user) {
  return console.log('User not found');
}
console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
console.log(e);
});
