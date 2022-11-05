package com.skynews.dao;

import com.skynews.pojo.Alike;
import com.skynews.pojo.Messages;
import com.skynews.pojo.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface AlikeMapper {
    //用户点赞
    int setAlike(int postsID);

    //用户点赞（前端输入用户id，帖子id）
    int setAlikeTable(Alike alike);

    //用户取消赞
    int deleteAlike(int postsID);

    //用户取消赞(删除表中的点赞记录)
    int deleteAlikeTable(Alike alike);

    //判断该用户是否已经点赞过此帖子
    Alike queryAlike(Alike alike);

    //用户点赞（前端输入用户id，帖子id）之后在messages中增加一条数据表示此用户点赞的记录
    int setMessages(Messages messages);

    //当用户查看此信息之后此信息状态改变
    int updateMessagesStatus(int messagesID);

    //查询某个用户下的所有信息（被收藏或点赞）
    List<Messages> queryAllMessages(int authorID);

    //查询某个用户下的所有信息（被收藏或点赞）
    List<User> queryAllMessagesUser(int userID);

    //删除某条信息
    int deleteMessages(int messagesID);

    //reside=alike userID postsID
    Messages queryMessagesID(@Param("reside") String reside,@Param("userID") int userID,@Param("postsID") int postsID);

    //分页查询某个用户下的所有信息（被收藏或点赞）
    List<Messages> queryPagesMessages(@Param("authorID") int authorID,@Param("page") int page);

    //（数量）某个用户下的所有信息（被收藏或点赞）
    int queryMessagesCount(int authorID);

    //根据reside，userID，postsID，查询指定信息
    List<Messages> queryOneMessages(@Param("reside") String reside,@Param("userID") int userID,@Param("postsID") int postsID);

    //通过id修改某条信息
    int updateMessages(@Param("times") String times,@Param("messagesID") int messagesID);

    //批量删除信息
    int deleteBatchMessages(int messagesID);

    //删除某个用户下的所有信息
    int deleteAllMessagesByUserID(int userID);
}
