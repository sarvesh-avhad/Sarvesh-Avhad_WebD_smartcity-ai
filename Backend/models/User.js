const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['citizen', 'admin', 'ngo', 'government'], default: 'citizen' },
    mobile: { type: String },
    district: { type: String },
    city: { type: String },
    address: { type: String },
    onboarded: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
