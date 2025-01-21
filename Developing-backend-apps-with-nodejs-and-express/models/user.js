const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false, //to not show password in response
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
    message: "Passwords are not the same!",
  },
});

// between receiceing data and saving to DB and sending response
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //no passowrd

  this.password = await bcrypt.hash(this.password, 12); //? 12 is the cost parameter
  this.passwordConfirm = undefined; //dont persist passwordConfirm to the database
  next();
});

// login page to check if password is correct
userSchema.methods.correctPassword = async function (
  candidatePasswordx,
  userPasswordx
) {
  return await bcrypt.compare(candidatePasswordx, userPasswordx);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
