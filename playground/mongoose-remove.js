const {ObjectID} =  require('mongodb');

var {mongoose} = require('./../server/db/mongoose.js');//es6 destructuring
var {Todo} = require('./../server/models/todo.js');
var {User} = require('./../server/models/user.js');

//removes all node
// Todo.remove({}).then((result) => {
// console.log(result);
// });
/*
n =6 nodes , ok =1 success
CommandResult {
  result: { n: 6, ok: 1 },
  .....
*/

//find one document and deletes(same as findByIdAndRemove but syntax changes)
// Todo.findOneAndRemove({_id: '5b0c56fedc7270f7ce9d75c5'}).then((todo) => {
// console.log(todo);
// });
/*
RESULT:
{ _id: 5b0c56fedc7270f7ce9d75c5,
  text: 'something to do',
  completedAt: null,
  completed: false }
*/

Todo.findByIdAndRemove('5b0c577fdc7270f7ce9d75ed').then((result) => {
console.log(result);
});
