# 🚀 Vercel Deployment Guide for AuthHookApi

This guide will walk you through deploying your AuthHookApi server to Vercel via GitHub integration.

## 📋 Prerequisites

- GitHub account with your repository
- Vercel account (free tier available)
- MongoDB Atlas database (or any remote MongoDB)

## 🔧 Project Configuration

The project is already configured for Vercel deployment with:

### ✅ **vercel.json** - Optimized Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.ts"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "index.ts": {
      "maxDuration": 30
    }
  }
}
```

### ✅ **package.json** - Updated Scripts
- Added `vercel-build` script for deployment optimization
- Proper TypeScript configuration for Vercel

## 🚀 Deployment Steps

### Step 1: Push to GitHub
```bash
# Add all changes
git add .

# Commit changes
git commit -m "Configure for Vercel deployment"

# Push to GitHub
git push origin main
```

### Step 2: Connect Vercel to GitHub

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub or login to existing account

2. **Import Project**
   - Click "New Project" on Vercel dashboard
   - Select "Import Git Repository"
   - Choose your AuthHookApi repository
   - Click "Import"

### Step 3: Configure Environment Variables

In Vercel dashboard, add these environment variables:

#### Required Variables
```bash
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/authhook

# JWT Configuration
JWT_ACCESS_TOKEN=your-super-secure-jwt-secret-key-min-32-chars

# Security
COOKIE_NAME=auth_token
X_API_KEY=x-api-key

# CORS (Add your frontend URLs)
CORS_ORIGINS=https://your-frontend.vercel.app,http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Environment
NODE_ENV=production
```

#### How to Add Environment Variables in Vercel:
1. Go to your project dashboard
2. Click "Settings" tab
3. Click "Environment Variables"
4. Add each variable with its value
5. Select "Production, Preview, and Development"

### Step 4: Deploy

1. **Automatic Deployment**
   - Vercel will automatically build and deploy
   - Wait for deployment to complete (usually 1-2 minutes)

2. **Check Deployment**
   - You'll get a URL like: `https://auth-hook-api-xxx.vercel.app`
   - Test the API: `https://your-url.vercel.app/api/v1`

## 🔍 Verification

Test your deployed API:

```bash
# Health check
curl https://your-vercel-url.vercel.app/

# API test
curl https://your-vercel-url.vercel.app/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

## 🗄️ Database Setup (MongoDB Atlas)

### Quick MongoDB Atlas Setup:
1. **Create Account**: Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. **Create Cluster**: Choose free tier (M0)
3. **Setup Database Access**: 
   - Create database user
   - Set username/password
4. **Network Access**: 
   - Add IP: `0.0.0.0/0` (allows all IPs)
5. **Get Connection String**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/authhook
   ```

## 📝 Environment Variables Reference

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_ACCESS_TOKEN` | JWT secret (min 32 chars) | `your-super-secure-jwt-secret-key-here` |
| `COOKIE_NAME` | Authentication cookie name | `auth_token` |
| `X_API_KEY` | API key header name | `x-api-key` |
| `CORS_ORIGINS` | Allowed origins (comma-separated) | `https://app.vercel.app,http://localhost:3000` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in ms | `900000` (15 minutes) |
| `RATE_LIMIT_MAX` | Max requests per window | `100` |
| `NODE_ENV` | Environment mode | `production` |

## 🔧 Advanced Configuration

### Custom Domain (Optional)
1. Go to project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Function Configuration
- **Timeout**: Set to 30 seconds (already configured)
- **Memory**: Default 1024MB (sufficient for most cases)
- **Region**: Auto (Vercel optimizes automatically)

## 🐛 Troubleshooting

### Common Issues:

#### 1. **Build Failures**
```bash
# Check build logs in Vercel dashboard
# Common fix: Ensure all dependencies are in package.json
```

#### 2. **Environment Variables Not Working**
- Ensure variables are added in Vercel dashboard
- Redeploy after adding variables
- Check variable names match exactly

#### 3. **Database Connection Issues**
```bash
# Test MongoDB connection string locally first
# Ensure IP whitelist includes 0.0.0.0/0
```

#### 4. **CORS Errors**
```bash
# Add your frontend domain to CORS_ORIGINS
# Format: https://domain1.com,https://domain2.com
```

## 📊 Monitoring

### Vercel Analytics
- Available in project dashboard
- Shows function invocations, errors, duration
- Real-time logs available

### Custom Monitoring
```typescript
// Add to your app for enhanced monitoring
app.use('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});
```

## 🔄 Continuous Deployment

Once connected to GitHub:
- **Auto-deploy**: Every push to `main` branch deploys automatically
- **Preview**: Pull requests get preview deployments
- **Rollback**: Easy rollback in Vercel dashboard

## 🚀 Production Checklist

Before going live:
- ✅ All environment variables configured
- ✅ MongoDB Atlas setup with proper security
- ✅ Strong JWT secret (min 32 characters)
- ✅ CORS origins properly configured
- ✅ Rate limiting configured appropriately
- ✅ Custom domain configured (optional)
- ✅ Monitoring setup
- ✅ API tested thoroughly

## 📞 Support

If you encounter issues:
1. Check Vercel function logs
2. Verify environment variables
3. Test MongoDB connection
4. Check GitHub repository settings

Your AuthHookApi is now ready for production on Vercel! 🎉
