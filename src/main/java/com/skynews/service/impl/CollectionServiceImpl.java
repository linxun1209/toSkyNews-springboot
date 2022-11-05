package com.skynews.service.impl;


import com.skynews.dao.AlikeMapper;
import com.skynews.dao.CollectionMapper;
import com.skynews.dao.CommentMapper;
import com.skynews.dao.PostsMapper;
import com.skynews.pojo.Collections;
import com.skynews.pojo.Comment;
import com.skynews.pojo.Messages;
import com.skynews.pojo.Posts;
import com.skynews.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class CollectionServiceImpl implements CollectionService {

    //service层调dao层：组合dao
    @Autowired
    private CollectionMapper collectionMapper ;
    public void setCollectionMapper(CollectionMapper collectionMapper){
        this.collectionMapper=collectionMapper;
    }

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private PostsMapper postsMapper;
    public void setPostsMapper(PostsMapper postsMapper){
        this.postsMapper=postsMapper;
    }

    @Autowired
    private AlikeMapper alikeMapper ;
    public void setAlikeMapper(AlikeMapper alikeMapper){
        this.alikeMapper=alikeMapper;
    }

    @Override
    public int addCollection(Collections collections) {
        Collections collections1=collectionMapper.queryCollection(collections.getPostsID(),collections.getUserID());
        /************************/
        if(collections1!=null){
            return 0;
        }else{
            /******** messages *********/
            int userID=collections.getUserID();
            int postsID=collections.getPostsID();
            String reside="collections";
            Posts posts=postsMapper.queryPostsById(postsID);
            String postsName=posts.getPostsName();
            int authorID=posts.getReside();
            //使用Date创建日期对象
            Date date = new Date();
            /**
             * 创建格式化时间日期类
             *构造入参String类型就是我们想要转换成的时间形式
             */
            SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            System.out.println("*******************"+postsID+"*******************");
            System.out.println("格式化后的时间------->"+format.format(date));
            Messages m=alikeMapper.queryMessagesID(reside,userID,postsID);
            if(m!=null){
                int messagesID=m.getMessagesID();
                alikeMapper.updateMessages(format.format(date),messagesID);
            }else{
                Messages messages=new Messages(reside,postsName,userID,authorID,format.format(date),postsID);
                collectionMapper.setMessages(messages);
            }
            /******** messages *********/
            collectionMapper.addCollection(collections);
            return 1;
        }
    }

    @Override
    public List<Collections> queryCollectionByUserID(int userID) {
        return collectionMapper.queryCollectionByUserID(userID);
    }

    @Override
    public int deleteCollectionById(Collections collections) {
        /******** messages *********/
//        int userID=collections.getUserID();
//        int postsID=collections.getPostsID();
//        String reside="collections";
//        Messages messages=alikeMapper.queryMessagesID(reside,userID,postsID);
//        int messagesID=messages.getMessagesID();
//        alikeMapper.deleteMessages(messagesID);
        /******** messages *********/
        return collectionMapper.deleteCollectionById(collections);
    }

    @Override
    public int queryCollection(int postsID,int userID) {
        Collections collections=collectionMapper.queryCollection(postsID,userID);
        System.out.println("1122"+collections);
        if(collections!=null){
            return 1;
        }else{
            return 0;
        }
    }

    @Override
    public int deleteBatchCollections(int postsID, int userID) {
        return collectionMapper.deleteBatchCollections(postsID,userID);
    }

    public int deleteBatchPosts(List<Integer>list){
        for(int i=0;i<list.size();i++){
            List<Comment>list1=commentMapper.queryCommentByPosts(list.get(i));
            collectionMapper.deleteAlikeWrite(list.get(i));
            collectionMapper.deleteCollectionWrite(list.get(i));
            collectionMapper.deleteCommentWrite(list.get(i));
            postsMapper.deletePostsById(list.get(i));
            for(int a=0;a<list1.size();a++){
                Comment comment=list1.get(i);
                commentMapper.deleteReviewsByParentID(comment.getCommentID());
            }
        }
        return 0;
    }

}
