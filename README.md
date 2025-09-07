# 🔐 AuthHookApi

> **A robust, multi-tenant Authentication-as-a-Service (AaaS) platform built with Node.js, Express, and TypeScript**

AuthHookApi is a production-ready authentication service that enables developers to seamlessly integrate secure user authentication into their applications. With multi-tenancy support, comprehensive API key management, and enterprise-grade security features.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://typescriptlang.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://mongodb.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## ✨ Features

### 🏢 Multi-Tenant Architecture
- **Isolated Tenants**: Complete data isolation between different customers
- **Scalable Design**: Handle multiple applications and thousands of users per tenant
- **Resource Management**: Efficient resource allocation and usage tracking

### 🔑 Advanced API Key Management
- **Multiple Keys**: Create and manage multiple API keys per application
- **Key Rotation**: Seamless API key rotation without downtime
- **Granular Control**: Enable/disable keys with fine-grained permissions
- **Secure Generation**: Cryptographically secure key generation with collision detection

### 🛡️ Enterprise Security
- **Argon2 Hashing**: Industry-leading password hashing (OWASP recommended)
- **JWT Authentication**: Stateless authentication with HTTP-only cookies
- **Rate Limiting**: Built-in DDoS protection and abuse prevention
- **CORS & Helmet**: Comprehensive web security headers
- **Input Validation**: Type-safe validation using Zod schemas

### 🚀 Developer Experience
- **RESTful API**: Clean, intuitive API design following REST principles
- **TypeScript**: Full type safety throughout the codebase
- **Error Handling**: Consistent error responses with detailed debugging info
- **Logging**: Structured logging with Winston for monitoring and debugging
- **Hot Reload**: Fast development cycle with automatic reloading

### 🔧 Production Ready
- **Environment Configuration**: Flexible configuration management
- **Database Integration**: Optimized MongoDB integration with Mongoose
- **Middleware Stack**: Comprehensive middleware for security and functionality
- **Error Recovery**: Graceful error handling and recovery mechanisms

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **MongoDB** 6.0+
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/AuthHookApi.git
   cd AuthHookApi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```
   
   Configure your `.env` file:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/authhook
   CORS_ORIGINS=http://localhost:3000,http://localhost:5173
   
   JWT_ACCESS_TOKEN=your-super-secure-jwt-secret-key-here
   COOKIE_NAME=auth_token
   X_API_KEY=x-api-key
   
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX=100
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm run build && npm start
   ```

The API will be available at `http://localhost:3000`

---

## 📚 API Documentation

### Base URL
All API endpoints are prefixed with `/api/v1`

### Authentication Types
- **Developer Auth**: JWT token for customer/developer operations
- **API Key Auth**: `X-API-Key` header for end-user operations
- **User Auth**: JWT token for authenticated end-user operations

---

## 🔐 Developer Management

> **Authentication**: None required for signup/login, JWT token for protected routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Register a new developer account | None |
| `POST` | `/auth/login` | Developer login | None |
| `GET` | `/dev/me` | Get developer profile | Developer JWT |
| `PATCH` | `/dev/me` | Update developer profile | Developer JWT |
| `POST` | `/dev/logout` | Logout developer | Developer JWT |
| `DELETE` | `/dev/delete` | Delete developer account | Developer JWT |

### Registration Example
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com", 
    "password": "securepassword123"
  }'
```

### Login Example
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

---

## 🔑 Application & API Key Management

> **Authentication**: Developer JWT token required

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/apps` | Create a new application | Developer JWT |
| `GET` | `/apps` | List all applications | Developer JWT |
| `GET` | `/apps/:appId` | Get application details | Developer JWT |
| `DELETE` | `/apps/:appId` | Delete an application | Developer JWT |
| `POST` | `/apps/:appId/rotate-key` | Rotate application API key | Developer JWT |

### Create Application Example
```bash
curl -X POST http://localhost:3000/api/v1/apps \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "My Awesome App"
  }'
```

### Response
```json
{
  "success": true,
  "data": {
    "app": {
      "id": "64f9b1c2d1a2b3c4e5f6a7b8",
      "name": "My Awesome App",
      "apiKey": "sk_live_1a2b3c4d5e6f7g8h9i0j1k2l3m4n",
      "createdAt": "2024-09-07T14:30:00.000Z"
    }
  }
}
```

---

## 👥 End-User Management

> **Authentication**: API Key required via `X-API-Key` header

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/users/register` | Register a new end-user | API Key |
| `POST` | `/users/login` | End-user login | API Key |
| `GET` | `/users/me` | Get user profile | API Key + User JWT |
| `PATCH` | `/users/me` | Update user profile | API Key + User JWT |
| `POST` | `/users/logout` | Logout user | API Key + User JWT |
| `DELETE` | `/users/delete` | Delete user account | API Key + User JWT |

### Register End-User Example
```bash
curl -X POST http://localhost:3000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -H "X-API-Key: sk_live_1a2b3c4d5e6f7g8h9i0j1k2l3m4n" \
  -d '{
    "name": "Alice Smith",
    "email": "alice@example.com",
    "password": "userpassword123"
  }'
```

### Login End-User Example  
```bash
curl -X POST http://localhost:3000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -H "X-API-Key: sk_live_1a2b3c4d5e6f7g8h9i0j1k2l3m4n" \
  -d '{
    "email": "alice@example.com",
    "password": "userpassword123"
  }'
```

---

## 📋 Request/Response Formats

### Standard Success Response
```json
{
  "success": true,
  "data": {
    // Response data here
  }
}
```

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email already exists",
    "details": {
      // Additional error details
    }
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR` - Invalid input data
- `UNAUTHORIZED` - Invalid credentials or token
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `CONFLICT` - Resource already exists
- `RATE_LIMITED` - Too many requests

---

## 🛠️ Development

### Project Structure
```
src/
├── app.ts                  # Express app configuration
├── config/                 # Configuration files
│   ├── db.config.ts       # Database connection
│   ├── env.config.ts      # Environment variables
│   └── index.ts           # Config exports
├── controllers/           # Route handlers
│   ├── auth.controller.ts # Authentication logic
│   ├── dev.controller.ts  # Developer management
│   ├── user.controller.ts # User management
│   └── app.controller.ts  # Application management
├── middlewares/           # Express middlewares
│   ├── auth.middleware.ts # JWT authentication
│   ├── apiKey.middleware.ts # API key validation
│   ├── validate.middleware.ts # Request validation
│   └── rateLimiter.middleware.ts # Rate limiting
├── models/                # MongoDB models
│   ├── Developer.model.ts # Developer schema
│   ├── Application.model.ts # Application schema
│   └── User.model.ts      # User schema  
├── routes/                # API routes
│   └── v1/               # API version 1
├── services/             # Business logic
├── utils/                # Helper functions
└── validation/           # Zod schemas
```

### Available Scripts
```bash
npm run dev      # Start development server with hot reload
npm run build    # Build TypeScript to JavaScript
npm start        # Start production server
npm run lint     # Run ESLint (if configured)
npm test         # Run tests (if configured)
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |
| `MONGO_URI` | MongoDB connection string | Required |
| `JWT_ACCESS_TOKEN` | JWT secret key | Required |
| `COOKIE_NAME` | Auth cookie name | `auth_token` |
| `X_API_KEY` | API key header name | `x-api-key` |
| `CORS_ORIGINS` | Allowed CORS origins | `*` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` |
| `RATE_LIMIT_MAX` | Max requests per window | `100` |

---

## 🚢 Deployment

### Docker Deployment
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Platform Deployment

#### Vercel
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

#### Railway
```bash
railway login
railway init
railway add
railway deploy
```

#### Render
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Configure environment variables

---

## 🔒 Security Best Practices

### Implementation Features
- ✅ **Password Hashing**: Argon2 with secure defaults
- ✅ **JWT Tokens**: HTTP-only cookies prevent XSS
- ✅ **Rate Limiting**: Prevents brute force attacks  
- ✅ **Input Validation**: Zod schema validation
- ✅ **CORS Protection**: Configurable origin whitelist
- ✅ **Security Headers**: Helmet.js integration
- ✅ **API Key Security**: Cryptographically secure generation

### Recommendations
- Use HTTPS in production
- Implement proper session management
- Set up monitoring and alerting
- Regular security audits
- Keep dependencies updated

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙋‍♂️ Support

- **Documentation**: [API Docs](https://your-docs-url.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/AuthHookApi/issues)
- **Email**: [your-email@example.com](mailto:your-email@example.com)

---

## 🚀 What's Next?

- [ ] Email verification system
- [ ] Password reset functionality
- [ ] OAuth 2.0 integration
- [ ] Webhook support
- [ ] Analytics dashboard
- [ ] Mobile SDKs
- [ ] Advanced rate limiting per user
- [ ] Audit logs and compliance features

---

<div align="center">

**Made with ❤️ by [Your Name](https://github.com/yourusername)**

[⭐ Star this repo](https://github.com/yourusername/AuthHookApi) | [🐛 Report Issues](https://github.com/yourusername/AuthHookApi/issues) | [💡 Request Features](https://github.com/yourusername/AuthHookApi/issues)

</div>
