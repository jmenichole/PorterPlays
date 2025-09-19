const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { logger } = require('../utils/logger');
const User = require('../models/User');

// Get dashboard analytics
router.get('/dashboard', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Get user statistics
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({
      lastActivity: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
    });
    const newUsers = await User.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Last 7 days
    });

    // Get admin statistics
    const adminStats = await User.aggregate([
      { $match: { role: 'admin' } },
      {
        $group: {
          _id: null,
          totalCodesPosted: { $sum: '$stats.codesPosted' },
          totalAnnouncements: { $sum: '$stats.announcementsPosted' },
          totalLogins: { $sum: '$stats.loginCount' }
        }
      }
    ]);

    // Get user growth over time (last 30 days)
    const userGrowth = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    // Get top referrers
    const topReferrers = await User.aggregate([
      { $match: { 'stats.referralCount': { $gt: 0 } } },
      {
        $project: {
          username: 1,
          discordUsername: 1,
          referralCount: '$stats.referralCount',
          totalEarned: '$stats.totalEarned'
        }
      },
      { $sort: { referralCount: -1 } },
      { $limit: 10 }
    ]);

    // Get activity by hour (simplified)
    const hourlyActivity = await User.aggregate([
      {
        $match: {
          lastActivity: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: { $hour: '$lastActivity' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.json({
      success: true,
      analytics: {
        users: {
          total: totalUsers,
          active: activeUsers,
          new: newUsers
        },
        admins: adminStats[0] || {
          totalCodesPosted: 0,
          totalAnnouncements: 0,
          totalLogins: 0
        },
        growth: userGrowth,
        topReferrers,
        hourlyActivity
      }
    });

  } catch (error) {
    logger.error('Error getting dashboard analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get dashboard analytics'
    });
  }
});

// Get user analytics
router.get('/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 50, sort = 'lastActivity', order = 'desc' } = req.query;

    const sortOptions = {};
    sortOptions[sort] = order === 'desc' ? -1 : 1;

    const users = await User.find()
      .select('username discordUsername discordId stats createdAt lastActivity role')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await User.countDocuments();

    // Get user distribution by join date
    const userDistribution = await User.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.json({
      success: true,
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      distribution: userDistribution
    });

  } catch (error) {
    logger.error('Error getting user analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get user analytics'
    });
  }
});

// Get code usage analytics
router.get('/codes', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // This would track actual code usage if we had that data
    // For now, return mock analytics based on admin posts

    const codeStats = await User.aggregate([
      { $match: { role: 'admin' } },
      {
        $group: {
          _id: null,
          totalCodesPosted: { $sum: '$stats.codesPosted' },
          totalAnnouncements: { $sum: '$stats.announcementsPosted' }
        }
      }
    ]);

    // Mock code usage data (would be tracked separately)
    const mockUsageData = {
      goatedCodes: {
        totalPosted: codeStats[0]?.totalCodesPosted || 0,
        estimatedUsage: Math.floor((codeStats[0]?.totalCodesPosted || 0) * 0.7), // Estimate 70% usage
        avgWinRate: 0.85
      },
      shuffleCodes: {
        totalPosted: codeStats[0]?.totalCodesPosted || 0,
        estimatedUsage: Math.floor((codeStats[0]?.totalCodesPosted || 0) * 0.8), // Estimate 80% usage
        avgMultiplier: 2.3
      }
    };

    res.json({
      success: true,
      codeAnalytics: mockUsageData
    });

  } catch (error) {
    logger.error('Error getting code analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get code analytics'
    });
  }
});

// Get referral analytics
router.get('/referrals', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const referralStats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalReferrals: { $sum: '$stats.referralCount' },
          totalEarned: { $sum: '$stats.totalEarned' },
          avgReferralsPerUser: { $avg: '$stats.referralCount' }
        }
      }
    ]);

    // Get referral chain depth
    const referralChains = await User.aggregate([
      { $match: { 'stats.referralCount': { $gt: 0 } } },
      {
        $project: {
          username: 1,
          referralCount: '$stats.referralCount',
          totalEarned: '$stats.totalEarned'
        }
      },
      { $sort: { referralCount: -1 } },
      { $limit: 20 }
    ]);

    res.json({
      success: true,
      referralAnalytics: {
        summary: referralStats[0] || {
          totalReferrals: 0,
          totalEarned: 0,
          avgReferralsPerUser: 0
        },
        topReferrers: referralChains
      }
    });

  } catch (error) {
    logger.error('Error getting referral analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get referral analytics'
    });
  }
});

// Track user action (for analytics)
router.post('/track', authenticateToken, async (req, res) => {
  try {
    const { action, data } = req.body;

    if (!action) {
      return res.status(400).json({
        success: false,
        error: 'Action is required'
      });
    }

    // Update user's last activity
    await User.findByIdAndUpdate(req.user.id, {
      lastActivity: new Date(),
      $inc: { 'stats.actionsPerformed': 1 }
    });

    // Log the action for analytics
    logger.info(`User action tracked: ${action}`, {
      userId: req.user.id,
      action,
      data
    });

    res.json({
      success: true,
      message: 'Action tracked successfully'
    });

  } catch (error) {
    logger.error('Error tracking user action:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to track action'
    });
  }
});

// Export analytics data
router.get('/export', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { type } = req.query;

    let data = {};

    switch (type) {
      case 'users':
        data = await User.find()
          .select('username discordUsername stats createdAt lastActivity')
          .lean();
        break;
      case 'dashboard':
        // Return same data as dashboard endpoint
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({
          lastActivity: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        });
        data = { totalUsers, activeUsers };
        break;
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid export type'
        });
    }

    res.json({
      success: true,
      export: {
        type,
        timestamp: new Date(),
        data
      }
    });

  } catch (error) {
    logger.error('Error exporting analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to export analytics'
    });
  }
});

module.exports = router;