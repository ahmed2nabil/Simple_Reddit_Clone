'use strict'

exports.queryList = {
//queries for user 
    GET_USER : 'SELECT * FROM user WHERE (email = ?)',
    GET_USER_BY_ID : 'SELECT * FROM user WHERE (user_id = ?)',
    ADD_USER : 'INSERT INTO user SET ?',
    CHECK_USER_EXISTS : 'SELEC * from user where(email = ?)',
  //quereies for posts 
    GET_All_POSTS : 'SELECT user.user_id ,user.name,post.post_id,post.title,post.content,post.imageUrl\
      FROM user\
      LEFT JOIN post\
      ON user.user_id = post.user_id;',
    ADD_POST : 'INSERT INTO post SET ?',
    GET_POST_BY_ID : 'SELECT  * from post WHERE (post_id = ?)',
    UPDATE_POST_BY_ID : 'UPDATE post SET title = ?, imageUrl = ? , content = ? WHERE (post_id = ?)',
    DELETE_POST_BY_ID : 'DELETE FROM post WHERE (post_id) = ?',

    // Comments 
    ADD_COMMENT : 'INSERT INTO comment SET ?',
    GET_ALL_COMMENTS : 'SELECT * FROM comment WHERE (post_id = ?)',
    GET_COMMENT : 'SELECT  * FROM comment WHERE (comment_id = ? AND post_id = ?)',
    UPDATE_COMMET : 'UPDATE comment SET content = ? WHERE (comment_id = ? AND post_id =?)',
    DELETE_COMMENT_BY_ID : 'DELETE FROM comment WHERE (comment_id = ?)'
}