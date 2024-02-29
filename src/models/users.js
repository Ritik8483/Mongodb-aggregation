const mongoose = require("mongoose");
const { Schema } = mongoose;

//validations https://mongoosejs.com/docs/validation.html
const usersSchema = new Schema({
  name: String,
  index: Number,
  age: Number,
  isActive: Boolean,
  registered: String,
  gender: String,
  eyeColor: String,
  favoriteFruit: String,
  company: Array,
  tags: Array,
});

exports.User = mongoose.model("User", usersSchema); //model is always singular
