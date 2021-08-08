'use strict'
const express = require('express');

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PORT = 3000 ;

const authRoutes = require('./routes/auth');
const feedRoutes = require('./routes/post');

//configutation image upload 

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g,'-') + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(express.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use(authRoutes);
app.use(feedRoutes);

const server = app.listen(PORT,(req,res,next) => {
    console.log(`Server listening on port ${PORT}`);
})

const io = require('./utils/socket').init(server);
io.on('connection', socket => {
  console.log('Client connected');
});