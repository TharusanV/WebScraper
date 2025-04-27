const mongoose = require('mongoose');
const { User } = require('../models/UserModel');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};


run();

async function run() {
  const user = new User({name: "Bob", email: "bob@gmail.com", password: "test"})
  await user.save();
  console.log(user);
}


module.exports = connectDB;
