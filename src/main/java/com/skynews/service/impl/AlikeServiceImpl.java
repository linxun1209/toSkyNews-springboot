package com.skynews.service.impl;

import com.skynews.dao.AlikeMapper;
import com.skynews.dao.PostsMapper;
import com.skynews.pojo.Alike;
import com.skynews.pojo.Messages;
import com.skynews.pojo.Posts;
import com.skynews.pojo.User;
import com.skynews.service.AlikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Service
public class AlikeServiceImpl implements AlikeService {

    //service层调dao层：组合dao
    @Autowired
    private AlikeMapper alikeMapper;
    public void setAlikeMapper(AlikeMapper alikeMapper){
        this.alikeMapper=alikeMapper;
    }

    @Autowired
    private PostsMapper postsMapper;
    public void setPostsMapper(PostsMapper postsMapper){
        this.postsMapper=postsMapper;
    }

    @Override
    public int setAlikeTable(Alike alike) {
        int postsID=alike.getPostsID();
        alikeMapper.setAlike(postsID);
        /******** messages *********/
        int userID=alike.getUserID();
        String reside="alike";
        Posts posts=postsMapper.getPost(postsID);
  //      System.out.println(posts+"4444444444");
        String postsName=posts.getPostsName();
        int authorID=posts.getReside();
        //使用Date创建日期对象
        Date date = new Date();
        /**
         * 创建格式化时间日期类
         *构造入参String类型就是我们想要转换成的时间形式
         */
        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("格式化后的时间------->"+format.format(date));
        Messages m=alikeMapper.queryMessagesID(reside,userID,postsID);
        if(m!=null) {
            int messagesID=m.getMessagesID();
            alikeMapper.updateMessages(format.format(date),messagesID);
        }else{
            Messages messages = new Messages(reside, postsName, userID, authorID, format.format(date), postsID);
            alikeMapper.setMessages(messages);
        }
        /******** messages *********/
        return alikeMapper.setAlikeTable(alike);
    }

    @Override
    public int deleteAlikeTable(Alike alike) {
        Alike alike1=alikeMapper.queryAlike(alike);
  //      System.out.println("1111111"+alike1);
        if(alike1!=null){
            int postsID=alike.getPostsID();
 //           System.out.println("32222222"+postsID);
            alikeMapper.deleteAlike(postsID);
            alikeMapper.deleteAlikeTable(alike);
            /******** messages *********/
//            int userID=alike.getUserID();
////            System.out.println("11111111"+userID);
//            String reside="alike";
//            Messages messages=alikeMapper.queryMessagesID(reside,userID,postsID);
//            int messagesID=messages.getMessagesID();
// //           System.out.println("2222222"+messagesID);
//            alikeMapper.deleteMessages(messagesID);
            /******** messages *********/
            return 1;
        }else{
            return 0;
        }
    }



    @Override
    public int queryAlike(Alike alike) {
        Alike alike1=alikeMapper.queryAlike(alike);
        if(alike1!=null){
            return 1;
        }else{
            return 0;
        }
    }

    @Override
    public int updateMessagesStatus(int messagesID) {
        return alikeMapper.updateMessagesStatus(messagesID);
    }

    @Override
    public List<Messages> queryAllMessages(int authorID) {
        return alikeMapper.queryAllMessages(authorID);
    }

    @Override
    public List<User> queryAllMessagesUser(int userID) {
        return alikeMapper.queryAllMessagesUser(userID);
    }

    @Override
    public int deleteMessages(int messagesID) {
        return alikeMapper.deleteMessages(messagesID);
    }

    @Override
    public Messages queryMessagesID(String reside, int userID, int postsID) {
        return alikeMapper.queryMessagesID(reside,userID,postsID);
    }

    @Override
    public List<Messages> queryPagesMessages(int authorID, int page) {
//        int count=alikeMapper.queryMessagesCount(authorID);
//        int totalPages;
//        if(count%2==0){
//            totalPages=count/2;
//        }else{
//            totalPages=(count+1)/2;
//        }
        int page1=(page-1)*7;
        List<Messages>list=alikeMapper.queryPagesMessages(authorID,page1);
        return list;

    }

    @Override
    public List<Integer> queryMessagesCount(int authorID) {
        int count=alikeMapper.queryMessagesCount(authorID);
        int totalPages;
        int total;
        if(count%7==0){
            totalPages=count/7;
        }else{
            total=count/7;
            totalPages=total+1;
        }
        List<Integer>list=new LinkedList<>();
        list.add(count);
        list.add(totalPages);
        return list;
    }

    @Override
    public int deleteBatchMessages(List<Integer>list) {
        for(int i=0;i<list.size();i++){
            alikeMapper.deleteBatchMessages(list.get(i));
        }
        return 0;
    }

    @Override
    public int deleteAllMessagesByUserID(int userID) {
        return alikeMapper.deleteAllMessagesByUserID(userID);
    }
}
