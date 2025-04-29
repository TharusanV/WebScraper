const User = require('../models/UserModel')

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
 
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json(newUser);
  } 
  catch (err) {
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

module.exports = { getAllUsers, createUser, updateUser, deleteUser };