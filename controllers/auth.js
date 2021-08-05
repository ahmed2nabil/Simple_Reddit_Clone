'use strict'

const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

const {validationResult} =require('express-validator');
const config = require('../utils/config');

const  dbConnection = require("../database/connection");
const sqlquery = require("../database/queries").queryList;


exports.postSignup = async (req,res,next) => {

    var token;
try {
    const errors = validationResult(req);
if (!errors.isEmpty()) {
 res.status(422).json({
    validationErrors: errors.array()
  });
}
    const hashedpassword = await bcrypt.hash(req.body.password,12);
    const userDoc = {
        email : req.body.email,
        password : hashedpassword,
        name : req.body.name
        }
    const userData = await dbConnection.query(sqlquery.ADD_USER,userDoc);
    token = jwt.sign({id : userData.insertId},config.secret,{
        expiresIn:86400
    });
    res.status(200).json({msg : 'Sign up Successfull',token :token ,userId : userData.insertId});
    
}catch(err) {
     if(!err.statusCode){
         err.status = 500;
        next(err);  
                    }
            }
} 

exports.postLogin = async(req,res,next) => {
const email = req.body.email;
const password = req.body.password;
var token;
let userData;
try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     res.status(422).json({
        validationErrors: errors.array()
      });
    }
    const user = await dbConnection.query(sqlquery.GET_USER,email);
    userData = user[0];
    if(userData) {
        const matching = await bcrypt.compare(password,userData.password);
        if(!matching) {
             res.status(400).json({msg : 'Invalid Email or password'})
        } else {
            token = jwt.sign({id : userData.user_id},config.secret,{
                expiresIn:86400
            });
            res.status(200).json({msg: 'Successfully Logged In',user: {name : userData.name,token:token}});
        }
    } else {
        res.status(400).json({msg : 'Invalid Email or password'})

    }
    
}catch(err){
    if(!err.statusCode){
        err.status = 500;
        next(err);
        }
}
} 
