'use strict'
const express = require("express");

const feedRouter = express.Router();

const feedController = require('../controllers/post');
const commentContrller = require("../controllers/comment");
const { verfiyToken } = require("../middlewares/verfiyToken");

feedRouter.get('/posts',feedController.getPosts);

feedRouter.post('/post',verfiyToken,feedController.addPost);

feedRouter.get('/post/:postId',feedController.getPost);

feedRouter.put('/post/:postId',verfiyToken,feedController.updatePost);

feedRouter.delete('/post/:postId',verfiyToken,feedController.deletePost);

feedRouter.get('/post/:postId/comments',verfiyToken,commentContrller.getComments);

feedRouter.post('/post/:postId/comment',verfiyToken,commentContrller.addComment);

feedRouter.get('/post/:postId/comment/:commentId',verfiyToken,commentContrller.getComment);

feedRouter.put('/post/:postId/comment/:commentId',verfiyToken,commentContrller.udpateComment);

feedRouter.delete('/post/:postId/comment/:commentId',verfiyToken,commentContrller.deleteComment);


module.exports = feedRouter;