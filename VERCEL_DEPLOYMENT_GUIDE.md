# 🚀 Auth-Hook API - Vercel Deployment Guide

This guide provides step-by-step instructions to deploy your Auth-Hook API to Vercel using the **proven working configuration**.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Project Configuration](#project-configuration)
- [Deployment Steps](#deployment-steps)
- [Environment Variables](#environment-variables)
- [Testing Your Deployment](#testing-your-deployment)
- [Troubleshooting](#troubleshooting)
- [Advanced Configuration](#advanced-configuration)

---

## 🔧 Prerequisites

- ✅ GitHub account with your repository
- ✅ Vercel account (free tier available at [vercel.com](https://vercel.com))
- ✅ MongoDB Atlas database (or remote MongoDB instance)
- ✅ Node.js 18+ and npm installed locally

---

## ⚙️ Project Configuration

### 📁 **Project Structure**
```
server/
├── src/
│   ├── index.ts          # Main entry point (exports Express app)
│   ├── app.ts            # Express application setup
│   ├── config/           # Database & environment config
│   ├── controllers/      # Route handlers
│   ├── middlewares/      # Custom middlewares
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── utils/           # Utility functions
├── api/                 # Build output (auto-generated)
├── vercel.json          # Vercel configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── README.md
```

### ⚡ **Working Configuration Files**

#### 1. `vercel.json` - Vercel Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/src/index.ts"
    }
  ]
}
```

#### 2. `tsconfig.json` - TypeScript Configuration  
```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./api",
    "module": "commonjs",
    "target": "ES2017",
    "lib": ["ES6"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

#### 3. `package.json` - Key Scripts
```json
{
  "type": "commonjs",
  "scripts": {
    "dev": "nodemon ./src/index.ts",
    "build": "tsc",
    "start": "node ./api/index.js",
    "vercel-build": "echo 'Building for Vercel deployment'"
  }
}
```

#### 4. `src/index.ts` - Entry Point
```typescript
import app from "./app";
import { connectDB, envConfig } from "./config";

// Initialize database connection for Vercel
connectDB();

// For local development
const PORT = envConfig("PORT") || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.warn(`Server is listening on port ${PORT}`);
  });
}

// ======== EXPORT FOR VERCEL ========
export default app;
```

---

## 🚀 Deployment Steps

### Step 1: Push Code to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Deploy to Vercel with working configuration"

# Push to main branch
git push origin main
```

### Step 2: Import Project in Vercel

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Sign in with GitHub

2. **Import Repository**
   - Click "**Add New...**" → "**Project**"
   - Select "**Import Git Repository**"
   - Choose your `Auth-Hook-API` repository
   - Click "**Import**"

3. **Configure Project Settings**
   ```
   Framework Preset: Other
   Root Directory: server
   Build Command: (leave empty - auto-detected)
   Output Directory: (leave empty)
   Install Command: npm install
   ```

### Step 3: Add Environment Variables

In your Vercel project dashboard:

1. Go to "**Settings**" → "**Environment Variables**"
2. Add the following variables:

#### 🔒 Required Environment Variables

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/authhook` |
| `JWT_ACCESS_TOKEN` | JWT secret (32+ chars) | `your-super-secure-jwt-secret-key-here` |
| `COOKIE_NAME` | Auth cookie name | `auth_token` |
| `X_API_KEY` | API key header | `x-api-key` |
| `CORS_ORIGINS` | Allowed origins | `https://yourapp.vercel.app,http://localhost:3000` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` |
| `RATE_LIMIT_MAX` | Max requests | `100` |
| `NODE_ENV` | Environment | `production` |

### Step 4: Deploy

1. **Click "Deploy"** button in Vercel
2. **Wait for build** (usually 1-2 minutes)
3. **Get your URL**: `https://your-project-name.vercel.app`

---

## 🌐 Environment Variables Setup

### 🗄️ MongoDB Atlas Quick Setup

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Sign up for free tier

2. **Create Cluster**
   - Choose "**M0 Sandbox**" (free tier)
   - Select region closest to your users

3. **Setup Database Access**
   - Go to "**Database Access**"
   - Create new user with read/write permissions

4. **Configure Network Access**
   - Go to "**Network Access**" 
   - Add IP: `0.0.0.0/0` (allow all IPs)

5. **Get Connection String**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/authhook
   ```

### 🔐 JWT Secret Generation

```bash
# Generate a secure JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 🧪 Testing Your Deployment

### 1. **Health Check**
```bash
curl https://your-app.vercel.app/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-09-07T17:30:00.000Z",
  "environment": "production",
  "uptime": 0.123
}
```

### 2. **API Root**
```bash
curl https://your-app.vercel.app/
```

**Expected Response:**
```json
{
  "message": "Welcome to the Auth-Hook API",
  "version": "1.0.0",
  "status": "active",
  "timestamp": "2025-09-07T17:30:00.000Z"
}
```

### 3. **User Registration Test**
```bash
curl -X POST https://your-app.vercel.app/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "password": "testpassword123"
  }'
```

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### ❌ **Build Failures**
```bash
# Issue: TypeScript compilation errors
# Solution: Check build logs in Vercel dashboard
# Fix: Ensure all types are properly installed
```

#### ❌ **Database Connection Issues**
```bash
# Issue: MongoDB connection timeout
# Solutions:
# 1. Verify MONGO_URI format
# 2. Check network access (0.0.0.0/0)
# 3. Verify credentials
```

#### ❌ **CORS Errors**
```bash
# Issue: Frontend can't access API
# Solution: Add frontend domain to CORS_ORIGINS
# Format: https://domain1.com,https://domain2.com
```

#### ❌ **Environment Variables Not Working**
```bash
# Solutions:
# 1. Redeploy after adding variables
# 2. Check variable names match exactly
# 3. Ensure values are correctly formatted
```

---

## 🔬 Advanced Configuration

### 🎯 **Custom Domain Setup**

1. Go to "**Settings**" → "**Domains**"
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate generation

### ⚡ **Function Configuration**

```json
// vercel.json - Advanced settings
{
  "functions": {
    "src/index.ts": {
      "maxDuration": 30,
      "memory": 1024,
      "runtime": "nodejs18.x"
    }
  }
}
```

### 📊 **Monitoring & Analytics**

- **Function Logs**: Vercel Dashboard → Functions tab
- **Performance**: Built-in analytics in Vercel
- **Custom Logging**: Winston logs visible in function logs

### 🔄 **Auto-Deploy Setup**

Vercel automatically deploys on every push to `main` branch:

```bash
# Automatic deployment triggers
git push origin main  # Triggers production deployment
git push origin dev   # Can trigger preview deployment
```

---

## 📈 **Performance Tips**

1. **Cold Start Optimization**
   - Keep dependencies minimal
   - Use connection pooling for MongoDB

2. **Memory Management**  
   - Monitor function memory usage
   - Optimize database queries

3. **Caching**
   - Implement response caching where appropriate
   - Use CDN for static assets

---

## 🎉 **Success! Your API is Live**

Your Auth-Hook API is now deployed and accessible at:
```
🌐 https://your-project-name.vercel.app
```

### 📋 **Next Steps**

- [ ] Update frontend API endpoints
- [ ] Configure custom domain (optional)  
- [ ] Set up monitoring/analytics
- [ ] Create API documentation
- [ ] Implement CI/CD workflows

---

## 📞 **Support**

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Project Issues**: [GitHub Issues](https://github.com/brijeshdevio/Auth-Hook-API/issues)

---

**🚀 Happy Deploying!** Your Auth-Hook API is ready to handle authentication requests at scale!
