const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    fullName: { type: String, default: '' },
    address: { type: String, default: '' },
    avatar: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserProfile', userProfileSchema);
