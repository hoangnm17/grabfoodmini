const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: { type: String, default: 'Khách lẻ' },
    phone: { type: String, required: true, unique: true },
    email: { type: String, default: null },
    password: { type: String },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
}, { timestamps: true });

module.exports = mongoose.model('User', schema);