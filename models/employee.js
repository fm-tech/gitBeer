var mongoose = require('mongoose');


var employeeSchema = new mongoose.Schema({
  fName:  String,
  lName: String,
  isOfAge:   { type: Boolean, default: false },
  eID:  Number,
  hasBeer: { type: Boolean, default: false }
});

module.exports  = mongoose.model('Employee', employeeSchema )
