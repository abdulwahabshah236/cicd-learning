# Project 3 - Azure Deployment Guide

## 🎯 Infrastructure Overview

### Dev Environment
- **Backend API**: `api-dev-project-03.azurewebsites.net`
- **Frontend**: `web-dev-project-03.azurewebsites.net`
- **Resource Group**: `rg-dev-project-03`
- **Deployment**: Automatic on push to `main`

### Prod Environment
- **Backend API**: `api-prod-project-03.azurewebsites.net`
- **Frontend**: `web-prod-project-03.azurewebsites.net`
- **Resource Group**: `rg-prod-project-03`
- **Deployment**: Manual approval required

---

## 📋 Prerequisites

### 1. Azure Resources (Already Created via Terraform)
✅ App Services created  
✅ Cosmos DB provisioned  
✅ Networking configured

### 2. GitHub Secrets Required

Add these secrets in **GitHub → Settings → Secrets and variables → Actions**:

#### Backend Publish Profiles
```
AZURE_WEBAPP_PUBLISH_PROFILE_DEV
AZURE_WEBAPP_PUBLISH_PROFILE_PROD
```

**How to get publish profiles:**
1. Go to Azure Portal
2. Navigate to App Service: `api-dev-project-03`
3. Click **Get publish profile** (top toolbar)
4. Copy entire XML content
5. Paste into GitHub secret
6. Repeat for `api-prod-project-03`

#### Frontend Publish Profiles
```
AZURE_WEBAPP_PUBLISH_PROFILE_FRONTEND_DEV
AZURE_WEBAPP_PUBLISH_PROFILE_FRONTEND_PROD
```

**How to get publish profiles:**
1. Go to Azure Portal
2. Navigate to App Service: `web-dev-project-03`
3. Click **Get publish profile**
4. Copy entire XML content
5. Paste into GitHub secret
6. Repeat for `web-prod-project-03`

---

## 🚀 Deployment Process

### Automatic Deployment (Dev)
1. **Push code to `main` branch**
   ```bash
   git add .
   git commit -m "Deploy Project 3"
   git push origin main
   ```

2. **GitHub Actions will automatically:**
   - ✅ Build backend (.NET 8)
   - ✅ Build frontend (static files)
   - ✅ Run 6 unit tests
   - ✅ Deploy backend to `api-dev-project-03`
   - ✅ Deploy frontend to `web-dev-project-03`
   - ✅ Run health checks

3. **Verify deployment:**
   - Backend: https://api-dev-project-03.azurewebsites.net/api/health
   - Frontend: https://web-dev-project-03.azurewebsites.net
   - Swagger: https://api-dev-project-03.azurewebsites.net/swagger

### Manual Deployment (Production)
1. **Dev deployment must succeed first**
2. **Go to GitHub Actions → Latest workflow run**
3. **Click "Review deployments"**
4. **Select "production" environment → Approve**
5. **Production deployment starts automatically**

---

## 🔧 Configuration Details

### Backend Configuration
- **Framework**: .NET 8 ASP.NET Core
- **Runtime**: Linux App Service
- **SKU**: B1 (Basic)
- **CORS**: Enabled for all origins
- **HTTPS**: Required
- **Health Endpoint**: `/api/health`

### Frontend Configuration
- **Type**: Static SPA (HTML/CSS/JS)
- **Hosting**: Linux App Service with Node.js
- **API Communication**: 
  - Dev: `https://api-dev-project-03.azurewebsites.net/api`
  - Prod: `https://api-prod-project-03.azurewebsites.net/api`

### Environment Detection
Frontend automatically detects environment:
```javascript
web-dev-project-03.azurewebsites.net → uses api-dev-project-03
web-prod-project-03.azurewebsites.net → uses api-prod-project-03
localhost:3000 → uses localhost:5000
```

---

## 🧪 Testing Deployed Application

### Test Backend API
```bash
# Health check
curl https://api-dev-project-03.azurewebsites.net/api/health

# Greeting endpoint
curl "https://api-dev-project-03.azurewebsites.net/api/greeting?name=Azure"

# Echo endpoint
curl -X POST https://api-dev-project-03.azurewebsites.net/api/echo \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello from Azure"}'
```

### Test Frontend
1. Open: https://web-dev-project-03.azurewebsites.net
2. Check status indicator (should show "Online ✓")
3. Test Greeting section
4. Test Health Check section
5. Test Echo section

---

## 📊 Monitoring

### View Logs
**Backend Logs:**
```bash
# Azure CLI
az webapp log tail --name api-dev-project-03 --resource-group rg-dev-project-03
```

**Frontend Logs:**
```bash
az webapp log tail --name web-dev-project-03 --resource-group rg-dev-project-03
```

### Application Insights (Optional)
- Navigate to App Service → Monitoring → Application Insights
- View request traces, exceptions, performance

---

## 🛠️ Troubleshooting

### Issue: Deployment fails with "publish-profile not found"
**Solution**: Ensure GitHub secrets are correctly named and contain valid XML content

### Issue: Frontend shows "Offline" status
**Solution**: 
1. Check backend health: `curl https://api-dev-project-03.azurewebsites.net/api/health`
2. Verify CORS configuration in backend
3. Check browser console for CORS errors

### Issue: Backend returns 500 errors
**Solution**:
1. Check App Service logs
2. Verify .NET 8 runtime is configured
3. Check `appsettings.json` configuration

### Issue: Tests fail in GitHub Actions
**Solution**:
1. Run tests locally: `cd "project 3/Tests"; dotnet test`
2. Check test output in GitHub Actions logs
3. Verify all dependencies are restored

---

## 🔄 Rollback Strategy

### Rollback Dev
```bash
az webapp deployment slot swap --name api-dev-project-03 \
  --resource-group rg-dev-project-03 --slot staging --target-slot production
```

### Rollback Prod
1. Go to Azure Portal → App Service
2. Navigate to **Deployment Center**
3. Select previous successful deployment
4. Click **Redeploy**

---

## 📝 Next Steps

- [ ] Set up Application Insights for monitoring
- [ ] Configure custom domain names
- [ ] Add SSL certificates for custom domains
- [ ] Set up alerts for downtime
- [ ] Configure auto-scaling rules
- [ ] Integrate Cosmos DB for data persistence
- [ ] Add authentication (Azure AD B2C)

---

## 📞 Support

For issues or questions:
- Check GitHub Actions workflow logs
- Review Azure App Service diagnostics
- Consult Terraform configuration in `/Terraform/environments/`
