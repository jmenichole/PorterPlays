const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const User = require('../models/User');
const { logger } = require('../utils/logger');

const configurePassport = () => {
  // Serialize user for session
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      logger.error('Passport deserialize error:', error);
      done(error, null);
    }
  });

  // Only configure Discord strategy if valid credentials are provided
  if (process.env.DISCORD_CLIENT_ID && 
      process.env.DISCORD_CLIENT_ID !== 'your_discord_client_id' &&
      process.env.DISCORD_CLIENT_SECRET && 
      process.env.DISCORD_CLIENT_SECRET !== 'your_discord_client_secret') {
    
    // Discord OAuth Strategy
    passport.use(new DiscordStrategy({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/api/auth/discord/callback`,
      scope: ['identify', 'guilds', 'guilds.members.read']
    },
    async (accessToken, refreshToken, profile, done) => {
    try {
      logger.info(`Discord OAuth: Processing user ${profile.username}#${profile.discriminator}`);

      // Check if user exists
      let user = await User.findOne({ discordId: profile.id });

      if (user) {
        // Update user information
        user.username = profile.username;
        user.discriminator = profile.discriminator;
        user.avatar = profile.avatar;
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        user.lastLogin = new Date();

        // Check admin status
        const adminIds = (process.env.ADMIN_USER_IDS || '').split(',').map(id => id.trim());
        user.isAdmin = adminIds.includes(profile.id);

        await user.save();
        logger.info(`Discord OAuth: Updated existing user ${user.username}`);
      } else {
        // Create new user
        user = new User({
          discordId: profile.id,
          username: profile.username,
          discriminator: profile.discriminator,
          avatar: profile.avatar,
          accessToken: accessToken,
          refreshToken: refreshToken,
          guilds: profile.guilds || [],
          isAdmin: (process.env.ADMIN_USER_IDS || '').split(',').includes(profile.id),
          onboardingProgress: {
            step: 0,
            completedSteps: [],
            startedAt: new Date()
          }
        });

        await user.save();
        logger.info(`Discord OAuth: Created new user ${user.username}`);
      }

      return done(null, user);
    } catch (error) {
      logger.error('Discord OAuth error:', error);
      return done(error, null);
    }
  }));
  } else {
    logger.warn('Discord OAuth not configured - authentication will not work');
  }
};

module.exports = {
  configurePassport
};