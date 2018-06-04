//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
 if(err){
  return console.log('unable to connect to the database');
}
console.log('Successfully connected to the Mongodb');

//REFER: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate
//findOneAndUpdate(filter, update, options, callback)
// db.collection('Todos').findOneAndUpdate({
//   _id: new ObjectID('5b09e2b433c1a8024487cd92')
//   },{
//     //REFER: https://docs.mongodb.com/manual/reference/operator/update/set/#up._S_set
//     $set:{
//         completed: true
//       }
//   },{
//    returnOriginal: false
//  }).then((result) => {
// console.log(result);
// });
/*RESULT:
Successfully connected to the Mongodb
{ lastErrorObject: { n: 1, updatedExisting: true },
  value:
   { _id: 5b09e2b433c1a8024487cd92,
     text: 'Something to do',
     completed: true },
  ok: 1 }
*/

db.collection('Users').findOneAndUpdate(
  {
   _id: new ObjectID('5b09e4f00d2cb63b443bfcc1')
 },{ $set: {
   name: 'Black Panther'
 },
 $inc: {
   age: 1
 }
  },{
    returnOriginal: false//if true - it will return the original value instead of the updated value
  }
).then((result) => {
  console.log(result);
});

//db.close();
});
