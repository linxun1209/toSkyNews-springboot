package com.skynews.service;

import com.skynews.pojo.Comment;
import com.skynews.pojo.Reviews;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


public interface CommentService {
    //发布评论
    int addComment(Comment comment);

    //展示某个帖子下所有评论
    List<Comment> queryCommentByPosts(int postsID);

    //根据评论id删除评论
    int deleteCommentById(int commentID);

    //返回某帖子评论个数
    int queryCommentCount(int postsID);

    //发布子评论
    int addReviews(Reviews reviews);

    //删除子评论（前端输入子评论id）
    int deleteReviews(int reviewsID);

    //查询某一个父评论下的所有子评论
    Map<String,List> queryReviewsByParent(int parentID);

    /****************************
    //通过reviewsID查询某一条子评论
    Reviews queryReviewsByReviewsID(int reviewsID);

    //通过parentID,contain，times,makerId查询某一条子评论的reviewsID
    int queryReviewsIDByAll(int parentID, String contain,String times,int makerID);

    //通过reviewsID修改childID
    int updateChildID(int childID);
     */
}
