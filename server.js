require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { routeLog } = require('./middleware/authRBAC');
const app = express();
const PORT =  process.env.PORT || 3000;
const dbHost = process.env.DB_HOST;
const redisPort = process.env.REDIS_PORT;

// middleware
app.use(bodyParser.json());
app.use(express.json());

// routes
app.use('/customers', routeLog('Customer route accessed'), require('./routes/customers'));
app.use('/api/tickets', routeLog('Ticket route accessed'), require('./routes/tickets'));
app.use('/api/orders', routeLog('Order route accessed'), require('./routes/orders'));
app.use('/api/products', routeLog('Product route accessed'), require('./routes/products'));
app.use('/api/auth', routeLog('User route accessed'), require('./routes/auth'));

// db connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log(`Database Host: ${dbHost}`);
console.log(`Redis Port: ${redisPort}`);