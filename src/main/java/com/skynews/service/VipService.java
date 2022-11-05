package com.skynews.service;

import com.skynews.pojo.Posts;
import com.skynews.pojo.Vip;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


public interface VipService {
    //成为vip
    int addVip(int userID);

    //展示所有的vip
    List<Vip> queryAllVip();

    //删除vip用户
    int deleteVip(int userID);

    //全局搜索图片库+模糊查询
    Map<String,List> overAllPicture(String thing);

    //判断该用户是否为vip用户（即根据用户id查询表中相应数据，判断是否有空值）
    int judgeVip(int userID);

    //test
    Vip test(int userID,String times);

    //返回除了status为-2的文章的个数
    int queryStatusNoTwo();

    //返回status为1的文章（n条）
    List<Posts> queryStatusOneN(int count);

    //模糊查询某个用户的草稿箱信息（分页）
    Map<String,List>queryVaguePagesYXY(int reside,String thing,int page,int num);
}
