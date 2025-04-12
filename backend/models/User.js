const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'user'
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    educationLevel: {
        type: String,
        enum: ['Elementary School', 'Middle School', 'High School', 'College', 'Graduate School'],
        default: 'High School'
    },
    phone: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    emergencyContact: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date
    },
    permissions: [{
        type: String,
        enum: ['manage_users', 'manage_content', 'view_analytics', 'manage_settings']
    }],
    lastActive: {
        type: Date,
        default: Date.now
    },
    completedLessons: {
        type: Number,
        default: 0
    },
    accessedMaterials: [{
        title: String,
        accessCount: {
            type: Number,
            default: 1
        },
        lastAccessed: {
            type: Date,
            default: Date.now
        }
    }]
});

// Add method to check if user is admin
userSchema.methods.isAdminUser = function() {
    return this.isAdmin || this.role === 'admin' || this.role === 'superadmin';
};

// Add method to check if user is superadmin
userSchema.methods.isSuperAdmin = function() {
    return this.role === 'superadmin';
};

// Add method to check if user can modify another user's role
userSchema.methods.canModifyUserRole = function(targetUser) {
    if (this.isSuperAdmin()) return true;
    if (this.role === 'admin' && targetUser.role !== 'superadmin') return true;
    return false;
};

// Pre-save middleware to handle role changes
userSchema.pre('save', function(next) {
    // Update isAdmin based on role
    this.isAdmin = this.role !== 'user';
    
    // Ensure superadmin has all permissions
    if (this.role === 'superadmin') {
        this.permissions = ['manage_users', 'manage_content', 'view_analytics', 'manage_settings'];
    }
    
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User; 