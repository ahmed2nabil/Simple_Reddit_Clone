'use strict'
const express = require("express");

const feedRouter = express.Router();

const feedController = require('../controllers/post');


feedRouter.get('/posts',feedController.getPosts);

feedRouter.post('/post',feedController.addPost);

feedRouter.get('/post/:postId',feedController.getPost);

feedRouter.put('/post/:postId',feedController.updatePost);

feedRouter.delete('/post/:postId',feedController.deletePost);


module.exports = feedRouter;