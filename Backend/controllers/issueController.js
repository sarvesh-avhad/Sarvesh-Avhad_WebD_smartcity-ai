const Issue = require('../models/Issue');

// Priority Score Calculator Helper
const calculatePriority = (category, isUrgent, upvotes) => {
    let score = 0;

    // Base Severity Weighting
    const cat = (category || '').toLowerCase();
    if (cat.includes('electric') || cat.includes('fire') || cat.includes('safety') || cat.includes('wire')) {
        score += 50;
    } else if (cat.includes('water') || cat.includes('sanitation') || cat.includes('garbage')) {
        score += 30;
    } else {
        score += 10;
    }

    // Urgency Multiplier
    if (isUrgent) {
        score += 20;
    }

    // Community Upvote Multiplier
    const upvoteCount = upvotes ? upvotes.length : 0;
    score += upvoteCount * 5;

    return score;
};

// Create a new issue (Report an Issue)
exports.createIssue = async (req, res) => {
    try {
        const { title, category, location, latitude, longitude, description, isUrgent, imageUrl } = req.body;

        // Basic validation
        if (!title || !category || !location || !description) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        const newIssue = new Issue({
            title,
            category,
            location,
            latitude,
            longitude,
            description,
            isUrgent: isUrgent || false,
            imageUrl: imageUrl || '',
            createdBy: req.user.id,
            priorityScore: calculatePriority(category, isUrgent || false, [])
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

// Fetch dashboard statistics (Global overview)
exports.getDashboardStats = async (req, res) => {
    try {
        const total = await Issue.countDocuments();
        const pending = await Issue.countDocuments({ status: 'Pending' });
        const resolved = await Issue.countDocuments({ status: { $in: ['Resolved', 'Rejected'] } });

        const recentIssues = await Issue.find().sort({ createdAt: -1 }).limit(6).populate('feedbacks.user', 'name');
        const mapIssues = await Issue.find().select('title category status isUrgent latitude longitude location');

        res.status(200).json({
            stats: { total, pending, resolved },
            recentIssues,
            mapIssues
        });
    } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Fetch nearby issues based on location text
exports.getNearbyIssues = async (req, res) => {
    try {
        const { location } = req.query;
        if (!location) {
            return res.status(400).json({ error: 'Location parameter is required' });
        }

        // Case-insensitive generic regex search on location field
        const issues = await Issue.find({
            location: { $regex: location, $options: 'i' }
        }).sort({ createdAt: -1 }).populate('feedbacks.user', 'name');

        res.status(200).json(issues);
    } catch (err) {
        console.error('Error fetching nearby issues:', err);
        res.status(500).json({ error: 'Server error while fetching nearby issues' });
    }
};

// Toggle upvote on an issue
exports.toggleUpvote = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);
        if (!issue) {
            return res.status(404).json({ error: 'Issue not found' });
        }

        const userId = req.user.id;

        if (!issue.upvotes) {
            issue.upvotes = [];
        }

        const index = issue.upvotes.indexOf(userId);

        if (index === -1) {
            issue.upvotes.push(userId); // Add upvote
        } else {
            issue.upvotes.splice(index, 1); // Remove upvote
        }

        issue.priorityScore = calculatePriority(issue.category, issue.isUrgent, issue.upvotes);

        await issue.save();
        res.status(200).json(issue);
    } catch (err) {
        console.error('Error toggling upvote:', err);
        res.status(500).json({ error: 'Server error while toggling upvote' });
    }
};

// Add feedback to an issue
exports.addFeedback = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'Feedback text is required' });
        }

        const issue = await Issue.findById(req.params.id);
        if (!issue) {
            return res.status(404).json({ error: 'Issue not found' });
        }

        issue.feedbacks.push({
            text,
            user: req.user.id
        });

        await issue.save();
        await issue.populate('feedbacks.user', 'name');

        res.status(200).json(issue);
    } catch (err) {
        console.error('Error adding feedback:', err);
        res.status(500).json({ error: 'Server error while adding feedback' });
    }
};

// Admin: Fetch all issues
exports.getAllIssuesAdmin = async (req, res) => {
    try {
        const issues = await Issue.find().sort({ priorityScore: -1, createdAt: -1 }).populate('createdBy', 'name email');

        const total = issues.length;
        const pending = issues.filter(i => i.status === 'Pending').length;
        const resolved = issues.filter(i => i.status === 'Resolved' || i.status === 'Rejected').length;

        res.status(200).json({
            issues,
            stats: { total, pending, resolved }
        });
    } catch (err) {
        console.error('Error fetching admin issues:', err);
        res.status(500).json({ error: 'Server error fetching all issues' });
    }
};

// Admin: Update issue status
exports.updateIssueStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['Pending', 'In Progress', 'Resolved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status provided' });
        }

        const issue = await Issue.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('createdBy', 'name email');

        if (!issue) {
            return res.status(404).json({ error: 'Issue not found' });
        }

        res.status(200).json(issue);
    } catch (err) {
        console.error('Error updating issue status:', err);
        res.status(500).json({ error: 'Server error updating issue status' });
    }
};
