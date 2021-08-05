'use strict'
const  dbConnection = require("../database/connection");
const sqlquery = require("../database/queries").queryList


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
    const post =  {
        title: req.body.title,
        imageUrl :req.body.imageUrl,
        content :req.body.content
    }
    try {
        const newPost = await dbConnection.query(sqlquery.ADD_POST,post);
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
const post = dbConnection.query(sqlquery.UPDATE_POST_BY_ID,updatedPost);
res.status(204).json({msg : 'Updated Succesfully'});
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
     const post = dbConnection.query(sqlquery.DELETE_POST_BY_ID,postId);
console.log(post)
     res.status(200).json({msg : 'Deleted Successfully'})
 }   catch(err) {
    if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
 }
}