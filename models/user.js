const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['Admin', 'Customer', 'Support', 'Sales'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);