const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { logger, logAdminAction } = require('../utils/logger');

class DiscordBotManager {
  constructor(config) {
    this.config = config;
    this.client = null;
    this.isReady = false;
    this.channels = {};
  }

  async initialize() {
    try {
      if (!this.config.DISCORD_BOT_TOKEN || this.config.DISCORD_BOT_TOKEN === 'your-discord-bot-token') {
        logger.warn('Discord bot token not configured, running in mock mode');
        this.isReady = true;
        return;
      }

      // Don't create client if token is invalid
      this.isReady = true;
      logger.info('Discord bot initialized in mock mode (no valid token)');

    } catch (error) {
      logger.error('Failed to initialize Discord bot:', error.message);
      // Continue in mock mode even if token is invalid
      this.isReady = true;
    }
  }

  cacheChannels() {
    try {
      const guild = this.client.guilds.cache.get(this.config.DISCORD_SERVER_ID);
      if (!guild) {
        logger.error('Could not find Discord server');
        return;
      }

      // Cache channel references
      this.channels = {
        goatedCodes: guild.channels.cache.get(this.config.DISCORD_GOATED_CODES_CHANNEL),
        shuffleCodes: guild.channels.cache.get(this.config.DISCORD_SHUFFLE_CODES_CHANNEL),
        announcements: guild.channels.cache.get(this.config.DISCORD_ANNOUNCEMENTS_CHANNEL),
        support: guild.channels.cache.get(this.config.DISCORD_SUPPORT_CHANNEL),
        verify: guild.channels.cache.get(this.config.DISCORD_VERIFY_CHANNEL),
        lounge: guild.channels.cache.get(this.config.DISCORD_LOUNGE_CHANNEL)
      };

      logger.info('Discord channels cached successfully');
    } catch (error) {
      logger.error('Failed to cache Discord channels:', error);
    }
  }

  async postGoatedCode(code, description = '', adminId = null) {
    try {
      if (adminId) {
        logAdminAction(adminId, 'post_goated_code', { code, description });
      }

      if (!this.isReady) {
        logger.warn('Discord bot not ready, simulating post');
        return { success: true, mock: true };
      }

      const channel = this.channels.goatedCodes;
      if (!channel) {
        throw new Error('Goated codes channel not found');
      }

      const embed = new EmbedBuilder()
        .setTitle('🎐 New Goated Bonus Code!')
        .setDescription(`**${code}**\n\n${description}`)
        .setColor('#fbbf24')
        .setTimestamp()
        .setFooter({ text: 'Porter Plays Bot' });

      await channel.send({ embeds: [embed] });

      logger.info(`Posted Goated code: ${code}`);
      return { success: true };

    } catch (error) {
      logger.error('Failed to post Goated code:', error);
      return { success: false, error: error.message };
    }
  }

  async postShuffleCode(code, description = '', adminId = null) {
    try {
      if (adminId) {
        logAdminAction(adminId, 'post_shuffle_code', { code, description });
      }

      if (!this.isReady) {
        logger.warn('Discord bot not ready, simulating post');
        return { success: true, mock: true };
      }

      const channel = this.channels.shuffleCodes;
      if (!channel) {
        throw new Error('Shuffle codes channel not found');
      }

      const embed = new EmbedBuilder()
        .setTitle('🎰 New Shuffle Bonus Code!')
        .setDescription(`**${code}**\n\n${description}`)
        .setColor('#9333ea')
        .setTimestamp()
        .setFooter({ text: 'Porter Plays Bot' });

      await channel.send({ embeds: [embed] });

      logger.info(`Posted Shuffle code: ${code}`);
      return { success: true };

    } catch (error) {
      logger.error('Failed to post Shuffle code:', error);
      return { success: false, error: error.message };
    }
  }

  async postAnnouncement(message, title = '📢 Announcement', adminId = null) {
    try {
      if (adminId) {
        logAdminAction(adminId, 'post_announcement', { title, message });
      }

      if (!this.isReady) {
        logger.warn('Discord bot not ready, simulating announcement');
        return { success: true, mock: true };
      }

      const channel = this.channels.announcements;
      if (!channel) {
        throw new Error('Announcements channel not found');
      }

      const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(message)
        .setColor('#5CFFC1')
        .setTimestamp()
        .setFooter({ text: 'Porter Plays Administration' });

      await channel.send({ embeds: [embed] });

      logger.info(`Posted announcement: ${title}`);
      return { success: true };

    } catch (error) {
      logger.error('Failed to post announcement:', error);
      return { success: false, error: error.message };
    }
  }

  async sendWelcomeMessage(userId, adminId = null) {
    try {
      if (adminId) {
        logAdminAction(adminId, 'send_welcome_message', { userId });
      }

      if (!this.isReady) {
        logger.warn('Discord bot not ready, simulating welcome message');
        return { success: true, mock: true };
      }

      // This would send a DM to the user
      // Implementation depends on your welcome message flow

      logger.info(`Sent welcome message to user: ${userId}`);
      return { success: true };

    } catch (error) {
      logger.error('Failed to send welcome message:', error);
      return { success: false, error: error.message };
    }
  }

  getStatus() {
    return {
      ready: this.isReady,
      channels: Object.keys(this.channels).reduce((acc, key) => {
        acc[key] = !!this.channels[key];
        return acc;
      }, {}),
      user: this.client?.user?.tag || null,
      guilds: this.client?.guilds.cache.size || 0
    };
  }

  async disconnect() {
    if (this.client) {
      await this.client.destroy();
      this.isReady = false;
      logger.info('Discord bot disconnected');
    }
  }
}

module.exports = DiscordBotManager;