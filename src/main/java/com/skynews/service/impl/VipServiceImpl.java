package com.skynews.service.impl;

import com.skynews.dao.VipMapper;
import com.skynews.pojo.Picture;
import com.skynews.pojo.Posts;
import com.skynews.pojo.User;
import com.skynews.pojo.Vip;
import com.skynews.service.VipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.*;

@Transactional
@Service
public class VipServiceImpl implements VipService {
    //service调dao层：组合Dao
    @Autowired
    private VipMapper vipMapper;
    public void setVipMapper(VipMapper vipMapper) {
        this.vipMapper = vipMapper;
    }


    @Override
    public int addVip(int userID) {
        Date date = new Date();
        /**
         * 创建格式化时间日期类
         *构造入参String类型就是我们想要转换成的时间形式
         */
        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("格式化后的时间------->"+format.format(date));
        Vip vip=new Vip(userID,format.format(date));
        return vipMapper.addVip(vip);
    }

    @Override
    public List<Vip> queryAllVip() {
        return vipMapper.queryAllVip();
    }

    @Override
    public int deleteVip(int userID) {
        return vipMapper.deleteVip(userID);
    }

    @Override
    public Map<String, List> overAllPicture(String thing) {
        List<Posts>posts=vipMapper.overAllPosts(thing);
        List<User>users=vipMapper.overAllUser(thing);
        List<Picture>pictures=vipMapper.overAllPicture(thing);
        Map<String,List>map=new HashMap<>();
        map.put("posts",posts);
        map.put("user",users);
        map.put("pictures",pictures);
        return map;
    }

    @Override
    public int judgeVip(int userID) {
        Vip vip=vipMapper.judgeVip(userID);
 //       System.out.println("1111111"+vip);
        if(vip!=null){
            return 1;
        }else{
            return 0;
        }
    }

    @Override
    public Vip test(int userID, String times) {
        return vipMapper.test(userID,times);
    }

    @Override
    public int queryStatusNoTwo() {
        return vipMapper.queryStatusNoTwo();
    }

    @Override
    public List<Posts> queryStatusOneN(int count) {
        return vipMapper.queryStatusOneN(count);
    }

    @Override
    public Map<String,List> queryVaguePagesYXY(int reside, String thing,int page, int num) {
        int count=vipMapper.queryVaguePagesYXYCount(reside,thing);
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
        return map;
    }
}

