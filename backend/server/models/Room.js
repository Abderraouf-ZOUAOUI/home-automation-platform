const mongoose = require('mongoose');

const ComponentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isOn: { type: Boolean, default: false },
  unit: { type: String, default: null }, // Optional, e.g., "27° / 60%"
});

const RoomSchema = new mongoose.Schema({
  roomName: { type: String, required: true, unique: true },
  components: [ComponentSchema],
  email: { type: String, required: true } // Store email directly
});

module.exports = mongoose.model('Room', RoomSchema);
