var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,//to eradicate an empty string
    minlength: 1,//to eradicate null string EX: ''(length is 0)
    trim: true//to eradicate null string EX: '   '(length is 3)
  },
  completed: {
  type: Boolean,
  default: false//sets the default value to false if nothing is entered
},
  completedAt: {
    type: Number,
    default: null//sets the default value to null if nothing is entered
  },
  //It gets the id of the user who created it
  _creator: {
    //type is an user object id that is there in db
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {
  Todo: Todo
};
