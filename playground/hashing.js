//SHA256 is a fucntion in crypto-js library
const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

//it generates the hash by using salt and it runs for 10 rounds
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err,hash) => {
// console.log(hash);
//   });
// });

hashedpassword = '$2a$10$Z8sg2SXcevViT623FjdWru4UIxn1EQJz9en3w34CMXQbPmafGOqvi';
bcrypt.compare('13abc!', hashedpassword, (err, res) => {
  console.log(res);
});
// var data = {
//   id: 10
// }
//
// //it generates a token and it send it to the user
// var token = jwt.sign(data,'123abc');//123abc is salt
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);
// // var message = 'I am user number 3';
// //
// // //hash returns object convert it to string
// // var hash = SHA256(message).toString();
// // console.log(`Message: ${message}`);
// // //how many times u run the program th hash remains the same
// // console.log(`Hash: ${hash}`);
// /*
// RESULT:
// Message: I am user number 3
// Hash: 9da4d19e100809d42da806c2b7df5cf37e72623d42f1669eb112e23f5c9d45a3
// */
// ///////////////////////////

//this data is send back to the client
// var data = {
//   id: 4
// };
//
// var token = {
//   data: data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
// //data that comes back is stored in resultHash
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if(resultHash === token.hash) {
//   console.log('data was not changed');
// }else {
//   console.log('data was changed. do not trust');
// }
