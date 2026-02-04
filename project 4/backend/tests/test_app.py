import pytest
from app import app, db, Item

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.app_context():
        db.create_all()
        yield app.test_client()
        db.session.remove()
        db.drop_all()

def test_health_check(client):
    """Test health check endpoint"""
    response = client.get('/api/health')
    assert response.status_code == 200
    assert response.json['status'] == 'healthy'

def test_get_items_empty(client):
    """Test getting items when database is empty"""
    response = client.get('/api/items')
    assert response.status_code == 200
    assert response.json == []

def test_create_item(client):
    """Test creating a new item"""
    response = client.post('/api/items', 
        json={'title': 'Test Item', 'description': 'Test Description'}
    )
    assert response.status_code == 201
    assert response.json['title'] == 'Test Item'
    assert response.json['description'] == 'Test Description'

def test_get_items(client):
    """Test getting items after creating one"""
    client.post('/api/items', json={'title': 'Item 1'})
    client.post('/api/items', json={'title': 'Item 2'})
    
    response = client.get('/api/items')
    assert response.status_code == 200
    assert len(response.json) == 2

def test_update_item(client):
    """Test updating an item"""
    create_response = client.post('/api/items', json={'title': 'Original Title'})
    item_id = create_response.json['id']
    
    response = client.put(f'/api/items/{item_id}', 
        json={'title': 'Updated Title'}
    )
    assert response.status_code == 200
    assert response.json['title'] == 'Updated Title'

def test_delete_item(client):
    """Test deleting an item"""
    create_response = client.post('/api/items', json={'title': 'To Delete'})
    item_id = create_response.json['id']
    
    response = client.delete(f'/api/items/{item_id}')
    assert response.status_code == 200
    
    # Verify it's deleted
    get_response = client.get(f'/api/items/{item_id}')
    assert get_response.status_code == 404

def test_item_not_found(client):
    """Test getting non-existent item"""
    response = client.get('/api/items/999')
    assert response.status_code == 404

def test_create_item_missing_title(client):
    """Test creating item without title"""
    response = client.post('/api/items', json={'description': 'No title'})
    assert response.status_code == 400
