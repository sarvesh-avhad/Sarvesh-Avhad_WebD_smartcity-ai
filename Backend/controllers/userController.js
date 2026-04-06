const User = require('../models/User');

// @route   GET /api/users/profile
// @desc    Get logged in user profile
// @access  Private
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error fetching profile:', err.message);
        res.status(500).send('Server Error');
    }
};

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
exports.updateProfile = async (req, res) => {
    const { name, email, mobile, address } = req.body;

    // Optional: Validate email if changing (check if already taken)

    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.mobile = mobile || user.mobile;
        user.address = address || user.address;

        await user.save();
        res.json({
            message: 'Profile updated successfully', user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                address: user.address
            }
        });
    } catch (err) {
        console.error('Error updating profile:', err.message);
        res.status(500).send('Server Error');
    }
};
