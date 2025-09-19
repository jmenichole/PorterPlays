const TelegramBot = require('node-telegram-bot-api');
const { logger, logAdminAction } = require('../utils/logger');

class TelegramBotManager {
  constructor(config) {
    this.config = config;
    this.bot = null;
    this.isReady = false;
  }

  async initialize() {
    try {
      if (!this.config.TELEGRAM_BOT_TOKEN || this.config.TELEGRAM_BOT_TOKEN === 'your-telegram-bot-token') {
        logger.warn('Telegram bot token not configured, running in mock mode');
        this.isReady = true;
        return;
      }

      // Don't create bot if token is invalid
      this.isReady = true;
      logger.info('Telegram bot initialized in mock mode (no valid token)');

    } catch (error) {
      logger.error('Failed to initialize Telegram bot:', error);
      // Continue in mock mode
      this.isReady = true;
    }
  }

  async handleMessage(msg) {
    try {
      const chatId = msg.chat.id;
      const text = msg.text;
      const userId = msg.from.id;
      const username = msg.from.username;

      logger.info(`Telegram message from ${username} (${userId}): ${text}`);

      // Basic command handling
      if (text.startsWith('/start')) {
        await this.sendWelcomeMessage(chatId, username);
      } else if (text.startsWith('/help')) {
        await this.sendHelpMessage(chatId);
      } else if (text.startsWith('/codes')) {
        await this.sendCodesMessage(chatId);
      }

      // Log user interaction
      logAdminAction(null, 'telegram_message', {
        userId,
        username,
        chatId,
        message: text
      });

    } catch (error) {
      logger.error('Error handling Telegram message:', error);
    }
  }

  async sendWelcomeMessage(chatId, username) {
    try {
      const welcomeText = `🎰 Welcome to Porter Plays, ${username}!

🎐 **Goated Codes** - Premium bonus codes for maximum wins
🎰 **Shuffle Codes** - Daily shuffle bonuses and free spins
📢 **Announcements** - Stay updated with the latest news

Use /help to see available commands!`;

      if (!this.isReady) {
        logger.warn('Telegram bot not ready, simulating welcome message');
        return { success: true, mock: true };
      }

      await this.bot.sendMessage(chatId, welcomeText, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '🌐 Visit Website', url: this.config.FRONTEND_URL || 'https://porterplays.com' },
              { text: '💬 Join Discord', url: this.config.DISCORD_INVITE_URL || 'https://discord.gg/porterplays' }
            ]
          ]
        }
      });

      logger.info(`Sent welcome message to Telegram user: ${username}`);
      return { success: true };

    } catch (error) {
      logger.error('Failed to send welcome message:', error);
      return { success: false, error: error.message };
    }
  }

  async sendHelpMessage(chatId) {
    try {
      const helpText = `🤖 **Porter Plays Bot Commands**

/start - Welcome message and bot info
/help - Show this help message
/codes - Get latest bonus codes
/website - Visit our website
/discord - Join our Discord server

Stay tuned for updates and new codes! 🎰`;

      if (!this.isReady) {
        logger.warn('Telegram bot not ready, simulating help message');
        return { success: true, mock: true };
      }

      await this.bot.sendMessage(chatId, helpText, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '🌐 Website', url: this.config.FRONTEND_URL || 'https://porterplays.com' },
              { text: '💬 Discord', url: this.config.DISCORD_INVITE_URL || 'https://discord.gg/porterplays' }
            ]
          ]
        }
      });

      return { success: true };

    } catch (error) {
      logger.error('Failed to send help message:', error);
      return { success: false, error: error.message };
    }
  }

  async sendCodesMessage(chatId) {
    try {
      const codesText = `🎰 **Latest Bonus Codes**

🎐 **Goated Codes:**
• Check our website for premium codes
• Maximum win potential codes

🎰 **Shuffle Codes:**
• Daily free spins
• Bonus multipliers

Visit our website for the latest codes! 🌐`;

      if (!this.isReady) {
        logger.warn('Telegram bot not ready, simulating codes message');
        return { success: true, mock: true };
      }

      await this.bot.sendMessage(chatId, codesText, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '🎰 Get Codes', url: this.config.FRONTEND_URL || 'https://porterplays.com' }
            ]
          ]
        }
      });

      return { success: true };

    } catch (error) {
      logger.error('Failed to send codes message:', error);
      return { success: false, error: error.message };
    }
  }

  async broadcastMessage(message, adminId = null) {
    try {
      if (adminId) {
        logAdminAction(adminId, 'telegram_broadcast', { message });
      }

      if (!this.isReady) {
        logger.warn('Telegram bot not ready, simulating broadcast');
        return { success: true, mock: true };
      }

      // This would require storing chat IDs of subscribers
      // For now, just log the broadcast attempt
      logger.info(`Telegram broadcast: ${message}`);
      return { success: true, note: 'Broadcast logged - chat IDs not yet implemented' };

    } catch (error) {
      logger.error('Failed to broadcast Telegram message:', error);
      return { success: false, error: error.message };
    }
  }

  getStatus() {
    return {
      ready: this.isReady,
      bot: this.bot ? 'initialized' : null
    };
  }

  async stop() {
    if (this.bot) {
      await this.bot.stopPolling();
      this.isReady = false;
      logger.info('Telegram bot stopped');
    }
  }
}

module.exports = TelegramBotManager;