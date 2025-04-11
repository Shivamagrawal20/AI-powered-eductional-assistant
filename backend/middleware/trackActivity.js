const User = require('../models/User');

const trackActivity = async (req, res, next) => {
    try {
        // Skip tracking for non-authenticated routes
        if (!req.user) {
            return next();
        }

        // Update lastActive timestamp
        await User.findByIdAndUpdate(req.user.id, {
            lastActive: new Date()
        });

        next();
    } catch (error) {
        console.error('Activity tracking error:', error);
        next();
    }
};

module.exports = trackActivity; 