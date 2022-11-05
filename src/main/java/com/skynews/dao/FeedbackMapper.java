package com.skynews.dao;

import com.skynews.pojo.Feedback;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FeedbackMapper {

    //添加反馈
    int addFeedback(Feedback feedback);

    //查询所有反馈
    List<Feedback> queryAllFeedback(@Param("column") int column, @Param("total") int total);

    //查询所有反馈(返回一共多少条反馈)
    int queryFeedbackCount();

    //展示个人反馈
    List<Feedback>queryUserFeedback(int userID);

    //管理员针对用户的反馈作出反馈
    int addManagerFeedback(@Param("managerContent") String managerContent,@Param("feedbackID") int feedbackID);

    //管理员反馈->管理员反馈managerOr-》1
    int updateManagerToOne(int feedbackID);

    //管理员反馈->用户未接收到反馈userOr-》-1
    int updateManagerToToOne(int feedbackID);

    //用户查看管理员反馈-》用户接收到反馈userOr-》1
    int updateUserToOne(int feedbackID);

    //用户是否已经查看管理员回复
    List<Feedback>queryManagerToUser(@Param("feedbackID") int feedbackID);

    //删除指定反馈
    int deleteFeedback(int feedbackID);

    //查询所有管理员未回复的反馈
    List<Feedback> queryManagerOrFeedback();
}
