const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    message: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', AnnouncementSchema);
