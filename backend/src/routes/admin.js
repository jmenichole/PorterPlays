const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { logger, logAdminAction } = require('../utils/logger');
const User = require('../models/User');

// Get admin dashboard data
router.get('/dashboard', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Get basic stats
    const totalUsers = await User.countDocuments();
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('username discordUsername createdAt');

    // Get admin's own stats
    const adminStats = req.user.stats || {};

    res.json({
      success: true,
      dashboard: {
        stats: {
          totalUsers,
          adminUsers,
          recentUsers,
          adminStats
        },
        admin: {
          id: req.user._id,
          username: req.user.username,
          discordUsername: req.user.discordUsername,
          role: req.user.role,
          lastActivity: req.user.lastActivity
        }
      }
    });

  } catch (error) {
    logger.error('Error getting admin dashboard:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get dashboard data'
    });
  }
});

// Get all users (admin only)
router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, search, role } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { username: new RegExp(search, 'i') },
        { discordUsername: new RegExp(search, 'i') }
      ];
    }
    if (role) {
      query.role = role;
    }

    const users = await User.find(query)
      .select('username discordUsername discordId role stats createdAt lastActivity')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    logger.error('Error getting users:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get users'
    });
  }
});

// Update user role (admin only)
router.patch('/users/:userId/role', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!['user', 'admin', 'moderator'].includes(role)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid role. Must be user, admin, or moderator'
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select('username discordUsername role');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Log admin action
    logAdminAction(req.user.id, 'update_user_role', {
      targetUserId: userId,
      oldRole: user.role,
      newRole: role
    });

    res.json({
      success: true,
      message: 'User role updated successfully',
      user
    });

  } catch (error) {
    logger.error('Error updating user role:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update user role'
    });
  }
});

// Delete user (admin only)
router.delete('/users/:userId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;

    // Prevent admin from deleting themselves
    if (userId === req.user.id) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete your own account'
      });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Log admin action
    logAdminAction(req.user.id, 'delete_user', {
      deletedUserId: userId,
      username: user.username
    });

    res.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    logger.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete user'
    });
  }
});

// Get system logs (admin only)
router.get('/logs', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { level = 'info', limit = 50 } = req.query;

    // This would integrate with the logging system
    // For now, return mock data
    const mockLogs = [
      {
        timestamp: new Date(),
        level: 'info',
        message: 'Server started successfully',
        source: 'server.js'
      },
      {
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        level: 'warn',
        message: 'Rate limit exceeded for IP 192.168.1.1',
        source: 'middleware'
      }
    ];

    res.json({
      success: true,
      logs: mockLogs.slice(0, limit)
    });

  } catch (error) {
    logger.error('Error getting logs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get logs'
    });
  }
});

// System health check (admin only)
router.get('/health', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Check database connection
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

    // Check system resources
    const memUsage = process.memoryUsage();
    const uptime = process.uptime();

    res.json({
      success: true,
      health: {
        database: dbStatus,
        uptime: Math.floor(uptime),
        memory: {
          rss: Math.round(memUsage.rss / 1024 / 1024) + 'MB',
          heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + 'MB',
          heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + 'MB'
        },
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    logger.error('Error getting health status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get health status'
    });
  }
});

module.exports = router;