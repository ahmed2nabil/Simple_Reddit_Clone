"use strict"
const pool = require('./pool');
const sqlquery = require("../database/queries").queryList

exports.query = (queryText,queryParams) =>{
  return new Promise((resolve, reject)=>{
    pool.query(queryText,queryParams,  (error, results)=>{
        if(error){
            return reject(error);
        }
        return resolve(results);
    });
});
}

