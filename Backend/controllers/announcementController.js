const Announcement = require('../models/Announcement');

exports.createAnnouncement = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const announcement = new Announcement({
            message,
            createdBy: req.user.id
        });

        await announcement.save();
        res.status(201).json(announcement);
    } catch (err) {
        console.error('Error creating announcement:', err);
        res.status(500).json({ error: 'Server error creating announcement' });
    }
};

exports.getAnnouncements = async (req, res) => {
    try {
        // Fetch latest 10 announcements
        const announcements = await Announcement.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('createdBy', 'name');

        res.status(200).json(announcements);
    } catch (err) {
        console.error('Error fetching announcements:', err);
        res.status(500).json({ error: 'Server error fetching announcements' });
    }
};
