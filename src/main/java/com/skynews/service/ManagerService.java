package com.skynews.service;

import com.skynews.pojo.Manager;
import com.skynews.pojo.Posts;
import com.skynews.pojo.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface ManagerService {
    //添加用户
    int addUser(User user);

    //删除用户
    int deleteUserById(int userID);

    //修改用户
    int updateUser(User user);

    //查询用户
    User queryUserById(int userID);

    //查询所有用户
    List<User> queryAllUser();

    //管理员登录
    public Manager sign(String managerName,String password);

    //根据名字模糊查询用户
    List<User> queryVagueUser(String thing);

    //根据名字查询用户
    User queryUserByName(String username);

    //通过分页查询用户
    List<User> queryPagingUser(@Param("column") int column, @Param("total") int total);

    //返回user表里面的用户个数
    int queryUserCount();

    //通过用户id返回其发布的所有帖子id
    List<Posts> queryPostsID(int reside);

    //添加manager
    int addManager(Manager manager);

    //根据名字查询manager
    Manager queryManagerByName(String managerName);
}
