package com.skynews.service;

import com.skynews.pojo.Feedback;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

public interface FeedbackService {

    //添加反馈
    int addFeedback(Feedback feedback);

    //查询所有反馈
    List<Feedback> queryAllFeedback(int column,int total);

    //展示个人反馈
    List<Feedback>queryUserFeedback(int userID);

    //管理员针对用户的反馈作出反馈
    int addManagerFeedback(String managerContent,int feedbackID);

    //用户查看管理员反馈-》用户接收到反馈userOr-》1
    int updateUserToOne(int feedbackID);

    ///用户是否已经查看管理员回复
    int queryManagerToUser(int feedbackID);

    //查询所有反馈(返回一共多少条反馈)
    int queryFeedbackCount();

    //删除指定反馈
    int deleteFeedback(int feedbackID);

    //查询所有管理员未回复的反馈
    List<Feedback> queryManagerOrFeedback();

    //（整合和优化）查询所有反馈（分页查询）
    Map<String,List> queryFeedbackBetter(int page, int num);
}
