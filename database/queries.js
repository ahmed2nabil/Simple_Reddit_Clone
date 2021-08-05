'use strict'

exports.queryList = {
//queries for user 
    GET_USER : 'SELECT * FROM user WHERE (email = ?)',
    ADD_USER : 'INSERT INTO user SET ?',
    CHECK_USER_EXISTS : 'SELEC * from user where(email = ?)',
  //quereies for posts 
    GET_All_POSTS : 'SELECT * FROM post',
    ADD_POST : 'INSERT INTO post SET ?',
    GET_POST_BY_ID : 'SELECT  * from post WHERE (post_id = ?)',
    UPDATE_POST_BY_ID : 'UPDATE post SET title = ?, imageUrl = ? , content = ? WHERE (post_id = ?)',
    DELETE_POST_BY_ID : 'DELETE FROM post WHERE (post_id) = ?'
}