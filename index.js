const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

const app = express();

const PORT = config.get('PORT');
const MONGO_URI = config.get('MONGO_URI');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', userRoutes);

// Error Middleware
app.use((err, req, res, next) => {
  console.log('Error Middleware', err, err.message);
  res.json({ error: err, statusCode: 400 });
});

app.listen(PORT, () => {
  console.log('Server is listening on port 5000');
});

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.log('MongoDB connection error', err);
  });
