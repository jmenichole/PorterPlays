const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

// Import configurations and utilities
const { connectDB } = require('./config/database');
const { configurePassport } = require('./config/passport');
const { logger } = require('./utils/logger');
const { errorHandler } = require('./middleware/errorHandler');

// Import bot managers
const DiscordBotManager = require('./utils/DiscordBotManager');
const TelegramBotManager = require('./utils/TelegramBotManager');

// Import routes
const authRoutes = require('./routes/auth');
const { router: botRoutes, setBotManagers } = require('./routes/bots');
const adminRoutes = require('./routes/admin');
const analyticsRoutes = require('./routes/analytics');
const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy for rate limiting behind reverse proxy
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://discord.com", "https://api.github.com"]
    }
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport strategies
configurePassport();

// Initialize bot managers
const discordBot = new DiscordBotManager({
  DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
  DISCORD_SERVER_ID: process.env.DISCORD_SERVER_ID,
  DISCORD_GOATED_CODES_CHANNEL: process.env.DISCORD_GOATED_CODES_CHANNEL,
  DISCORD_SHUFFLE_CODES_CHANNEL: process.env.DISCORD_SHUFFLE_CODES_CHANNEL,
  DISCORD_ANNOUNCEMENTS_CHANNEL: process.env.DISCORD_ANNOUNCEMENTS_CHANNEL,
  DISCORD_SUPPORT_CHANNEL: process.env.DISCORD_SUPPORT_CHANNEL,
  DISCORD_VERIFY_CHANNEL: process.env.DISCORD_VERIFY_CHANNEL,
  DISCORD_LOUNGE_CHANNEL: process.env.DISCORD_LOUNGE_CHANNEL
});

const telegramBot = new TelegramBotManager({
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  FRONTEND_URL: process.env.FRONTEND_URL,
  DISCORD_INVITE_URL: process.env.DISCORD_INVITE_URL
});

// Set bot managers for routes
setBotManagers(discordBot, telegramBot);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/bots', botRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/feedback', feedbackRoutes);

// Webhook endpoints (no auth required)
app.use('/api/webhooks', require('./routes/webhooks'));

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found on this server.'
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Connect to database and start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Initialize bot managers
    try {
      await discordBot.initialize();
    } catch (error) {
      logger.error('Failed to initialize Discord bot:', error);
    }

    try {
      await telegramBot.initialize();
    } catch (error) {
      logger.error('Failed to initialize Telegram bot:', error);
    }

    // Start the server
    console.log('About to start server...');
    const server = app.listen(PORT, () => {
      console.log('Server started successfully on port', PORT);
      logger.info(`🚀 Porter Plays Backend Server running on port ${PORT}`);
      logger.info(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
      logger.info(`🤖 Discord Bot: ${discordBot.isReady ? 'Connected' : 'Mock Mode'}`);
      logger.info(`📱 Telegram Bot: ${telegramBot.isReady ? 'Connected' : 'Mock Mode'}`);
    });
    console.log('Server listen called');

    // Store server reference for graceful shutdown
    global.server = server;
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  logger.error('Unhandled Rejection:', err.message);
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  console.error(err.stack);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');

  try {
    // Close bot connections
    await discordBot.disconnect();
    await telegramBot.stop();

    // Close server
    if (global.server) {
      global.server.close(() => {
        logger.info('Process terminated');
      });
    }
  } catch (error) {
    logger.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
});

startServer();

module.exports = app;