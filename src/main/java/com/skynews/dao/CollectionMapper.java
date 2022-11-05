package com.skynews.dao;

import com.skynews.pojo.Collections;
import com.skynews.pojo.Messages;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CollectionMapper {
    //收藏（添加）
    int addCollection(Collections collections);

    //展示某个用户下的所有收藏
    List<Collections> queryCollectionByUserID(int userID);

    //用户取消收藏（删除）
    int deleteCollectionById(Collections collections);

    //判断该用户是否已经收藏过此帖子
    Collections queryCollection(@Param("postsID")int postsID,@Param("userID")int userID);

    //批量删除所收藏帖子
    int deleteBatchCollections(@Param("postsID")int postsID,@Param("userID")int userID);

    //收藏（添加）之后在messages中增加一条数据表示此用户收藏的记录
    int setMessages(Messages messages);

    //删除点赞记录
    int deleteAlikeWrite(int postsID);

    //删除收藏记录
    int deleteCollectionWrite(int postsID);

    //删除评论记录
    int deleteCommentWrite(int postsID);
}
