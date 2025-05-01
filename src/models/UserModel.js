const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
});

const User = mongoose.model('User', userSchema);

module.exports = {User};



async function createTempUser(){
  const hashedPassword = await bcrypt.hash("t1", 10);
  const tempUser = new User({username: "test", password: hashedPassword})
  await tempUser.save();
}

//createTempUser()