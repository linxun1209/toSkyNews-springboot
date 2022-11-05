package com.skynews.dao;

import com.skynews.pojo.Comment;
import com.skynews.pojo.Reviews;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CommentMapper {

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
    List<Reviews> queryReviewsByParent(int parentID);

    //通过reviewsID查询某一条子评论
    Reviews queryReviewsByReviewsID(int reviewsID);

    //通过parentID,contain，times,makerId查询某一条子评论的reviewsID
    Reviews queryReviewsIDByAll(@Param("parentID") int parentID,@Param("contain") String contain,@Param("times") String times,@Param("makerID")int makerID);

    //通过reviewsID修改childID
    int updateChildID(int childID);

    //查询某一条父评论下子评论的个数
    int queryCountByParentID(int parentID);

    //根据parentID删除子评论
    int deleteReviewsByParentID(int parentID);
}