const Issue = require('../models/Issue');

// Create a new issue (Report an Issue)
exports.createIssue = async (req, res) => {
    try {
        const { title, category, location, description, isUrgent, imageUrl } = req.body;

        // Basic validation
        if (!title || !category || !location || !description) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        const newIssue = new Issue({
            title,
            category,
            location,
            description,
            isUrgent: isUrgent || false,
            imageUrl: imageUrl || '',
            createdBy: req.user.id // Extracted from JWT auth middleware
        });

        const savedIssue = await newIssue.save();
        res.status(201).json(savedIssue);
    } catch (err) {
        console.error('Error creating issue:', err);
        res.status(500).json({ error: 'Server error while creating issue.' });
    }
};

// Fetch issues created by the logged-in user (My Reports)
exports.getMyReports = async (req, res) => {
    try {
        const myIssues = await Issue.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(myIssues);
    } catch (err) {
        console.error('Error fetching my reports:', err);
        res.status(500).json({ error: 'Server error while fetching reports.' });
    }
};
