const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address']
    },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'doctor', 'patient'] },
    specialization: { type: String }, // For doctors
    age: { type: Number },
    photo: { type: String },
    phone: {
        type: String,
        match: [/^\+?[\d\s-]{10,}$/, 'Please fill a valid phone number (at least 10 digits)']
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'leave_requested', 'on_leave', 'return_requested']
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
