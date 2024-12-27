const mongoose = require('mongoose');

const securitySchema = new mongoose.Schema({
  isDoorLocked: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Security', securitySchema);
