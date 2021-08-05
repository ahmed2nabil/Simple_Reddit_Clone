'use strict'
const express = require("express");

const feedRouter = express.Router();

const feedController = require('../controllers/post');
const { verfiyToken } = require("../middlewares/verfiyToken");

feedRouter.get('/posts',feedController.getPosts);

feedRouter.post('/post',verfiyToken,feedController.addPost);

feedRouter.get('/post/:postId',feedController.getPost);

feedRouter.put('/post/:postId',verfiyToken,feedController.updatePost);

feedRouter.delete('/post/:postId',verfiyToken,feedController.deletePost);


module.exports = feedRouter;