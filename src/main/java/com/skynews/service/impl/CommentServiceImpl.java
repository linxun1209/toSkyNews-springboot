package com.skynews.service.impl;

import com.skynews.dao.CommentMapper;
import com.skynews.dao.ManagerMapper;
import com.skynews.dao.PostsMapper;
import com.skynews.dao.UserMapper;
import com.skynews.pojo.Comment;
import com.skynews.pojo.Posts;
import com.skynews.pojo.Reviews;
import com.skynews.pojo.User;
import com.skynews.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private UserMapper userMapper;

    //service层调dao层：组合dao
    @Autowired
    private CommentMapper commentMapper ;
    public void setCommentMapper(CommentMapper commentMapper){
        this.commentMapper=commentMapper;
    }

    @Autowired
    private PostsMapper postsMapper;

    //service层调dao层：组合dao
    @Autowired
    private ManagerMapper managerMapper;
    public void setManagerMapper(ManagerMapper managerMapper){
        this.managerMapper=managerMapper;
    }

    @Override
    public int addComment(Comment comment) {
        //使用Date创建日期对象
        Date date = new Date();
        /**
         * 创建格式化时间日期类
         *构造入参String类型就是我们想要转换成的时间形式
         */
        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("格式化后的时间------->"+format.format(date));
        String contain=comment.getContain();
        int postsID=comment.getPostsID();
        int makerID=comment.getMakerID();
        Posts posts=postsMapper.getPost(postsID);
        int authorID=posts.getReside();
        System.out.println(authorID+"aaaaaaa");
        User user=userMapper.queryUserById(makerID);
        String picture=user.getPicture();
        String commentName=user.getUsername();
        Comment comment1=new Comment(contain,authorID,postsID,makerID,picture,format.format(date),commentName);
        return commentMapper.addComment(comment1);
    }

    @Override
    public List<Comment> queryCommentByPosts(int postsID) {
        return commentMapper.queryCommentByPosts(postsID);
    }

    @Override
    public int deleteCommentById(int commentID) {
        commentMapper.deleteReviewsByParentID(commentID);
        return commentMapper.deleteCommentById(commentID);
    }

    @Override
    public int queryCommentCount(int postsID) {
        return commentMapper.queryCommentCount(postsID);
    }

    @Override
    public int addReviews(Reviews reviews) {
        int parentID=reviews.getParentID();
        int childID=reviews.getChildID();
        //根据childID查询相应的做出那条评论的人的名字==》查询所有的子评论时这么写

        int makerID=reviews.getMakerID();
        String contain=reviews.getContain();
        //使用childID查询二级评论，获取里面的childName   ：根据二级评论id也就是childID==reviewsID查询childName
 //       Reviews reviews1=commentMapper.queryReviewsByReviewsID(childID);

        User user=managerMapper.queryUserById(makerID);
        String childName=user.getUsername();
        String childPicture=user.getPicture();
        //使用Date创建日期对象
        Date date = new Date();
        /**
         * 创建格式化时间日期类
         *构造入参String类型就是我们想要转换成的时间形式
         */
        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("格式化后的时间------->"+format.format(date));
        Reviews reviews1=new Reviews(parentID,childID,childName,childPicture,contain,format.format(date),makerID);
        commentMapper.addReviews(reviews1);
        int childID1=reviews1.getChildID();
        if(childID1==0){
            //也就是说这个评论是回复父评论的，就将childID改成查询到的这个二级评论的生成的id（reviewsID）
            //mapper：
            //int parentID, String contain,String times,int makerID
            Reviews reviews2=commentMapper.queryReviewsIDByAll(parentID,contain,format.format(date),makerID);
            int reviewsID=reviews2.getReviewsID();
            commentMapper.updateChildID(reviewsID);
        }
        return 0;
    }

    @Override
    public int deleteReviews(int reviewsID) {
        return commentMapper.deleteReviews(reviewsID);
    }

    @Override
    public Map<String,List> queryReviewsByParent(int parentID) {
        List<Reviews>reviews=commentMapper.queryReviewsByParent(parentID);
        Map<String,List>map=new HashMap<>();
        List<String>list=new LinkedList<>();
        for(int i=0;i<reviews.size();i++){
            Reviews reviews1=reviews.get(i);
            int childID=reviews1.getChildID();
            list.add(commentMapper.queryReviewsByReviewsID(childID).getChildName());
        }
        List<Integer>list1=new LinkedList<>();
        int count=commentMapper.queryCountByParentID(parentID);
        list1.add(count);
        map.put("这个父评论下子评论总数",list1);
        map.put("被回复的子评论的用户名",list);
        map.put("子评论们",reviews);
        return map;
    }

    /***********************
    @Override
    public Reviews queryReviewsByReviewsID(int reviewsID) {
        return commentMapper.queryReviewsByReviewsID(reviewsID);
    }

    @Override
    public int queryReviewsIDByAll(int parentID, String contain,String times,int makerID) {
        Reviews reviews2=commentMapper.queryReviewsIDByAll(parentID,contain,times,makerID);
        int reviewsID=reviews2.getReviewsID();
        return reviewsID;
    }

    @Override
    public int updateChildID(int childID) {
        return commentMapper.updateChildID(childID);
    }
    */
}