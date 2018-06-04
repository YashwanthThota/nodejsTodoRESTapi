const MongoClient = require('mongodb').MongoClient;

/**
MongoClient.connect is used to connect to db

it takes to argument:1.) url
                     2.) anonymous function
1.) url: used to access localhost and cloud db(same syntax)
**/
//** /ToDoApp will automatically create a db without manual creaton
//even the db doesn't exist

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err, db) => {
 if(err){
  return console.log('unable to connect to the database');
}
console.log('Successfully connected to the Mongodb');
//adding collection(table)
//'Todos' is the name of the collection
//insertOne will insert one document(row)

/*db.collection('Todos').insertOne({
text: 'Something to do',//field(columns)
completed: false
}, (err, result) => {
if(err) {
  return console.log('unable to insert todo', err);
}
console.log(JSON.stringify(result.ops, undefined, 2));
//result.ops stors all documents(rows)
});*/


//Users(name,age,location)

db.collection('Users').insertOne({
  name: 'yashwanth thota',
  age: 22,
  location: 'Arlington'
},(err, result) => {
  if(err) {
    return console.log('Unable to insert the document',err);
  }
  console.log(JSON.stringify(result.ops, undefined, 2));
});

db.close();
});
/* in robomongo the new db(ToDoApp) won't show up since
there is no data in it. adding data will create new db in mongodb
*/
