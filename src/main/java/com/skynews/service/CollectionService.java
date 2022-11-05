package com.skynews.service;

import com.skynews.pojo.Collections;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface CollectionService {
    //收藏（添加）
    int addCollection(Collections collections);

    //展示某个用户下的所有收藏
    List<Collections> queryCollectionByUserID(int userID);

    //用户取消收藏（删除）
    int deleteCollectionById(Collections collections);

    //判断该用户是否已经收藏过此帖子
    int queryCollection(int postsID,int userID);

    //批量删除所收藏帖子
    int deleteBatchCollections(int postsID,int userID);

    //批量删除帖子
    int deleteBatchPosts(List<Integer>list);
}
