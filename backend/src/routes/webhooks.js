const express = require('express');
const router = express.Router();
const { logger } = require('../utils/logger');

// Discord webhook verification
const verifyDiscordRequest = (req, res, next) => {
  const signature = req.get('X-Signature-Ed25519');
  const timestamp = req.get('X-Signature-Timestamp');
  const body = JSON.stringify(req.body);

  if (!signature || !timestamp) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // In production, you would verify the signature using Discord's public key
  // For now, we'll skip verification in development
  if (process.env.NODE_ENV === 'production') {
    // TODO: Implement Discord signature verification
    // const isValid = verifyKey(body, signature, timestamp, process.env.DISCORD_PUBLIC_KEY);
    // if (!isValid) {
    //   return res.status(401).json({ error: 'Invalid signature' });
    // }
  }

  next();
};

// Telegram webhook verification
const verifyTelegramRequest = (req, res, next) => {
  const secretToken = req.get('X-Telegram-Bot-Api-Secret-Token');

  if (process.env.NODE_ENV === 'production' && secretToken !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

// Discord interaction webhook
router.post('/discord', verifyDiscordRequest, async (req, res) => {
  try {
    const { type, data } = req.body;

    // Discord ping (type 1)
    if (type === 1) {
      return res.json({ type: 1 });
    }

    // Handle Discord interactions (slash commands, buttons, etc.)
    if (type === 2) {
      const { name, options } = data;

      logger.info(`Discord interaction: ${name}`, { options });

      // Handle different commands
      switch (name) {
        case 'ping':
          return res.json({
            type: 4,
            data: {
              content: '🏓 Pong! Bot is online.'
            }
          });

        case 'codes':
          return res.json({
            type: 4,
            data: {
              content: '🎰 Check out the latest bonus codes at https://porterplays.com',
              embeds: [{
                title: '🎐 Goated Codes & 🎰 Shuffle Bonuses',
                description: 'Visit our website for the latest premium codes and daily bonuses!',
                color: 0x5CFFC1,
                url: process.env.FRONTEND_URL || 'https://porterplays.com'
              }]
            }
          });

        default:
          return res.json({
            type: 4,
            data: {
              content: 'Unknown command. Try `/codes` or visit our website!'
            }
          });
      }
    }

    res.json({ type: 4, data: { content: 'Interaction received' } });

  } catch (error) {
    logger.error('Discord webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Telegram webhook
router.post('/telegram', verifyTelegramRequest, async (req, res) => {
  try {
    const update = req.body;

    logger.info('Telegram webhook received:', { updateType: Object.keys(update)[0] });

    // Handle different update types
    if (update.message) {
      const message = update.message;
      const chatId = message.chat.id;
      const text = message.text;
      const user = message.from;

      logger.info(`Telegram message from ${user.username || user.first_name}: ${text}`);

      // Basic auto-responses
      if (text && text.toLowerCase().includes('code')) {
        // This would be handled by the TelegramBotManager
        // For webhooks, we acknowledge receipt
        logger.info('Code request detected in Telegram webhook');
      }

      if (text && text.toLowerCase().includes('help')) {
        logger.info('Help request detected in Telegram webhook');
      }
    }

    // Acknowledge the webhook
    res.json({ ok: true });

  } catch (error) {
    logger.error('Telegram webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GitHub webhook (for deployment notifications)
router.post('/github', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.get('X-Hub-Signature-256');
    const event = req.get('X-GitHub-Event');
    const body = req.body;

    // Verify GitHub signature in production
    if (process.env.NODE_ENV === 'production') {
      // TODO: Implement GitHub signature verification
    }

    logger.info(`GitHub webhook: ${event}`);

    if (event === 'push' && body.ref === 'refs/heads/main') {
      logger.info('Main branch push detected - potential deployment trigger');
      // Could trigger deployment or notification here
    }

    if (event === 'pull_request' && body.action === 'opened') {
      logger.info(`New PR opened: ${body.pull_request.title}`);
      // Could notify team about new PRs
    }

    res.json({ ok: true });

  } catch (error) {
    logger.error('GitHub webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check for webhooks
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    webhook: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Discord OAuth callback (handled by auth routes, but webhook endpoint for reference)
router.get('/discord/callback', (req, res) => {
  res.redirect(process.env.FRONTEND_URL || 'http://localhost:3000');
});

module.exports = router;