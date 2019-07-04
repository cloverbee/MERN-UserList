const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  
  sex: { type: String, default: null },
  age: { type: Number, default: null },
  password: { type: String, required: true },
  //email: { type: String, defulat: null },
  //officePhone: { type: Number, default: null },
  //cellPhone: { type: Number, defuault: null },
  //directReports: { type: [String], defulat: [] },
  //manager: { type: String, default: null }
});

let Employee = mongoose.model("User", userSchema);

module.exports = Employee;
