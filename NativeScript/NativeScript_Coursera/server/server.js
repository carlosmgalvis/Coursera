const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Sample data for products
let products = [
  { id: 1, title: 'Laptop Gaming', category: 'Electrónica', price: 1299.99 },
  { id: 2, title: 'Smartphone Pro', category: 'Electrónica', price: 899.99 },
  { id: 3, title: 'Auriculares BT', category: 'Audio', price: 199.99 },
  { id: 4, title: 'Smart TV 55"', category: 'Electrónica', price: 599.99 },
  { id: 5, title: 'Teclado Mecánico', category: 'Accesorios', price: 149.99 },
  { id: 6, title: 'Mouse Gamer', category: 'Accesorios', price: 79.99 },
  { id: 7, title: 'Tablet Pro', category: 'Electrónica', price: 699.99 },
  { id: 8, title: 'Cámara DSLR', category: 'Fotografía', price: 1499.99 },
  { id: 9, title: 'Drone 4K', category: 'Drones', price: 799.99 },
  { id: 10, title: 'Smartwatch', category: 'Wearables', price: 299.99 }
];

// Middleware to parse JSON
app.use(express.json());

// GET endpoint to retrieve products with optional filtering by category
app.get('/api/products', (req, res) => {
  const { category } = req.query;
  let filteredProducts = products;
  
  if (category) {
    filteredProducts = products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  res.json(filteredProducts);
});

// GET endpoint to retrieve a single product by id
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;