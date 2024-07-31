// Data
const listProducts = [
  { id: 1, name: "Suitcase 250", price: 50, stock: 4 },
  { id: 2, name: "Suitcase 450", price: 100, stock: 10 },
  { id: 3, name: "Suitcase 650", price: 350, stock: 2 },
  { id: 4, name: "Suitcase 1050", price: 550, stock: 5 }
];

// Function to get item bu Id
function getItemById(id) {
  return listProducts.find(product => product.id === id);
}

// Expres server
const express = require('express');
const redis = require('redis');
const { promisify } = require('util');
const app = express();
const port = 1245;

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

// Data and Functions from above
const listProducts = [/* ... */];
function getItemById(id) {/* ... */}

app.get('/list_products', (req, res) => {
  const products = listProducts.map(product => ({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock,
  }));
  res.json(products);
});

// Further routes implementation will go here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Reserve stock in redis
function reserveStockById(itemId, stock) {
  client.set(`item.${itemId}`, stock);
}

// Get Reserved Stock from Redis
async function getCurrentReservedStockById(itemId) {
  const stock = await getAsync(`item.${itemId}`);
  return stock ? parseInt(stock, 10) : 0;
}

// Route to Get Product Details
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);

  if (!product) {
    res.json({ status: "Product not found" });
    return;
  }

  const currentQuantity = product.stock - await getCurrentReservedStockById(itemId);

  res.json({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock,
    currentQuantity,
  });
});

// Route to Reserve Product
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const product = getItemById(itemId);

  if (!product) {
    res.json({ status: "Product not found" });
    return;
  }

  const currentStock = product.stock - await getCurrentReservedStockById(itemId);

  if (currentStock <= 0) {
    res.json({ status: "Not enough stock available", itemId });
    return;
  }

  reserveStockById(itemId, product.stock - currentStock + 1);
  res.json({ status: "Reservation confirmed", itemId });
});
