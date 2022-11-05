package com.skynews.service.impl;

import com.skynews.dao.ReportsMapper;
import com.skynews.pojo.Reports;
import com.skynews.service.ReportsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportsServiceImpl implements ReportsService {
    @Autowired
    private ReportsMapper reportsMapper;

    public void setReportsMapper(ReportsMapper reportsMapper) {
        this.reportsMapper = reportsMapper;
    }

    @Override
    public int addReport(Reports reports) {
        return reportsMapper.addReport(reports);
    }

    @Override
    public List<Reports> showReports(int column, int total) {
        return reportsMapper.showReports(column,total);
    }

    @Override
    public int ReportsCount() {
        return reportsMapper.ReportsCount();
    }

    @Override
    public List<Reports> showPortsById(int userID) {
        return reportsMapper.showPortsById(userID);
    }

    @Override
    public List<Reports> downReports() {
        return reportsMapper.downReports();
    }

    @Override
    public List<Reports> passReports() {
        return reportsMapper.passReports();
    }

    @Override
    public List<Reports> disPassReports() {
        return reportsMapper.disPassReports();
    }

    @Override
    public int savePassPorts(int postsID) {
        return reportsMapper.savePassPosts(postsID);
    }

    @Override
    public int disSavePassPorts(int postsID) {
        return reportsMapper.disSavePassPosts(postsID);
    }

    @Override
    public int deleteReports(int reportID) {
        return reportsMapper.deleteReports(reportID);
    }

//
//    @Override
//    public int queryReportsCount() {
//        return 0;
//    }
//
//    @Override
//    public List<Reports> queryUserReports(int userID) {
//        return null;
//    }
//
//    @Override
//    public int reportsManagerToOne(int feedbackID) {
//        return 0;
//    }
//
//    @Override
//    public int updateManagerToToOne(int feedbackID) {
//        return 0;
//    }
}
