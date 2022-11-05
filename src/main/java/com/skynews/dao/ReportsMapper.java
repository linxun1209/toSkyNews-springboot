package com.skynews.dao;
import com.skynews.pojo.Reports;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ReportsMapper {
//添加举报
    int addReport(Reports reports);

//    管理员查询所有举报内容
    List<Reports> showReports(@Param("column") int column, @Param("total") int total);

    //查询所有举报数量(返回一共多少条举报)
    int ReportsCount();

    //展示个人举报
    List<Reports> showPortsById(int userID);

    //管理员查询所有被举报的的帖子，也就是status为0的帖子
    List<Reports> downReports();

    //管理员查询所有被举报且管理员已经审核通过的的帖子，也就是status为1的帖子
    List<Reports> passReports();

    //管理员查询所有被举报且管理员已经审核每页通过的的帖子，也就是status为-1的帖子
    List<Reports> disPassReports();

//    对进行举报的帖子进行审核(审核通过)
    int savePassPosts(int postsID);

    //    对进行举报的帖子进行审核(审核未通过)
    int disSavePassPosts(int postsID);
    //删除指定举报
    int deleteReports(int reportID);



//    //展示用户举报的帖子名
//    List<Reports> queryUserReports(int userID);
//    //管理员反馈->管理员反馈managerOr-》1
//    int reportsManagerToOne(int feedbackID);
//    //管理员反馈->用户未接收到反馈userOr-》-1
//    int updateManagerToToOne(int feedbackID);
}
