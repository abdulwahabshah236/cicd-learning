# Project 3 - Full-Stack Application (.NET + Frontend)

## Quick Overview

**Backend:** .NET 8 (C#) ASP.NET Core REST API on port 5000
**Frontend:** Static HTML/JavaScript SPA

## Quick Start

### Backend
```bash
cd "project 3/backend"
dotnet run
# Runs on http://localhost:5000/api
```

### Frontend
```bash
# Open in browser:
project 3/frontend/src/index.html

# Or serve with Python:
cd "project 3/frontend/src"
python -m http.server 3000
```

## Testing

```bash
cd "project 3/Tests"
dotnet restore
dotnet test
```

## API Endpoints
- `GET  /api/greeting?name=YourName` - Greeting endpoint
- `GET  /api/health` - Health check
- `POST /api/echo` - Echo message (POST)

## Swagger API Docs
When backend is running, visit: `http://localhost:5000/swagger`

## What This Teaches You
✓ .NET 8 / ASP.NET Core backend development
✓ Multi-component application (frontend + backend)
✓ REST API communication
✓ xUnit testing for .NET
✓ Dependency Injection in .NET
✓ CORS handling in .NET
✓ Ready for CI/CD pipeline (GitHub Actions)
