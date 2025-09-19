const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { logger, logAdminAction } = require('../utils/logger');
const User = require('../models/User');

// Create feedback model inline (could be moved to separate file)
const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['bug', 'feature', 'general', 'support'],
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    default: 'open'
  },
  adminResponse: {
    type: String,
    maxlength: 2000
  },
  respondedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  respondedAt: Date,
  attachments: [{
    filename: String,
    url: String,
    type: String
  }]
}, {
  timestamps: true
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Submit feedback
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { type, title, description, priority } = req.body;

    if (!type || !title || !description) {
      return res.status(400).json({
        success: false,
        error: 'Type, title, and description are required'
      });
    }

    const feedback = new Feedback({
      userId: req.user.id,
      type,
      title,
      description,
      priority: priority || 'medium'
    });

    await feedback.save();

    // Update user's feedback count
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { 'stats.feedbackSubmitted': 1 },
      lastActivity: new Date()
    });

    logger.info(`Feedback submitted by user ${req.user.id}: ${title}`);

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      feedback: {
        id: feedback._id,
        type: feedback.type,
        title: feedback.title,
        status: feedback.status,
        createdAt: feedback.createdAt
      }
    });

  } catch (error) {
    logger.error('Error submitting feedback:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit feedback'
    });
  }
});

// Get user's feedback
router.get('/my', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query = { userId: req.user.id };
    if (status) {
      query.status = status;
    }

    const feedback = await Feedback.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('type title description priority status adminResponse respondedAt createdAt')
      .lean();

    const total = await Feedback.countDocuments(query);

    res.json({
      success: true,
      feedback,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    logger.error('Error getting user feedback:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get feedback'
    });
  }
});

// Get all feedback (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, type, priority } = req.query;

    const query = {};
    if (status) query.status = status;
    if (type) query.type = type;
    if (priority) query.priority = priority;

    const feedback = await Feedback.find(query)
      .populate('userId', 'username discordUsername')
      .populate('respondedBy', 'username')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Feedback.countDocuments(query);

    // Get feedback statistics
    const stats = await Feedback.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const typeStats = await Feedback.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      feedback,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      stats: {
        byStatus: stats,
        byType: typeStats
      }
    });

  } catch (error) {
    logger.error('Error getting all feedback:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get feedback'
    });
  }
});

// Respond to feedback (admin only)
router.post('/:id/respond', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { response, status } = req.body;

    if (!response) {
      return res.status(400).json({
        success: false,
        error: 'Response is required'
      });
    }

    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Feedback not found'
      });
    }

    feedback.adminResponse = response;
    feedback.respondedBy = req.user.id;
    feedback.respondedAt = new Date();
    if (status) {
      feedback.status = status;
    }

    await feedback.save();

    // Log admin action
    logAdminAction(req.user.id, 'respond_feedback', {
      feedbackId: id,
      response,
      status
    });

    // Update admin's response count
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { 'stats.feedbackResponded': 1 },
      lastActivity: new Date()
    });

    res.json({
      success: true,
      message: 'Response submitted successfully',
      feedback: {
        id: feedback._id,
        status: feedback.status,
        adminResponse: feedback.adminResponse,
        respondedAt: feedback.respondedAt
      }
    });

  } catch (error) {
    logger.error('Error responding to feedback:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to respond to feedback'
    });
  }
});

// Update feedback status (admin only)
router.patch('/:id/status', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['open', 'in-progress', 'resolved', 'closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Valid status is required'
      });
    }

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).select('status updatedAt');

    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Feedback not found'
      });
    }

    // Log admin action
    logAdminAction(req.user.id, 'update_feedback_status', {
      feedbackId: id,
      status
    });

    res.json({
      success: true,
      message: 'Feedback status updated successfully',
      feedback: {
        id: feedback._id,
        status: feedback.status,
        updatedAt: feedback.updatedAt
      }
    });

  } catch (error) {
    logger.error('Error updating feedback status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update feedback status'
    });
  }
});

// Delete feedback (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await Feedback.findByIdAndDelete(id);
    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Feedback not found'
      });
    }

    // Log admin action
    logAdminAction(req.user.id, 'delete_feedback', {
      feedbackId: id,
      title: feedback.title
    });

    res.json({
      success: true,
      message: 'Feedback deleted successfully'
    });

  } catch (error) {
    logger.error('Error deleting feedback:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete feedback'
    });
  }
});

// Get feedback statistics (admin only)
router.get('/stats/summary', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const totalFeedback = await Feedback.countDocuments();
    const openFeedback = await Feedback.countDocuments({ status: 'open' });
    const resolvedFeedback = await Feedback.countDocuments({ status: 'resolved' });

    const avgResponseTime = await Feedback.aggregate([
      { $match: { respondedAt: { $exists: true } } },
      {
        $project: {
          responseTime: {
            $divide: [
              { $subtract: ['$respondedAt', '$createdAt'] },
              1000 * 60 * 60 // Convert to hours
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          avgResponseTime: { $avg: '$responseTime' }
        }
      }
    ]);

    const feedbackByType = await Feedback.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      stats: {
        total: totalFeedback,
        open: openFeedback,
        resolved: resolvedFeedback,
        avgResponseTime: avgResponseTime[0]?.avgResponseTime || 0,
        byType: feedbackByType
      }
    });

  } catch (error) {
    logger.error('Error getting feedback stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get feedback statistics'
    });
  }
});

module.exports = router;