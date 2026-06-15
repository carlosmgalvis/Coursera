// server.js
require('./models/bicicleta');
require('./models/reserva');
require('./models/token');
require('./models/usuario');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bicicletasdb';

app.use(cors());
app.use(express.json());

// Simple schema
const itemSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Health check
app.get('/', (req, res) => {
  res.send('Hello from Node + Mongo + Kubernetes!');
});

// API: list items
app.get('/api/items', async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
});

// API: create item
app.post('/api/items', async (req, res) => {
  const { name } = req.body;
  const item = await Item.create({ name });
  res.status(201).json(item);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
