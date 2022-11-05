package com.skynews.service;

import com.skynews.pojo.Posts;
import com.skynews.utils.Response;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface PostsService {
    //查询所有帖子
    List<Posts> queryAllPosts();

    //删除帖子
    int deletePostsById(int postsID);

    //对帖子进行审核
    int auditing(int postsID);
    //对帖子进行审核未通过
    int disAuditing(int postsID);

    //根据用户id查询对应的帖子
    List<Posts> queryPostsByUserID(int reside);

    /********************/
    //模糊查询
    List<Posts> vagueQuery(String thing,int column,int total);

    //模糊查询(返回此片段模糊查询到的条数)
    int queryVagueCountAll(String thing);

    //查询未审核的帖子，也就是status为0的帖子
    List<Posts> pendingPosts();

    /*********************/
    //根据帖子标签查询所有相同标签的帖子(模糊查询)
    List<Posts>querySameLabel(String thing,String label,int column,int total);

    //根据帖子标签查询所有相同标签且审核通过的帖子
    List<Posts>querySameLabelBy(String label,int column,int total);

    //根据帖子标签查询所有相同标签且审核通过的帖子（返回查询到总共的个数）
    int querySameLabelCount(String label);

    //根据帖子标签查询所有相同标签且审核通过的帖子（返回查询到总共的个数)(模糊查询)
    int queryVagueSameLabelCount(String label,String thing);

    //查询所有审核过的帖子，也就是status为1的帖子
    List<Posts> passPosts();

    //用户修改帖子信息
    int updatePosts(Posts posts);

    //模糊查询用户个人作品
    List<Posts> vagueQueryPerson(int reside,String thing);
    //发布帖子
    int addPosts(Posts posts);

    //通过帖子id查询帖子
    Posts queryPostsById(int postsID);

    //用户收藏帖子（即将用户id存collectionID中）
    int collectionPosts(int collectionID,int postsID);

    //展示某一个用户的所有收藏
    List<Posts> showAllCollection(int collectionID);

    //通过分页查询帖子
    List<Posts> queryPaging(int column, int total);

    //帖子浏览量
    int setBrowse(int postsID);

    //点赞数降序查询
    List<Posts> queryAlikeDesc(int column,int total);

    //根据用户id获取用户的所有点赞数
    int querySumAlike(int reside);

    //通过分页查询帖子
    List<Posts> queryPagingPosts(int column,int total);
    //返回posts表里面的帖子个数
    int queryPostsCount();
    //    上传带图片的帖子
    int  upPostImg(Posts posts);
    //用户修改带封面的帖子信息
    int changePosts(Posts posts);
    //    通过文章id查询文章所有信息
    Posts getPost(int postsID);

    List<Posts> findUser();
    List<Posts> getList(int start,int count); //获取用户list
    Integer getTotal(); //获取用户总数
    //    根据帖子id获取对应的帖子信息
    Response getPostByID(int postsID);
}
