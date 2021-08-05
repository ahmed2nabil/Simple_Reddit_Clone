'use strict'

exports.queryList = {
    GET_All_USER : 'SELECT * from  user',

    //quereies for posts 
    GET_All_POSTS : 'SELECT * FROM post',
    ADD_POST : 'INSERT INTO post SET ?',
    GET_POST_BY_ID : 'SELECT  * from post WHERE (post_id = ?)',
    UPDATE_POST_BY_ID : 'UPDATE post SET title = ?, imageUrl = ? , content = ? WHERE (post_id = ?)',
    DELETE_POST_BY_ID : 'DELETE FROM post WHERE (post_id) = ?'
}