//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
 if(err){
  return console.log('unable to connect to the database');
}
console.log('Successfully connected to the Mongodb');


//deleteMany
db.collection('Todos').deleteMany({text: 'jaibalayya'}).then((result) => {
  console.log(result);
});
/*
RESULT:
n:3(number of items deleted)
ok:1(success)
result: { n: 3, ok: 1 },
  connection:
   Connection {
     domain: nul......
*/

//deleteOne(deletes the first item)
db.collection('Todos').deleteOne({text: 'hello'}).then((result) => {
console.log(result);
});

/*
RESULT:
n:1(number of items deleted)
ok:1(success)
CommandResult {
  result: { n: 1, ok: 1 },
*/

findOneAndDelete(retreives the entire document)
db.collection('Todos').findOneAndDelete({text: 'hello'}).then((result) => {
  console.log(result);
})

db.collection('Users').findOneAndDelete({_id: new ObjectID('5b09eb00b40c1821f40be771')}).then((result) => {
console.log(result);
});

/*
RESULT:
Successfully connected to the Mongodb
{ lastErrorObject: { n: 1 },
  value: { _id: 5b09ff55dc7270f7ce9d68ee, text: 'hello', completed: true },
  ok: 1 }
*/
// db.close();
});

/* in robomongo the new db(ToDoApp) won't show up since
there is no data in it. adding data will create new db in mongodb
*/
