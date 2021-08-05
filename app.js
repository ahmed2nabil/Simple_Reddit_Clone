'use strict'
const express = require('express');
const app = express();

const PORT = 3000 ;

const feedRoutes = require('./routes/post');

app.use(express.json());
app.use(feedRoutes)

app.listen(PORT,(req,res,next) => {
    console.log(`Server listening on port ${PORT}`);
})