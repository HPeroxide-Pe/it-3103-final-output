//api gateway with redis integration

const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const redis = require('redis');
const bodyParser = require('body-parser');

const app = express();
const client = redis.createClient();


app.use(bodyParser.json());

client.on('connect', () => console.log('Connected to Redis'));
client.on('error', (err) => console.error('Redis error:', err));

// rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100,
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

// request transformation middleware
app.use((req, res, next) => {
  if (req.body && req.body.date) {
    req.body.date = new Date(req.body.date).toISOString();
  }
  next();
});

// middleware for caching
const cacheMiddleware = (keyPrefix) => (req, res, next) => {
  const key = `${keyPrefix}:${req.params.id}`;
  
  client.get(key, (err, data) => {
    if (err) {
      console.error('Redis error:', err);
      return res.status(500).send('Internal server error');
    }

    if (data) {
      console.log('Cache hit:', key);
      return res.json(JSON.parse(data));
    }

    console.log('Cache miss:', key);
    next();
  });
};

// CRM routes
app.use('/api/crm/customers/:id', cacheMiddleware('customer'), createProxyMiddleware({
  target: process.env.CRM_SERVICE_URL,
  changeOrigin: true,
  onProxyRes(proxyRes, req, res) {
    if (proxyRes.statusCode === 200) {
      let body = [];
      proxyRes.on('data', (chunk) => body.push(chunk));
      proxyRes.on('end', () => {
        const data = JSON.parse(Buffer.concat(body).toString());
        const key = `customer:${req.params.id}`;
        client.setex(key, 600, JSON.stringify(data)); // Cache response for 10 minutes
      });
    }
  }
}));

// inventory routes
app.use('/api/inventory', createProxyMiddleware({
  target: process.env.INVENTORY_SERVICE_URL,
  changeOrigin: true
}));

// support routes
app.use('/api/support', createProxyMiddleware({
  target: process.env.SUPPORT_SERVICE_URL,
  changeOrigin: true
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});