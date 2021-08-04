'use strict'

exports.queryList = {
    GET_All_USER : 'SELECT * from  user',
    GET_All_POSTS : 'SELECT * FROM post',
    ADD_POST : 'INSERT INTO post (title,imageUrl,content) values (?,?,?) '
}