const express = require('express');
const passport = require('passport');
const { logger, logUserAction } = require('../utils/logger');

const router = express.Router();

// @desc    Authenticate with Discord
// @route   GET /api/auth/discord
// @access  Public
router.get('/discord', passport.authenticate('discord'));

// @desc    Discord OAuth callback
// @route   GET /api/auth/discord/callback
// @access  Public
router.get('/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/login' }),
  (req, res) => {
    try {
      logUserAction(req.user._id, 'discord_login', {
        username: req.user.username,
        isAdmin: req.user.isAdmin
      });

      logger.info(`User ${req.user.username} logged in via Discord`);

      // Redirect to frontend with success
      const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/success`;
      res.redirect(redirectUrl);
    } catch (error) {
      logger.error('Discord callback error:', error);
      res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/error`);
    }
  }
);

// @desc    Get current user
// @route   GET /api/auth/user
// @access  Private
router.get('/user', (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated'
      });
    }

    // Return user data (exclude sensitive fields)
    const userData = {
      _id: req.user._id,
      discordId: req.user.discordId,
      username: req.user.username,
      discriminator: req.user.discriminator,
      avatar: req.user.avatar,
      isAdmin: req.user.isAdmin,
      onboardingProgress: req.user.onboardingProgress,
      preferences: req.user.preferences,
      stats: req.user.stats,
      fullUsername: req.user.fullUsername,
      completionPercentage: req.user.completionPercentage,
      referralCode: req.user.referralCode
    };

    res.json({
      success: true,
      data: userData
    });
  } catch (error) {
    logger.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @desc    Logout user
// @route   GET /api/auth/logout
// @access  Private
router.get('/logout', (req, res) => {
  try {
    if (req.user) {
      logUserAction(req.user._id, 'logout');
      logger.info(`User ${req.user.username} logged out`);
    }

    req.logout((err) => {
      if (err) {
        logger.error('Logout error:', err);
        return res.status(500).json({
          success: false,
          error: 'Logout failed'
        });
      }

      req.session.destroy((err) => {
        if (err) {
          logger.error('Session destroy error:', err);
          return res.status(500).json({
            success: false,
            error: 'Session cleanup failed'
          });
        }

        res.clearCookie('connect.sid');
        res.json({
          success: true,
          message: 'Logged out successfully'
        });
      });
    });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @desc    Check authentication status
// @route   GET /api/auth/status
// @access  Public
router.get('/status', (req, res) => {
  res.json({
    success: true,
    authenticated: !!req.user,
    user: req.user ? {
      _id: req.user._id,
      username: req.user.username,
      isAdmin: req.user.isAdmin
    } : null
  });
});

// @desc    Refresh user data
// @route   POST /api/auth/refresh
// @access  Private
router.post('/refresh', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Not authenticated'
      });
    }

    // Re-fetch user from database to get latest data
    const User = require('../models/User');
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Update session
    req.user = user;

    res.json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
        onboardingProgress: user.onboardingProgress,
        stats: user.stats
      }
    });
  } catch (error) {
    logger.error('Refresh user error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

module.exports = router;