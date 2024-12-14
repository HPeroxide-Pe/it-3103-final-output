require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const dbHost = process.env.DB_HOST;
const redisPort = process.env.REDIS_PORT;

// middleware
app.use(bodyParser.json());

// routes
app.use('/customers', require('./routes/customers'));
app.use('/api/tickets', require('./routes/tickets'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/products', require('./routes/products'));

// db connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log(`Database Host: ${dbHost}`);
console.log(`Redis Port: ${redisPort}`);