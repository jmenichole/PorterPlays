const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { logger, logAdminAction } = require('../utils/logger');
const User = require('../models/User');

// Import bot managers (will be initialized in server.js)
let discordBot = null;
let telegramBot = null;

// Initialize bot managers
const setBotManagers = (discord, telegram) => {
  discordBot = discord;
  telegramBot = telegram;
};

// Get bot status
router.get('/status', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const status = {
      discord: discordBot ? discordBot.getStatus() : { ready: false },
      telegram: telegramBot ? telegramBot.getStatus() : { ready: false }
    };

    res.json({
      success: true,
      status
    });
  } catch (error) {
    logger.error('Error getting bot status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get bot status'
    });
  }
});

// Post Goated code
router.post('/goated-code', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { code, description } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        error: 'Code is required'
      });
    }

    // Post to Discord
    const discordResult = await discordBot.postGoatedCode(code, description, req.user.id);

    // Log the action
    logAdminAction(req.user.id, 'post_goated_code', {
      code,
      description,
      discordResult
    });

    // Update admin's post count
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { 'stats.codesPosted': 1 },
      lastActivity: new Date()
    });

    res.json({
      success: true,
      message: 'Goated code posted successfully',
      discord: discordResult
    });

  } catch (error) {
    logger.error('Error posting Goated code:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to post Goated code'
    });
  }
});

// Post Shuffle code
router.post('/shuffle-code', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { code, description } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        error: 'Code is required'
      });
    }

    // Post to Discord
    const discordResult = await discordBot.postShuffleCode(code, description, req.user.id);

    // Log the action
    logAdminAction(req.user.id, 'post_shuffle_code', {
      code,
      description,
      discordResult
    });

    // Update admin's post count
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { 'stats.codesPosted': 1 },
      lastActivity: new Date()
    });

    res.json({
      success: true,
      message: 'Shuffle code posted successfully',
      discord: discordResult
    });

  } catch (error) {
    logger.error('Error posting Shuffle code:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to post Shuffle code'
    });
  }
});

// Post announcement
router.post('/announcement', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { message, title } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    // Post to Discord
    const discordResult = await discordBot.postAnnouncement(message, title, req.user.id);

    // Broadcast to Telegram
    const telegramResult = await telegramBot.broadcastMessage(message, req.user.id);

    // Log the action
    logAdminAction(req.user.id, 'post_announcement', {
      title,
      message,
      discordResult,
      telegramResult
    });

    // Update admin's post count
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { 'stats.announcementsPosted': 1 },
      lastActivity: new Date()
    });

    res.json({
      success: true,
      message: 'Announcement posted successfully',
      discord: discordResult,
      telegram: telegramResult
    });

  } catch (error) {
    logger.error('Error posting announcement:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to post announcement'
    });
  }
});

// Send welcome message to user
router.post('/welcome-message', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    // Send welcome message via Discord
    const result = await discordBot.sendWelcomeMessage(userId, req.user.id);

    // Log the action
    logAdminAction(req.user.id, 'send_welcome_message', {
      targetUserId: userId,
      result
    });

    res.json({
      success: true,
      message: 'Welcome message sent successfully',
      result
    });

  } catch (error) {
    logger.error('Error sending welcome message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send welcome message'
    });
  }
});

// Get bot statistics
router.get('/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Get admin statistics
    const admin = await User.findById(req.user.id).select('stats');
    if (!admin) {
      return res.status(404).json({
        success: false,
        error: 'Admin not found'
      });
    }

    // Get recent bot actions from logs (simplified)
    const recentActions = [
      // This would be populated from actual log analysis
      // For now, return mock data
    ];

    res.json({
      success: true,
      stats: admin.stats,
      recentActions,
      botStatus: {
        discord: discordBot ? discordBot.getStatus() : { ready: false },
        telegram: telegramBot ? telegramBot.getStatus() : { ready: false }
      }
    });

  } catch (error) {
    logger.error('Error getting bot stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get bot statistics'
    });
  }
});

// Test bot functionality
router.post('/test', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { type } = req.body;

    let result = {};

    switch (type) {
      case 'discord':
        result = await discordBot.postAnnouncement('🧪 Test message from Porter Plays API', 'Test Announcement', req.user.id);
        break;
      case 'telegram':
        result = await telegramBot.broadcastMessage('🧪 Test message from Porter Plays API', req.user.id);
        break;
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid test type. Use "discord" or "telegram"'
        });
    }

    logAdminAction(req.user.id, 'test_bot', { type, result });

    res.json({
      success: true,
      message: `${type} bot test completed`,
      result
    });

  } catch (error) {
    logger.error('Error testing bot:', error);
    res.status(500).json({
      success: false,
      error: 'Bot test failed'
    });
  }
});

module.exports = { router, setBotManagers };