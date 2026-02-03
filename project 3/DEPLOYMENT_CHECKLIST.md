# 🚀 Quick Deployment Checklist

## Step 1: Get Azure Publish Profiles ⏱️ 5 min

### Backend Profiles
1. Open Azure Portal → App Services
2. Click `api-dev-project-03`
3. Top toolbar → **Get publish profile** → Download
4. Open XML file, copy ALL content
5. GitHub repo → Settings → Secrets → **New repository secret**
   - Name: `AZURE_WEBAPP_PUBLISH_PROFILE_DEV`
   - Value: [paste XML]
6. Repeat for `api-prod-project-03` → Secret name: `AZURE_WEBAPP_PUBLISH_PROFILE_PROD`

### Frontend Profiles
7. Azure Portal → `web-dev-project-03` → Get publish profile
8. GitHub secret name: `AZURE_WEBAPP_PUBLISH_PROFILE_FRONTEND_DEV`
9. Repeat for `web-prod-project-03` → Secret name: `AZURE_WEBAPP_PUBLISH_PROFILE_FRONTEND_PROD`

**Total secrets needed: 4**

---

## Step 2: Commit and Push Code ⏱️ 2 min

```bash
cd "d:\Devops learning\Cicd"
git add .
git commit -m "Configure Azure deployment for Project 3"
git push origin main
```

---

## Step 3: Watch GitHub Actions ⏱️ 5-7 min

1. Go to: https://github.com/[your-repo]/actions
2. Click on the running workflow
3. Monitor jobs:
   - ✅ build-backend (2 min)
   - ✅ build-frontend (1 min)
   - ✅ test-backend (1 min)
   - ✅ deploy-dev (3 min)
   - ⏸️ deploy-prod (waiting for approval)

---

## Step 4: Verify Dev Deployment ⏱️ 2 min

### Test Backend
```bash
curl https://api-dev-project-03.azurewebsites.net/api/health
# Expected: {"status":"UP","description":"Project 3 Backend (.NET) is running"}
```

### Test Frontend
Open browser: https://web-dev-project-03.azurewebsites.net
- Status should show: **Online ✓** (green)
- Test all 3 sections

---

## Step 5: Deploy to Production ⏱️ 5 min

1. GitHub Actions → Latest workflow
2. Click **Review deployments**
3. Check **production** → Click **Approve and deploy**
4. Wait for deployment to complete
5. Verify: https://web-prod-project-03.azurewebsites.net

---

## ✅ Deployment Complete!

**Dev Environment:**
- Backend: https://api-dev-project-03.azurewebsites.net
- Frontend: https://web-dev-project-03.azurewebsites.net
- Swagger: https://api-dev-project-03.azurewebsites.net/swagger

**Prod Environment:**
- Backend: https://api-prod-project-03.azurewebsites.net
- Frontend: https://web-prod-project-03.azurewebsites.net
- Swagger: https://api-prod-project-03.azurewebsites.net/swagger

---

## 🔍 Common Issues

| Issue | Solution |
|-------|----------|
| "Publish profile not found" error | Check secret names match exactly (case-sensitive) |
| Frontend shows "Offline" | Backend may still be starting (wait 30-60 sec) |
| Deployment stuck | Check GitHub Actions logs for errors |
| CORS errors | Already configured, check browser console |

---

**Total Time: ~20 minutes** (first deployment)  
**Subsequent deployments: ~5 minutes** (automatic)
