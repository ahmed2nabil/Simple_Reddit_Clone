'use strict'
const express = require('express');
const app = express();

const PORT = 3000 ;

const authRoutes = require('./routes/auth');
const feedRoutes = require('./routes/post');
app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use(authRoutes);
app.use(feedRoutes);

const server = app.listen(PORT,(req,res,next) => {
    console.log(`Server listening on port ${PORT}`);
})

const io = require('./utils/socket').init(server);
io.on('connection', socket => {
  console.log('Client connected');
});