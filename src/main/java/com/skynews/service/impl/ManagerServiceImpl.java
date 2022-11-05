package com.skynews.service.impl;

import com.skynews.dao.ManagerMapper;
import com.skynews.pojo.Manager;
import com.skynews.pojo.Posts;
import com.skynews.pojo.User;
import com.skynews.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagerServiceImpl implements ManagerService {

    //service层调dao层：组合dao
    @Autowired
    private ManagerMapper managerMapper;
    public void setManagerMapper(ManagerMapper managerMapper){
        this.managerMapper=managerMapper;
    }

    @Override
    public int addUser(User user) {
        return managerMapper.addUser(user);
    }

    /*****************************/
    @Override
    public int deleteUserById(int userID) {
        List<Posts>list= managerMapper.queryPostsID(userID);
        for(int i=0;i<list.size();i++){
            Posts posts=list.get(i);
            managerMapper.deleteCollectionByPostsID(posts.getPostsID());
        }
        managerMapper.deleteCommentByMakerID(userID);
        managerMapper.deleteReviewsByMakerID(userID);
        managerMapper.deleteMessagesByAuthorID(userID);
        managerMapper.deleteFans(userID);
        managerMapper.deleteFocus(userID);
        managerMapper.deleteCollectionByUser(userID);
        managerMapper.deletePostsByUser(userID);
        return managerMapper.deleteUserById(userID);
    }

    /*****************************/
    @Override
    public int updateUser(User user) {
//        String username=user.getUsername();
//        User user1=managerMapper.queryUserByName(username);
//        if(user1!=null){
//            return 0;
//        }else{
//            managerMapper.updateUser(user);
//            return 1;
//        }
        return managerMapper.updateUser(user);
    }

    @Override
    public User queryUserById(int userID) {
        User user=null;
        User user1=managerMapper.queryUserById(userID);
        if(user1!=null){
            user=user1;
        }
        return user;
    }

    @Override
    public List<User> queryAllUser() {
        return managerMapper.queryAllUser();
    }

    //管理员登录
    @Override
    public Manager sign(String managerName, String password) {
        Manager manager=null;
        Manager temp=managerMapper.select(managerName);
        if(temp!=null){
            if(temp.getPassword().equals(password)){
                manager=temp;
            }
        }
        return manager;
    }
    @Override
    public List<User> queryVagueUser(String thing) {
        List<User>list=managerMapper.queryVagueUser(thing);
        return list;
    }
    @Override
    public User queryUserByName(String username) {
        return managerMapper.queryUserByName(username);
    }
    @Override
    public List<User> queryPagingUser(int column, int total) {
        return managerMapper.queryPagingUser(column,total);
    }
    @Override
    public int queryUserCount() {
        return managerMapper.queryUserCount();
    }
    @Override
    public List<Posts> queryPostsID(int reside) {
        return managerMapper.queryPostsID(reside);
    }

    @Override
    public int addManager(Manager manager) {
        return managerMapper.addManager(manager);
    }

    @Override
    public Manager queryManagerByName(String managerName) {
        return managerMapper.queryManagerByName(managerName);
    }


}