const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Discord OAuth data
  discordId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  discriminator: {
    type: String,
    default: '0000'
  },
  avatar: {
    type: String,
    default: null
  },
  accessToken: {
    type: String,
    select: false // Don't include in queries by default
  },
  refreshToken: {
    type: String,
    select: false
  },

  // User permissions
  isAdmin: {
    type: Boolean,
    default: false
  },

  // Discord guilds/servers
  guilds: [{
    id: String,
    name: String,
    icon: String,
    owner: Boolean,
    permissions: String,
    features: [String]
  }],

  // Onboarding progress
  onboardingProgress: {
    step: {
      type: Number,
      default: 0,
      min: 0,
      max: 8
    },
    completedSteps: [{
      step: Number,
      completedAt: {
        type: Date,
        default: Date.now
      },
      casino: String,
      action: String
    }],
    startedAt: {
      type: Date,
      default: Date.now
    },
    completedAt: Date,
    isCompleted: {
      type: Boolean,
      default: false
    }
  },

  // User preferences
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'dark'
    },
    notifications: {
      discord: { type: Boolean, default: true },
      email: { type: Boolean, default: false },
      telegram: { type: Boolean, default: true }
    },
    language: {
      type: String,
      default: 'en'
    }
  },

  // Activity tracking
  lastLogin: {
    type: Date,
    default: Date.now
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },

  // Referral system
  referralCode: {
    type: String,
    unique: true,
    sparse: true
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  referrals: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    casino: String
  }],

  // Casino accounts linked
  casinoAccounts: {
    thrill: {
      username: String,
      linkedAt: Date,
      referralUsed: String,
      vipStatus: String
    },
    goated: {
      username: String,
      linkedAt: Date,
      referralUsed: String,
      vipStatus: String
    },
    shuffle: {
      username: String,
      linkedAt: Date,
      referralUsed: String,
      vipStatus: String
    }
  },

  // Statistics
  stats: {
    totalReferrals: { type: Number, default: 0 },
    totalWagered: { type: Number, default: 0 },
    totalWins: { type: Number, default: 0 },
    totalLosses: { type: Number, default: 0 },
    favoriteCasino: String,
    joinDate: { type: Date, default: Date.now }
  }

}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
userSchema.index({ 'onboardingProgress.isCompleted': 1 });
userSchema.index({ 'stats.totalReferrals': -1 });
userSchema.index({ lastLogin: -1 });
userSchema.index({ createdAt: -1 });

// Virtual for full Discord username
userSchema.virtual('fullUsername').get(function() {
  return `${this.username}#${this.discriminator}`;
});

// Virtual for completion percentage
userSchema.virtual('completionPercentage').get(function() {
  return Math.round((this.onboardingProgress.step / 8) * 100);
});

// Instance method to update activity
userSchema.methods.updateActivity = function() {
  this.lastActivity = new Date();
  return this.save();
};

// Instance method to complete onboarding step
userSchema.methods.completeStep = function(stepNumber, casino, action) {
  // Add to completed steps if not already there
  const existingStep = this.onboardingProgress.completedSteps.find(
    step => step.step === stepNumber
  );

  if (!existingStep) {
    this.onboardingProgress.completedSteps.push({
      step: stepNumber,
      casino,
      action
    });
  }

  // Update current step
  this.onboardingProgress.step = Math.max(this.onboardingProgress.step, stepNumber + 1);

  // Check if onboarding is complete
  if (this.onboardingProgress.step >= 8) {
    this.onboardingProgress.isCompleted = true;
    this.onboardingProgress.completedAt = new Date();
  }

  return this.save();
};

// Static method to find admin users
userSchema.statics.findAdmins = function() {
  return this.find({ isAdmin: true });
};

// Pre-save middleware to generate referral code
userSchema.pre('save', async function(next) {
  if (this.isNew && !this.referralCode) {
    // Generate unique referral code
    let code;
    let exists;
    do {
      code = `${this.username}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      exists = await this.constructor.findOne({ referralCode: code });
    } while (exists);

    this.referralCode = code;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);