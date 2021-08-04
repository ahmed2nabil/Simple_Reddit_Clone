'use strict'
const  dbConnection = require("../database/connection");
const sqlquery = require("../database/queries").queryList


exports.getPosts = async (req,res) => {
try {
    const posts = await dbConnection.query(sqlquery.GET_All_POSTS);

    res.status(200).json({posts :posts});
}catch (err){
    if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
}
}

exports.addPost = async (req,res,next) => {
    const post =  {
        title: req.body.title,
        imageUrl :req.body.imageUrl,
        content :req.body.content
    }
    try {
        const newPost = await db.query(sqlquery.ADD_POST,post);
        console.log(newPost);
        res.status(200).json(newPost.rows);
    }
    catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }
}

exports.getPost = (req,res,next) => {
    
}
exports.updatePost = (req,res,next) => {
    
}

exports.deletePost = (req,res,next) => {
    
}