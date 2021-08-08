
const  dbConnection = require("../database/connection");
const sqlquery = require("../database/queries").queryList


exports.getComments = async(req,res,next) => {
const postId =req.params.postId
    try {
const comments = await dbConnection.query(sqlquery.GET_ALL_COMMENTS,postId);
const user = await dbConnection.query(sqlquery.GET_USER_BY_ID,comments[0].user_id);
res.status(200).json({comments :comments,user : {name : user[0].name }});
    }
    catch(err){
    if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
}
};

exports.addComment = async(req,res,next) => {
const postId = req.params.postId;
const content =  req.body.content;
const comment = {
content : content,
user_id : req.userId,
post_id : postId,
}
try {
    const newComment = await dbConnection.query(sqlquery.ADD_COMMENT,comment);
    const user = await dbConnection.query(sqlquery.GET_USER_BY_ID,req.userId);
    res.status(200).json({msg: "Created Successfully",commentId : newComment.insertId,
    userData : {name : user[0].name,id : req.userId}});
}catch(err) {
    if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
}
}

exports.getComment = async (req,res,next) => {
    const commentId =req.params.commentId;
    const postId =req.params.postId;
    const userId = req.userId
    try {
        const comment = await dbConnection.query(sqlquery.GET_COMMENT,[commentId,postId]);
        const user = await dbConnection.query(sqlquery.GET_USER_BY_ID,comment[0].user_id);
        res.status(200).json({comment : comment,user : {name : user[0].name }});
    }catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }
}

exports.udpateComment = async (req,res,next) => {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const content = req.body.content;
        if(!content) {
            return res.status(404).json({msg : "Paramter miss"})
        }

        const comment = await dbConnection.query(sqlquery.GET_COMMENT,[commentId,postId]);
        if(comment[0].user_id === req.userId){
            const updatedData = dbConnection.query(sqlquery.UPDATE_COMMET,[content,commentId,postId]);
            res.status(200).json({msg : 'Updated Succesfully'});
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

exports.deleteComment = async (req,res,next) => {
    try {
        const postId = req.params.postId
        const commentId = req.params.commentId
        const comment = await dbConnection.query(sqlquery.GET_COMMENT,[commentId,postId]);
        if(comment[0].user_id === req.userId) {
       
           const commentData =await dbConnection.query(sqlquery.DELETE_COMMENT_BY_ID,commentId);
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