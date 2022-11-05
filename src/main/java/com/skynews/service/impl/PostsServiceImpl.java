package com.skynews.service.impl;

import com.skynews.dao.CollectionMapper;
import com.skynews.dao.CommentMapper;
import com.skynews.dao.ManagerMapper;
import com.skynews.dao.PostsMapper;
import com.skynews.pojo.Comment;
import com.skynews.pojo.Posts;
import com.skynews.service.PostsService;
import com.skynews.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostsServiceImpl implements PostsService {

    //service层调用dao层：组合dao
    @Autowired
    private ManagerMapper managerMapper;

    @Autowired
    private CollectionMapper collectionMapper;

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private PostsMapper postsMapper;

    public void setPostsMapper(PostsMapper postsMapper){
        this.postsMapper=postsMapper;
    }

    @Override
    public List<Posts> queryAllPosts() {
        return postsMapper.queryAllPosts();
    }

    @Override
    public int deletePostsById(int postsID) {
        //通过帖子id获取其下父评论id
        List<Comment>list=commentMapper.queryCommentByPosts(postsID);
        for(int i=0;i<list.size();i++){
            Comment comment=list.get(i);
            //根据父评论ID（parentID）逐条删除子评论
            commentMapper.deleteReviewsByParentID(comment.getCommentID());
            //根据postsID删除父评论
            commentMapper.deleteCommentById(comment.getCommentID());
        }
        //根据postsID删除信息
        postsMapper.deleteAllMessagesByPostsID(postsID);
        //根据postsID删除收藏
        collectionMapper.deleteCollectionWrite(postsID);
        //根据postsID删除点赞
        collectionMapper.deleteAlikeWrite(postsID);
        return postsMapper.deletePostsById(postsID);
    }

    @Override
    public int auditing(int postsID) {
        return postsMapper.auditing(postsID);
    }

    @Override
    public int disAuditing(int postsID) {
        return postsMapper.disAuditing(postsID);
    }


    //根据用户id查询相对应的帖子
    @Override
    public List<Posts> queryPostsByUserID(int reside) {
        return postsMapper.queryPostsByUserID(reside);
    }

    //模糊查询
    @Override
    public List<Posts> vagueQuery(String thing,int column, int total) {
        List<Posts>list=postsMapper.vagueQuery(thing,column,total);
        return list;
    }
    //根据上面的模糊查询实现查询到多少条数据
    @Override
    public int queryVagueCountAll(String thing) {
        return postsMapper.queryVagueCountAll(thing);
    }
    //管理员查询待审核的帖子
    @Override
    public List<Posts> pendingPosts() {
        return postsMapper.pendingPosts();
    }

    @Override
    public List<Posts> querySameLabel(String thing,String label,int column,int total) {
        List<Posts>list=postsMapper.querySameLabel(thing,label,column,total);
        return list;
    }

    @Override
    public List<Posts> querySameLabelBy(String label, int column, int total) {
        List<Posts>list=postsMapper.querySameLabelBy(label,column,total);
        return list;
    }

    //返回数量（根据帖子标签查询所有相同标签的帖子）
    @Override
    public int querySameLabelCount(String label) {
        return postsMapper.querySameLabelCount(label);
    }

    @Override
    public int queryVagueSameLabelCount(String label, String thing) {
        return postsMapper.queryVagueSameLabelCount(label,thing);
    }


    @Override
    public List<Posts> passPosts() {
        return postsMapper.passPosts();
    }

    @Override
    public int updatePosts(Posts posts) {
        return postsMapper.updatePosts(posts);
    }

    @Override
    public List<Posts> vagueQueryPerson(int reside, String thing) {
        return postsMapper.vagueQueryPerson(reside,thing);
    }

    @Override
    public int addPosts(Posts posts) {
        return postsMapper.addPosts(posts);
    }

    @Override
    public Posts queryPostsById(int postsID) {
        return postsMapper.queryPostsById(postsID);
    }

    @Override
    public int collectionPosts(int collectionID, int postsID) {
        return postsMapper.collectionPosts(collectionID,postsID);
    }

    @Override
    public List<Posts> showAllCollection(int collectionID) {
        return postsMapper.showAllCollection(collectionID);
    }

    @Override
    public List<Posts> queryPaging(int column, int total) {
        return postsMapper.queryPaging(column,total);
    }

    @Override
    public int setBrowse(int postsID) {
        Posts posts=postsMapper.queryPostsById(postsID);
        if(posts!=null){
            postsMapper.setBrowse(postsID);
            return 1;
        }else{
            return 0;
        }
    }

    @Override
    public List<Posts> queryAlikeDesc(int column,int total) {
        return postsMapper.queryAlikeDesc(column,total);
    }

    @Override
    public int querySumAlike(int reside) {
        List<Posts>list=postsMapper.queryPostsByUserID(reside);
        if(list.isEmpty()){
            return 0;
        }
        else{
            return postsMapper.querySumAlike(reside);
        }
    }

    @Override
    public List<Posts> queryPagingPosts(int column, int total) {
        return postsMapper.queryPagingPosts(column,total);
    }

    @Override
    public int queryPostsCount() {
        return postsMapper.queryPostsCount();
    }
    @Override
    public int upPostImg(Posts posts) {
        return postsMapper.upPostImg(posts);
    }

    @Override
    public int changePosts(Posts posts) {
        return postsMapper.changePosts(posts);
    }

    @Override
    public Posts getPost(int postsID) {
        return postsMapper.getPost(postsID);
    }
    @Override
    public List<Posts> findUser() {
        return postsMapper.findUser();
    }

    @Override
    public  List<Posts> getList(int start,int count){   //获取用户list
        List<Posts> users = postsMapper.getList(start,count);
        return users;
    }
    @Override
    public Integer getTotal() {
        return postsMapper.getTotal();
    }  //获取用户总数

    @Override
    public Response getPostByID(int postsID) {
        Posts post = postsMapper.getPostByID(postsID);
        if(post!=null){
            return Response.ok(post);
        }
        return Response.error("error");
    }
}
