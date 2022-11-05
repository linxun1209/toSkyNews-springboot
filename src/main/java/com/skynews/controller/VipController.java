package com.skynews.controller;


import com.skynews.pojo.Posts;
import com.skynews.pojo.Vip;
import com.skynews.service.VipService;
import com.skynews.utils.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Api(tags="VIP类")
@Controller
@CrossOrigin
@RequestMapping("/vip")
public class VipController {
    @Autowired
    private VipService vipService;

    @ApiOperation(value = "成为VIP", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/addVIP")
    @ResponseBody
    @ApiImplicitParam(name="userID",value = "用户id")
    public Response addVIP(int userID) {
        vipService.addVip(userID);
        return Response.ok("恭喜您成为VIP！");
    }

    @ApiOperation(value = "查询所有的VIP用户", notes = "获取地址", httpMethod = "GET")
    @GetMapping("/queryAllVip")
    @ResponseBody
    public List<Vip> list(){
        return vipService.queryAllVip();
    }

    @ApiOperation(value = "注销Vip账户", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/deleteVip")
    @ResponseBody
    @ApiImplicitParam(name="userID",value = "用户ID")
    public Response deleteVip(Integer userID)  {
        vipService.deleteVip(userID);
        return Response.ok("删除成功！");
    }

    @ApiOperation(value = "全局搜索图片库+用户+帖子+模糊查询", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAllVague")
    @ResponseBody
    public Response list2(String thing) {
        return Response.ok(vipService.overAllPicture(thing));
    }

    //判断该用户是否为vip用户（即根据用户id查询表中相应数据，判断是否有空值）
    @ApiOperation(value = "判断该用户是否为vip用户（即根据用户id查询表中相应数据，判断是否有空值）", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/judgeVipIs")
    @ResponseBody
    public Response judgeVipI(Integer userID) {
        int vip=vipService.judgeVip(userID);
        if(vip==1){
            return Response.ok("此用户为vip用户！");
        }
        else{
            return Response.error("此用户不是vip用户！");
        }
    }

    /************************************************/
    @ApiOperation(value = "test", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/testSQL")
    @ResponseBody
    public Vip judgeVipI(int userID,String times){
       return vipService.test(userID,times);
    }


    @ApiOperation(value = "返回除了status为-2的文章的个数", notes = "获取地址", httpMethod = "GET")
    @GetMapping("/queryStatusNoTwo")
    @ResponseBody
    public int queryStatusNoTwo(){
        return vipService.queryStatusNoTwo();
    }

    @ApiOperation(value = "返回status为1的文章（n条）", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryStatusOneN")
    @ResponseBody
    public List<Posts> queryStatusOneN(int count) {
        return vipService.queryStatusOneN(count);
    }

    /***************************/
    @ApiOperation(value = "模糊查询某个用户的草稿箱信息（分页）", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryVaguePagesYXY")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="reside",value = "用户id"),
            @ApiImplicitParam(name="thing",value = "模糊查询的片段"),
            @ApiImplicitParam(name="page",value = "第几页"),
            @ApiImplicitParam(name="num",value = "查询数量")
    })
    public Response YXY(int reside,String thing,int page,int num) {
        Map<String,List> map=new HashMap<String, List>();
        if(page<0){
            List<String>list=new LinkedList<>();
            list.add("请输入合理的页数！");
            map.put("error",list);
            return Response.error(map);
        }else{
            map=vipService.queryVaguePagesYXY(reside,thing,page,num);
            return Response.ok(map);
        }
    }
}
