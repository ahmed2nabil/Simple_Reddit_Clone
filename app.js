'use strict'
const express = require('express');
const app = express();



const feedRoutes = require('./routes/post');

app.use(express.json());
app.use(feedRoutes)

app.listen(3000);