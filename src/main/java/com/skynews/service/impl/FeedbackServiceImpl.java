package com.skynews.service.impl;

import com.skynews.dao.FeedbackMapper;
import com.skynews.pojo.Feedback;
import com.skynews.pojo.Messages;
import com.skynews.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    //service层调dao层：组合dao
    @Autowired
    private FeedbackMapper feedbackMapper;
    public void setFeedbackMapper(FeedbackMapper feedbackMapper){
        this.feedbackMapper=feedbackMapper;
    }

    @Override
    public int addFeedback(Feedback feedback) {
        return feedbackMapper.addFeedback(feedback);
    }

    @Override
    public List<Feedback> queryAllFeedback(int column,int total) {
        return feedbackMapper.queryAllFeedback(column,total);
    }

    /**？int count=vipMapper.queryVaguePagesYXYCount(reside,thing);
     int totalPages;
     int total;
     Map<String,List>map=new HashMap<>();
     if(count%num==0){
     totalPages=count/num;
     }else{
     total=count/num;
     totalPages=total+1;
     }
     List<Integer>list=new LinkedList<>();
     list.add(totalPages);
     map.put("总共的页数",list);
     List<Integer>list1=new LinkedList<>();
     list1.add(count);
     map.put("总条数",list1);
     int thePage=(page-1)*num;
     List<Posts>list2=vipMapper.queryVaguePagesYXY(reside,thing,thePage,num);
     map.put("分页模糊查询帖子",list2);
     return map;*/

    @Override
    public List<Feedback> queryUserFeedback(int userID) {
        return feedbackMapper.queryUserFeedback(userID);
    }

    @Override
    public int addManagerFeedback(String managerContent,int feedbackID) {
        feedbackMapper.updateManagerToToOne(feedbackID);
        feedbackMapper.updateManagerToOne(feedbackID);
        return feedbackMapper.addManagerFeedback(managerContent,feedbackID);
    }

    @Override
    public int updateUserToOne(int feedbackID) {
        return feedbackMapper.updateUserToOne(feedbackID);
    }

    @Override
    public int queryManagerToUser(int feedbackID) {
        List<Feedback>list=feedbackMapper.queryManagerToUser(feedbackID);
        //userOr为1则是用户已经查看过管理员回复，而sql语句是验证是否为1
        //如果集合为空则证明用户未查看管理员回复
        if(list.isEmpty()){
            return 0;
        }else{
            return 1;
        }
    }

    @Override
    public int queryFeedbackCount() {
        return feedbackMapper.queryFeedbackCount();
    }

    @Override
    public int deleteFeedback(int feedbackID) {
        return feedbackMapper.deleteFeedback(feedbackID);
    }

    @Override
    public List<Feedback> queryManagerOrFeedback() {
        return feedbackMapper.queryManagerOrFeedback();
    }

    @Override
    public Map<String, List> queryFeedbackBetter(int page, int num) {
        int count=feedbackMapper.queryFeedbackCount();
        int totalPages;
        int total;
        Map<String,List> map=new HashMap<>();
        if(count%num==0){
            totalPages=count/num;
        }else{
            total=count/num;
            totalPages=total+1;
        }
        List<Integer>list=new LinkedList<>();
        list.add(totalPages);
        map.put("总共的页数",list);
        List<Integer>list1=new LinkedList<>();
        list1.add(count);
        map.put("总条数",list1);
        int thePage=(page-1)*num;
        List<Feedback>list2=feedbackMapper.queryAllFeedback(thePage,num);
        map.put("查询信息",list2);
        return map;
    }
}
