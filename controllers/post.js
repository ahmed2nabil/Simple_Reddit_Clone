'use strict'
const fs = require('fs');
const path = require('path');

const  dbConnection = require("../database/connection");
const sqlquery = require("../database/queries").queryList

const io = require('../utils/socket');

exports.getPosts = async (req,res,next) => {
try {
    const posts = await dbConnection.query(sqlquery.GET_All_POSTS);

    res.status(200).json({posts :posts});
}catch (err){
    if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
}
}

exports.addPost = async (req,res,next) => {
    if (!req.file) {
        const error = new Error('No image provided.');
        error.statusCode = 422;
        throw error;
      }
    const post =  {
        title: req.body.title,
        imageUrl :req.file.path,
        content :req.body.content,
        user_id : req.userId
    }
    try {
        const newPost = await dbConnection.query(sqlquery.ADD_POST,post);
        const user = await dbConnection.query(sqlquery.GET_USER_BY_ID,req.userId);
        io.getIO().emit('posts', {
            action: 'create',
            post: { ...post, creator: { id: req.userId, name: user[0].name } }
          });
        res.status(201).json({msg : 'Created Successfully',postId : newPost.insertId});
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }
}

exports.getPost = async (req,res,next) => {
 const postId = req.params.postId;
 try {
const post = await dbConnection.query(sqlquery.GET_POST_BY_ID,postId);
res.status(200).json({post : post});
 }
 catch(err) {
    if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
       }
}
exports.updatePost = async(req,res,next) => {
 try {
    const postId = req.params.postId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const content = req.body.content;
    let updatedPost = [title,imageUrl,content,postId];
    if(!title || !imageUrl || !content) {
        res.status(400).json('Parameter miss');
    }
    const post = await dbConnection.query(sqlquery.GET_POST_BY_ID,postId);
    if(post[0].user_id === req.userId){
        const updatedData = dbConnection.query(sqlquery.UPDATE_POST_BY_ID,updatedPost);
    io.getIO().emit('posts', { action: 'update', post: post });

        res.status(204).json({msg : 'Updated Succesfully'});
    }else {
        res.status(400).json('Permission denied');
    }

 }catch(err){
    if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
       }
}

exports.deletePost = async (req,res,next) => {
 try {
 const postId = req.params.postId
 const post = await dbConnection.query(sqlquery.GET_POST_BY_ID,postId);
 if(post[0].user_id === req.userId) {

    const postData =await dbConnection.query(sqlquery.DELETE_POST_BY_ID,postId);
    clearImage(post[0].imageUrl);
    io.getIO().emit('posts', { action: 'delete', post: postId });
    res.status(200).json({msg : 'Deleted Successfully'})
 }else {
    res.status(400).json('Permission denied');
 }
 }   catch(err) {
    if (!err.statusCode) {
        err.statusCode = 500;
        
      }
      next(err);
 }
}


const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
  };