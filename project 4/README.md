# Project 4 - Full Stack Application

A complete full-stack application with React frontend, Python Flask backend, and SQLite database.

## Architecture

```
Project 4/
├── frontend/          # React application
├── backend/           # Python Flask API
└── database/          # Database schema and initialization
```

## Prerequisites

- Node.js 16+ (for React)
- Python 3.8+ (for Flask backend)
- npm or yarn (for package management)

## Local Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
copy .env.example .env

# Initialize database
python init_db.py

# Start the Flask server
python app.py
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Health Check
- `GET /api/health` - Check if API is running

### Items Management
- `GET /api/items` - Get all items
- `GET /api/items/{id}` - Get a specific item
- `POST /api/items` - Create a new item
- `PUT /api/items/{id}` - Update an item
- `DELETE /api/items/{id}` - Delete an item

## Environment Variables

### Backend (.env)
```
FLASK_ENV=development
FLASK_DEBUG=True
FLASK_APP=app.py
DATABASE_URL=sqlite:///project4.db
```

## Database

- Default: SQLite (`project4.db`)
- Can be changed via `DATABASE_URL` environment variable
- Supports PostgreSQL, MySQL, etc. by updating the connection string

## Project Structure

```
project 4/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── backend/
│   ├── app.py              # Main Flask application
│   ├── init_db.py          # Database initialization
│   ├── requirements.txt    # Python dependencies
│   └── .env.example        # Environment template
└── database/
    ├── schema.sql          # Database schema
    └── seed.sql            # Sample data
```

## Features

- ✅ Full CRUD operations on items
- ✅ RESTful API with Flask
- ✅ React frontend with Axios HTTP client
- ✅ SQLAlchemy ORM for database
- ✅ CORS enabled for cross-origin requests
- ✅ Error handling and validation
- ✅ Responsive UI

## Testing

### Backend Testing
```bash
# From backend directory
pytest
```

### Frontend Testing
```bash
# From frontend directory
npm test
```

## Production Build

### Frontend
```bash
cd frontend
npm run build
```

### Backend
```bash
# Use a production WSGI server like Gunicorn
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Next Steps: CI/CD Integration

Once verified locally, move to CI/CD by:
1. Creating GitHub Actions workflows
2. Setting up automated testing
3. Configuring deployment pipelines
4. Setting up environment-specific configurations

## Troubleshooting

### CORS Issues
- Ensure frontend URL is in CORS allowed origins
- Check that backend is running on port 5000

### Database Issues
- Delete `project4.db` and run `python init_db.py` again
- Check database permissions

### Port Already in Use
- Backend: Change port in `app.py`
- Frontend: React will prompt to use another port

## License

MIT
