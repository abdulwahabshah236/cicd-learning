# Project 3: Simple Full-Stack CICD Learning App

A basic full-stack application with .NET 8 (C#) ASP.NET Core backend and HTML/JavaScript frontend, designed for learning CICD pipelines.

## 📋 Project Structure

```
project 3/
├── backend/                          # .NET 8 ASP.NET Core API
│   ├── Project3.Backend.csproj      # C# project configuration
│   ├── Program.cs                   # Application startup
│   ├── appsettings.json            # Configuration
│   ├── appsettings.Development.json # Dev configuration
│   ├── Controllers/
│   │   └── GreetingController.cs    # API endpoints
│   └── Models/
│       └── ApiModels.cs             # Request/Response models
├── Tests/                            # Backend tests (xUnit)
│   ├── Project3.Backend.Tests.csproj
│   └── GreetingControllerTests.cs
└── frontend/                         # HTML/JavaScript frontend
    ├── package.json
    └── src/
        ├── index.html
        ├── styles.css
        └── app.js
```

## 🚀 Features

### Backend API
- **GET /api/greeting** - Returns a greeting message
  - Parameters: `name` (optional, default: "World")
  - Example: `GET /api/greeting?name=John`

- **GET /api/health** - Health check endpoint
  - Returns: `{"status":"UP","description":"Project 3 .NET Backend is running"}`

- **POST /api/echo** - Echo API (demonstrates POST requests)
  - Body: `{"message":"your message"}`
  - Returns: `{"response":"You said: your message"}`

### Frontend
- Clean, responsive UI
- Interactive buttons to test backend endpoints
- Real-time backend status indicator
- Error handling and display

## 🛠️ Setup & Running Locally

### Prerequisites
- .NET 8 SDK ([Download](https://dotnet.microsoft.com/download))
- Node.js 18+ (optional, for frontend development)

### Backend Setup

```bash
cd "project 3/backend"

# Restore dependencies
dotnet restore

# Build the project
dotnet build

# Run the application
dotnet run
```

Backend will run on: `http://localhost:5000` (HTTP) or `http://localhost:5001` (HTTPS)

**Note:** The API endpoints will be available at `http://localhost:5000/api`

### Frontend Setup

```bash
cd "project 3/frontend"

# Install dependencies (optional for static serving)
npm install

# Open index.html directly in browser or serve with:
npx http-server src/
```

Frontend will be available at: `http://localhost:8000` (or wherever you serve it)

## 📝 Quick Start

1. **Start the backend:**
   ```bash
   cd "project 3/backend"
   dotnet run
   ```

2. **Open the frontend:**
   - Open `project 3/frontend/src/index.html` in your browser
   - Or serve it with a static server:
     ```bash
     cd "project 3/frontend/src"
     python -m http.server 3000
     # OR
     npx http-server
     ```

3. **Test the application:**
   - Type a name and click "Get Greeting"
   - Click "Check Backend Status"
   - Enter a message and click "Send Message"

## 🧪 Testing

### Backend Tests
```bash
cd "project 3/Tests"
dotnet restore
dotnet test
# OR with verbose output
dotnet test --verbosity normal
```

Tests include:
- Greeting endpoint with name parameter
- Greeting endpoint with default name
- Health check endpoint status verification
- Echo endpoint POST request
- Echo endpoint error handling
- Echo endpoint null/empty message validation

## 🐳 Docker (Optional)

### Backend Dockerfile
```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY Project3.Backend.csproj .
RUN dotnet restore
COPY . .
RUN dotnet build -c Release -o /app/build

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/build .
EXPOSE 5000 5001
CMD ["dotnet", "Project3.Backend.dll"]
```

### Frontend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY src .
RUN npm install -g http-server
EXPOSE 3000
CMD ["http-server"]
```

## 📦 Building for Deployment

### Backend
```bash
cd "project 3/backend"
dotnet publish -c Release -o ./publish
# Creates: project 3/backend/publish/
# Run with: dotnet Project3.Backend.dll
```

### Frontend
```bash
# The frontend is static HTML/CSS/JS - no build step needed
# Copy the entire src/ directory to your web server
```

## 🔧 Configuration

Edit project 3/backend/appsettings.json:
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

### Backend Ports
- **HTTP:** Port 5000 (default)
- **HTTPS:** Port 5001 (default)

### Frontend API URL
Edit project 3/frontend/src/app.js:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## 📚 API Documentation

### Greeting API
```bash
curl "http://localhost:5000/api/greeting?name=Alice"
# Response: {"message":"Hello, Alice! Welcome to Project 3 (.NET Backend)."}
```

### Health Check
```bash
curl "http://localhost:5000/api/health"
# Response: {"status":"UP","description":"Project 3 .NET Backend is running"}
```

### Echo API
```bash
curl -X POST "http://localhost:5000/api/echo" \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello Backend"}'
# Response: {"response":"You said: Hello Backend"}
```

### Swagger/OpenAPI
When running locally, visit: `http://localhost:5000/swagger` to explore the API interactively
```

### Echo API
```b.NET 8 Backend** - Modern ASP.NET Core REST API
- **API Communication** - Frontend calling backend REST APIs
- **Testing** - xUnit tests for backend API endpoints
- **Dependency Injection** - Built-in .NET DI container
- **CORS Handling** - Cross-Origin Resource Sharing configuration
- **Logging** - Structured logging in .NET
- **Environment Configuration** - appsettings.json configuration
- **Swagger/OpenAPI** - API documentation and testing
# Response: {"response":"You said: Hello Backend"}
```
DLL to a server (Azure App Service, IIS, Docker, etc.)
3. Deploy frontend to a static hosting service (Azure Static Web Apps, S3, etc.)
4. Add authentication using JWT or OAuth
5. Add Entity Framework Core + Database (SQL Server, PostgreSQL, etc.)
6. Add business logic and data access layers
7. Implement API versioning
8. Add request validation and error handling middleware
## 📖 Learning Objectives

This project demonstrates:
- **CI/CD Ready** - Can be easily integrated into GitHub Actions
- **Multi-stage Build** - Frontend + Backend built separately
- **API Communication** - Frontend calling backend REST APIs
- **Testing** - Unit tests for backend API endpoints
- **Artifact Generation** - JAR file for backend, static files for frontend
- **Environment Configuration** - Application properties for backend

## 🔗 Next Steps

1. Create a GitHub Actions workflow to build & test both components
2. Deploy backend JAR to a server (Azure App Service, EC2, etc.)
3. Deploy frontend to a static hosting service (Azure Static Web Apps, S3, etc.)
4. Add authentication between frontend and backend
5. Add database integration to backend

## 📝 License

MIT
