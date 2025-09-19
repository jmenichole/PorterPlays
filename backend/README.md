# Porter Plays Backend API

A comprehensive backend API for the Porter Plays Discord bot and user management system.

## Features

- 🔐 **Discord OAuth2 Authentication** - Secure user authentication via Discord
- 🤖 **Discord Bot Integration** - Automated posting to Discord channels
- 📊 **User Progress Tracking** - Database-backed onboarding and progress tracking
- 🎯 **Analytics Dashboard** - Real-time statistics and monitoring
- 🪝 **Webhook Support** - Real-time event handling for Discord and Telegram
- 📝 **Comprehensive Logging** - Winston-based error logging and monitoring
- 🛡️ **Security & Rate Limiting** - Helmet, CORS, and rate limiting middleware
- 📱 **RESTful API** - Clean API endpoints for frontend integration

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js with Discord OAuth2
- **Bot Framework**: Discord.js
- **Logging**: Winston
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting

## Quick Start

### Prerequisites

- Node.js 18 or higher
- MongoDB (local or cloud instance)
- Discord Application with bot token
- Telegram Bot Token (optional)

### Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3001`

## Environment Configuration

### Required Environment Variables

```env
# Server
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/porterplays

# Discord
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_BOT_TOKEN=your_discord_bot_token

# Session
SESSION_SECRET=your_session_secret
```

### Optional Environment Variables

```env
# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=24h

# Admin Users (comma-separated Discord IDs)
ADMIN_USER_IDS=123456789,987654321

# Logging
LOG_LEVEL=info

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

## API Endpoints

### Authentication
- `GET /api/auth/discord` - Initiate Discord OAuth
- `GET /api/auth/discord/callback` - OAuth callback
- `GET /api/auth/logout` - Logout user
- `GET /api/auth/user` - Get current user info

### Bot Interactions
- `POST /api/bot/message` - Send bot message
- `POST /api/bot/action` - Handle bot action
- `GET /api/bot/responses` - Get available responses

### Admin Dashboard
- `GET /api/admin/stats` - Get dashboard statistics
- `POST /api/admin/announce` - Post announcement
- `POST /api/admin/code` - Post bonus code
- `GET /api/admin/users` - Get user list
- `GET /api/admin/feedback` - Get user feedback

### Analytics
- `GET /api/analytics/overview` - Get overview stats
- `GET /api/analytics/users` - Get user analytics
- `GET /api/analytics/casinos` - Get casino performance

### Webhooks
- `POST /webhooks/discord` - Discord webhook handler
- `POST /webhooks/telegram` - Telegram webhook handler

## Database Schema

### User Model
- **Authentication**: Discord OAuth data
- **Progress**: Onboarding step tracking
- **Preferences**: Theme, notifications, language
- **Activity**: Login history, last activity
- **Referrals**: Referral system data
- **Casino Accounts**: Linked casino information
- **Statistics**: Wagering stats, referrals count

### Other Collections
- **Feedback**: User feedback and suggestions
- **Analytics**: Site usage statistics
- **Logs**: Application logs and errors

## Discord Bot Features

### Automated Posting
- **Bonus Codes**: Post casino bonus codes to specific channels
- **Announcements**: Send important announcements to all channels
- **Welcome Messages**: Automated welcome for new users

### Channel Management
- **Code Channels**: Separate channels for each casino
- **VIP Channels**: Exclusive content for VIP users
- **Support Channel**: Automated support responses

### Admin Controls
- **Real-time Posting**: Post to channels instantly
- **Channel Status**: Monitor bot connectivity
- **Activity Logs**: Track all bot actions

## Development

### Available Scripts

```bash
# Development server with auto-reload
npm run dev

# Production server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format

# Seed database
npm run seed
```

### Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.js  # MongoDB connection
│   │   └── passport.js  # Discord OAuth setup
│   ├── controllers/     # Route controllers
│   ├── models/          # Mongoose models
│   ├── routes/          # API route definitions
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utility functions
│   └── server.js        # Main server file
├── tests/               # Test files
├── logs/                # Log files (auto-generated)
├── .env.example         # Environment template
├── package.json         # Dependencies
└── README.md           # This file
```

## Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure production MongoDB URI
- [ ] Set secure session secrets
- [ ] Enable HTTPS/SSL
- [ ] Configure reverse proxy (nginx)
- [ ] Set up monitoring (PM2, health checks)
- [ ] Configure log rotation
- [ ] Set up backup strategy

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## Security

### Implemented Security Measures

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing control
- **Rate Limiting**: API request throttling
- **Input Validation**: Request sanitization
- **Session Security**: Secure session configuration
- **OAuth2**: Secure authentication flow

### Best Practices

- Never commit secrets to version control
- Use environment variables for configuration
- Implement proper error handling
- Log security events
- Regular dependency updates
- Input validation on all endpoints

## Monitoring

### Logging Levels

- **error**: Application errors
- **warn**: Warnings and admin actions
- **info**: General information
- **http**: API requests
- **debug**: Detailed debugging info

### Health Checks

- `GET /health` - Server health status
- Database connectivity
- Discord bot status
- Memory usage monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions:
- **Discord**: [Porter Plays Discord](https://discord.gg/porterplays)
- **Issues**: [GitHub Issues](https://github.com/jmenichole/PorterPlays/issues)
- **Documentation**: This README and inline code comments