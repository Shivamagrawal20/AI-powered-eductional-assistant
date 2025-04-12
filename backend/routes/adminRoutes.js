const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Get all users (admin only)
router.get('/users', auth, adminAuth, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user role (admin only)
router.patch('/users/:id/role', auth, adminAuth, async (req, res) => {
    try {
        const { role } = req.body;
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        if (!['user', 'admin', 'superadmin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role specified' });
        }

        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent modifying superadmin role
        if (user.role === 'superadmin' && req.user.role !== 'superadmin') {
            return res.status(403).json({ message: 'Cannot modify superadmin role' });
        }

        user.role = role;
        user.isAdmin = role !== 'user';
        await user.save();

        res.json({ 
            message: 'User role updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isAdmin: user.isAdmin
            }
        });
    } catch (err) {
        console.error('Update role error:', err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete user (admin only)
router.delete('/users/:userId', auth, adminAuth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get admin dashboard stats
router.get('/stats', auth, adminAuth, async (req, res) => {
    try {
        const stats = {
            totalUsers: await User.countDocuments(),
            newUsersToday: await User.countDocuments({
                createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }
            }),
            adminUsers: await User.countDocuments({ isAdmin: true }),
            recentUsers: await User.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select('-password')
        };
        res.json(stats);
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get analytics data (admin only)
router.get('/analytics', auth, adminAuth, async (req, res) => {
    try {
        // Get total users
        const totalUsers = await User.countDocuments();

        // Get active users (users who have been active in the last 7 days)
        const activeUsers = await User.countDocuments({
            lastActive: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        });

        // Get user activity data for the last 7 days
        const userActivity = await User.aggregate([
            {
                $match: {
                    lastActive: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$lastActive" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // Get learning progress data
        const learningProgress = await User.aggregate([
            {
                $group: {
                    _id: null,
                    totalCompletedLessons: { $sum: { $ifNull: ["$completedLessons", 0] } },
                    totalActiveUsers: { $sum: { $cond: [{ $gt: [{ $ifNull: ["$completedLessons", 0] }, 0] }, 1, 0] } }
                }
            }
        ]);

        // Calculate average completion rate
        const averageCompletionRate = learningProgress[0]?.totalActiveUsers
            ? (learningProgress[0].totalCompletedLessons / (learningProgress[0].totalActiveUsers * 10)) * 100
            : 0;

        // Get content usage data
        const contentUsage = await User.aggregate([
            {
                $unwind: { path: "$accessedMaterials", preserveNullAndEmptyArrays: true }
            },
            {
                $group: {
                    _id: "$accessedMaterials.title",
                    accessCount: { $sum: { $ifNull: ["$accessedMaterials.accessCount", 0] } }
                }
            },
            {
                $sort: { accessCount: -1 }
            },
            {
                $limit: 5
            }
        ]);

        // Format the response
        const response = {
            totalUsers: totalUsers || 0,
            activeUsers: activeUsers || 0,
            userActivity: userActivity || [],
            learningProgress: {
                averageCompletionRate: Math.round(averageCompletionRate) || 0,
                totalCompletedLessons: learningProgress[0]?.totalCompletedLessons || 0,
                totalActiveUsers: learningProgress[0]?.totalActiveUsers || 0
            },
            contentUsage: {
                totalMaterialsAccessed: contentUsage.reduce((sum, item) => sum + (item.accessCount || 0), 0),
                mostAccessedMaterials: contentUsage.map(item => ({
                    title: item._id || 'Unknown',
                    accessCount: item.accessCount || 0
                }))
            }
        };

        res.json(response);
    } catch (error) {
        console.error('Get analytics error:', error);
        res.status(500).json({ 
            message: 'Failed to load analytics data',
            error: error.message 
        });
    }
});

// Update system settings (admin only)
router.put('/settings', auth, adminAuth, async (req, res) => {
    try {
        const { sessionTimeout, passwordPolicy, emailNotifications, systemAlerts } = req.body;
        
        // Update settings in the database
        // This is a placeholder - you'll need to implement your settings storage
        const settings = {
            sessionTimeout,
            passwordPolicy,
            emailNotifications,
            systemAlerts,
            updatedAt: new Date()
        };

        res.json({ message: 'Settings updated successfully', settings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 