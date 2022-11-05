package com.skynews.dao;
import com.skynews.pojo.Manager;
import com.skynews.pojo.Posts;
import com.skynews.pojo.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManagerMapper {

    //添加用户
    int addUser(User user);

    //删除用户
    int deleteUserById(@Param("userID") int userID);

    //删除注销用户发布的帖子
    int deletePostsByUser(int reside);

    //删除注销用户的收藏
    int deleteCollectionByUser(int userID);

    //修改用户
    int updateUser(User user);

    //查询用户
    User queryUserById(@Param("userID") int UserID);

    //查询所有用户
    List<User> queryAllUser();

    //管理员登录
    Manager select(String managerName);

    //根据名字模糊查询用户
    List<User> queryVagueUser(String thing);

    //根据名字查询用户
    User queryUserByName(String username);

    //通过分页查询用户
    List<User> queryPagingUser(@Param("column") int column,@Param("total") int total);

    //返回user表里面的用户个数
    int queryUserCount();

    //删除focus表里面的用户（关注）
    int deleteFocus(int focusID);

    //删除focus表里面的用户（粉丝）
    int deleteFans(int fansID);

    //通过用户id返回其发布的所有帖子id
    List<Posts> queryPostsID(int reside);

    //根据帖子id删除收藏表里面的帖子
    int deleteCollectionByPostsID(int postsID);

    //添加manager
    int addManager(Manager manager);

    //根据名字查询manager
    Manager queryManagerByName(String managerName);

    //根据makerID删除comment
    int deleteCommentByMakerID(int makerID);

    //根据makerID删除reviews
    int deleteReviewsByMakerID(int makerID);

    //根据authorID删除messages
    int deleteMessagesByAuthorID(int authorID);
}

