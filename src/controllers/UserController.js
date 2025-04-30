const { User } = require('../models/UserModel'); 

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Look for user in DB
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    // Check password match
     //const match = await bcrypt.compare(password, user.password);
    //if (!match) {
      //return res.status(403).json({ message: 'Incorrect password.' });
    //}

    // Login success
    res.status(200).json({ message: 'Login successful', user: { id: user._id, username: user.username } });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed due to server error.' });
  }

};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } 
  catch (err) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

const createUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Missing fields' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } 
  catch (err) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } 
  catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

module.exports = { loginUser, getAllUsers, createUser, updateUser, deleteUser };