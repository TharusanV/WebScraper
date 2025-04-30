const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
});

const User = mongoose.model('User', userSchema);

module.exports = {User};



async function createTempUser(){
  const tempUser = new User({username: "test", password: "t1"})
  await tempUser.save();
}

//createTempUser()