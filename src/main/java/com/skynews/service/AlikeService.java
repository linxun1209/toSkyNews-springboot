package com.skynews.service;

import com.skynews.pojo.Alike;
import com.skynews.pojo.Messages;
import com.skynews.pojo.User;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface AlikeService {

    //用户点赞（前端输入用户id，帖子id）
    int setAlikeTable(Alike alike);


    //用户取消赞(删除表中的点赞记录)
    int deleteAlikeTable(Alike alike);

    //判断该用户是否已经点赞过此帖子
    int queryAlike(Alike alike);

    //当用户查看此信息之后此信息状态改变
    int updateMessagesStatus(int messagesID);

    //查询某个用户下的所有信息（被收藏或点赞）
    List<Messages> queryAllMessages(int authorID);

    //查询某个用户下的所有信息（被收藏或点赞）
    List<User> queryAllMessagesUser(int userID);

    //删除某条信息
    int deleteMessages(int messagesID);

    //reside=alike userID postsID
    Messages queryMessagesID(String reside,int userID, int postsID);

    //分页查询某个用户下的所有信息（被收藏或点赞）
    List<Messages> queryPagesMessages(int authorID,int page);

    //（数量）某个用户下的所有信息（被收藏或点赞）
    List<Integer> queryMessagesCount(int authorID);

    //批量删除信息
    int deleteBatchMessages(List<Integer>list);

    //删除某个用户下的所有信息
    int deleteAllMessagesByUserID(int userID);
}
