const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    description: { type: String, required: true },
    imageUrl: { type: String, default: '' },
    isUrgent: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
        default: 'Pending'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    feedbacks: [{
        text: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    priorityScore: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Issue', issueSchema);
