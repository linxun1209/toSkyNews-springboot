package com.skynews.dao;

import com.skynews.pojo.Picture;
import com.skynews.pojo.Posts;
import com.skynews.pojo.User;
import com.skynews.pojo.Vip;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VipMapper {
    //成为vip
    int addVip(Vip vip);

    //展示所有的vip
    List<Vip> queryAllVip();

    //删除vip用户
    int deleteVip(int userID);

    //全局搜索帖子+模糊查询
    List<Posts> overAllPosts(String thing);

    //全局搜索用户+模糊查询
    List<User> overAllUser(String thing);

    //全局搜索图片库+模糊查询
    List<Picture> overAllPicture(String thing);

    //判断该用户是否为vip用户（即根据用户id查询表中相应数据，判断是否有空值）
    Vip judgeVip(int userID);

    //test
    Vip test(@Param("userID")int userID,@Param("times")String times);

    //返回除了status为-2的文章的个数
    int queryStatusNoTwo();

    //返回status为1的文章（n条）
    List<Posts> queryStatusOneN(int count);

    //模糊查询某个用户的草稿箱信息（分页）
    List<Posts>queryVaguePagesYXY(@Param("reside") int reside,@Param("thing") String thing,@Param("page") int page,@Param("num") int num);

    //{count}模糊查询某个用户的草稿箱信息（分页）
    int queryVaguePagesYXYCount(@Param("reside") int reside,@Param("thing") String thing);
}
