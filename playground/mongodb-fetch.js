//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
 if(err){
  return console.log('unable to connect to the database');
}
console.log('Successfully connected to the Mongodb');

//for fetching all the documents in a collection
/*
find is used to retrieve and isArray to convert it into array and then is a promise which executes either docs or err
*/
db.collection('Todos').find().toArray().then((docs) => {
console.log(JSON.stringify(docs, undefined, 2));
},(err) => {
console.log(err);
});
// db.close();
});

//DATA Filtering using texts
db.collection('Todos').find({text: 'Something to do'}).toArray().then((docs) => {
console.log(JSON.stringify(docs, undefined, 2));
},(err) => {
console.log(err);
});
// db.close();
});

// db.collection('Todos').find({completed: false}).toArray().then((docs) => {
console.log(JSON.stringify(docs, undefined, 2));
},(err) => {
console.log(err);
});
// db.close();
});

//Accessing with an object(because object is not a string)
db.collection('Todos').find({
  _id: new ObjectID('5b09e2b433c1a8024487cd92')
}).toArray().then((docs) => {
console.log(JSON.stringify(docs, undefined, 2));
},(err) => {
console.log(err);
});

//counting the documents
//refer: http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html#count
db.collection('Todos').find().count().then((count) => {
console.log(count);
},(err) => {
console.log(err);
});

db.collection('Users').find({name: 'yashwanth'}).toArray().then((docs) => {
console.log(docs);
},(err) => {
console.log(err);
});

// db.close();
});

/* in robomongo the new db(ToDoApp) won't show up since
there is no data in it. adding data will create new db in mongodb
*/
