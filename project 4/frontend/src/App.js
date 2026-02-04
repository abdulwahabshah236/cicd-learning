import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/items`);
      setItems(response.data);
    } catch (err) {
      setError('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    try {
      const response = await axios.post(`${API_URL}/items`, {
        title: newItem,
      });
      setItems([...items, response.data]);
      setNewItem('');
    } catch (err) {
      setError('Failed to add item');
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/items/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Project 4 - Full Stack App</h1>
        <p>React Frontend + Python Backend + Database</p>
      </header>

      <div className="container">
        {error && <div className="error">{error}</div>}

        <form onSubmit={addItem} className="add-form">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add a new item..."
            className="input-field"
          />
          <button type="submit" className="btn-add">
            Add Item
          </button>
        </form>

        {loading && <p>Loading...</p>}

        <div className="items-list">
          <h2>Items ({items.length})</h2>
          {items.length === 0 ? (
            <p>No items yet. Add one to get started!</p>
          ) : (
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <span>{item.title}</span>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
