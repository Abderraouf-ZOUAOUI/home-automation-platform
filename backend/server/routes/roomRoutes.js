const express = require('express');
const router = express.Router();
const Room = require('../models/Room'); 
const EmployeeModel = require('../model/Employee');

// Middleware to check if the user is authenticated by email
const authenticateUser = async (req, res, next) => {
  const email = req.header('email');
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.userId = user._id;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Error authenticating user', message: err.message });
  }
};

// Get all rooms for the logged-in user
router.get('/', authenticateUser, async (req, res) => {
  try {
    const email = req.header('email');
    const rooms = await Room.find({ email: email });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a room
router.post('/', authenticateUser, async (req, res) => {
  const { roomName, components } = req.body;
  const { userId } = req;

  try {
    const newRoom = new Room({
      roomName,
      components,
      email: req.header('email')
    });
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a room
router.put('/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { roomName, components } = req.body;
  const email = req.header('email');

  try {
    const updatedRoom = await Room.findOneAndUpdate(
      { _id: id, email },
      { roomName, components },
      { new: true, runValidators: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ error: 'Room not found or unauthorized' });
    }
    res.json(updatedRoom);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a room
router.delete('/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const email = req.header('email');

  try {
    const deletedRoom = await Room.findOneAndDelete({ _id: id, email });
    if (!deletedRoom) {
      return res.status(404).json({ error: 'Room not found or unauthorized' });
    }
    res.json(deletedRoom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update component state in a room
router.patch('/:roomId/components/:componentId', authenticateUser, async (req, res) => {
  const { roomId, componentId } = req.params;
  const { isOn } = req.body;
  const email = req.header('email');

  try {
    const room = await Room.findOne({ _id: roomId, email });
    
    if (!room) {
      return res.status(404).json({ error: 'Room not found or unauthorized' });
    }

    const component = room.components.id(componentId);
    if (!component) {
      return res.status(404).json({ error: 'Component not found' });
    }

    component.isOn = isOn;
    await room.save();
    
    res.json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;