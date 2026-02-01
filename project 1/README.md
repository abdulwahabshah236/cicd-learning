# Project 1 — Basic Web App (CI to Azure App Service)

## Goal ✅
Every time you push to `main`, the pipeline should:
- Build your app
- Run tests
- Deploy the new version automatically to Azure App Service

## What is included here 🔧
- Minimal Node.js Express app (`app.js`, `index.js`)
- Unit tests using `jest` + `supertest` (`tests/app.test.js`)
- `package.json` with scripts for `start`, `test`, `build`

## How to run locally 💡
1. Install dependencies: `npm ci`
2. Run tests: `npm test`
3. Start the app: `npm start` and browse to `http://localhost:3000`

## How pipeline maps to the project (conceptual) 📋
- Trigger: push to `main`
- Agent: `ubuntu-latest` (fresh VM)
- Setup Node: `actions/setup-node` or `NodeTool@0`
- Install dependencies: `npm ci`
- Tests: `npm test` (pipeline fails on test failures)
- Build: `npm run build` (here a placeholder; replace if you add a frontend build)
- Package: archive artifacts (zip)
- Deploy: Azure Web App task / `azure/webapps-deploy`

## Azure setup notes ⚠️
- Create an **Azure App Service** (Linux Web App or Node on Linux)
- Create a **service connection** (Azure DevOps) or publish profile / service principal for GitHub Actions
- Set pipeline variables / secrets: `YOUR_WEBAPP_NAME`, `YOUR_SERVICE_CONNECTION` or `AZURE_WEBAPP_PUBLISH_PROFILE`

## Next steps I can help with 👇
- I can create a sample Azure DevOps pipeline (including variable templates) that uses your actual subscription and service connection
- I can add a Dockerfile and show a container-based deployment
- I can convert this to an Angular frontend + backend sample if you'd prefer

---

If you want, tell me which CI provider you plan to use (Azure DevOps or GitHub Actions) and I will help wire up the pipeline to your Azure subscription. 