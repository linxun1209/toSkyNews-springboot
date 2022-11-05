package com.skynews.controller;

import com.skynews.pojo.Feedback;
import com.skynews.service.FeedbackService;
import com.skynews.utils.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

@Api(tags="反馈类")
@Controller
@CrossOrigin
@RequestMapping("/collections")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    /**********************************接口的整合和优化******************************************************/

    @ApiOperation(value = "（整合）添加反馈", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/addFeedbackBetter")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="kind",value = "反馈类型"),
            @ApiImplicitParam(name="contact",value = "联系方式"),
            @ApiImplicitParam(name="opinion",value = "你的意见"),
    })
    public Response addFeedback1(String kind,String contact,String opinion,Integer userID){
        //使用Date创建日期对象
        Date date = new Date();
        /**
         * 创建格式化时间日期类
         *构造入参String类型就是我们想要转换成的时间形式
         */
        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println("格式化后的时间------->"+format.format(date));
        Feedback feedback=new Feedback(kind,contact,opinion,userID,format.format(date));
        feedbackService.addFeedback(feedback);
        return Response.ok("反馈成功！");
    }

    @ApiOperation(value = "（整合）查询所有反馈", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAllFeedbackBetter")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="page",value = "查询的页数"),
            @ApiImplicitParam(name="num",value = "查询数量")
    })
    public Map<String,List> map(int page,int num) {
        Map<String,List>map=new HashMap<>();
        List<String>error=new LinkedList<>();
        if(page<0){
            error.add("请输入合理的页数！");
            map.put("error",error);
            return map;
        }else{
            return feedbackService.queryFeedbackBetter(page,num);
        }
    }

    /****************************************************************************************/
    @ApiOperation(value = "添加反馈", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/addFeedback")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="kind",value = "反馈类型"),
            @ApiImplicitParam(name="contact",value = "联系方式"),
            @ApiImplicitParam(name="opinion",value = "你的意见"),
            @ApiImplicitParam(name="times",value = "用户反馈时间")
    })
    public Response addFeedback(String kind,String contact,String opinion,Integer userID,String times){
        Feedback feedback=new Feedback(kind,contact,opinion,userID,times);
        feedbackService.addFeedback(feedback);
        return Response.ok("反馈成功！");
    }

    @ApiOperation(value = "查询所有反馈", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAllFeedback")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="column",value = "从第几条数据开始查询"),
            @ApiImplicitParam(name="total",value = "查询数量")
    })
    public List<Feedback> list(Integer column,Integer total) {
        List<Feedback>list=feedbackService.queryAllFeedback(column,total);
        return list;
    }

    @ApiOperation(value = "查询所有反馈(返回一共多少条反馈)", notes = "获取地址", httpMethod = "GET")
    @GetMapping("/queryFeedbackCount")
    @ResponseBody
    public int queryFeedback(){
        return feedbackService.queryFeedbackCount();
    }

    @ApiOperation(value = "展示个人反馈", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryUserFeedback")
    @ResponseBody
    @ApiImplicitParam(name="userID",value = "反馈的用户id")
    public List<Feedback> list1(Integer userID){
        List<Feedback>list=feedbackService.queryUserFeedback(userID);
        return list;
    }

    @ApiOperation(value = "管理员针对用户的反馈作出反馈", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/updateUserToOne")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="managerContent",value = "管理员反馈内容"),
            @ApiImplicitParam(name="feedbackID",value = "反馈id")
    })
    public Response addManagerFeedback(String managerContent,Integer feedbackID){
        feedbackService.addManagerFeedback(managerContent,feedbackID);
        return Response.ok("管理员回复成功！");
    }

    @ApiOperation(value = "用户查看管理员反馈-》用户接收到反馈userOr-》1", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/updateUserOr")
    @ResponseBody
    @ApiImplicitParam(name="feedbackID",value = "反馈id")
    public Response updateUserToOne(Integer feedbackID) {
        feedbackService.updateUserToOne(feedbackID);
        return Response.ok("用户查看管理员反馈成功！");
    }

    @ApiOperation(value = "用户是否已经查看管理员回复", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryManagerToU")
    @ResponseBody
    @ApiImplicitParam(name="feedbackID",value = "反馈id")
    public Response queryManagerToUser(Integer feedbackID){
        int a=feedbackService.queryManagerToUser(feedbackID);
        if(a==0){
            return Response.error("该用户未查看管理员回复！");
        }else {
            return Response.ok("该用户已经查看管理员回复！");
        }
    }

    @ApiOperation(value = "删除指定反馈", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/deleteFeedback")
    @ResponseBody
    @ApiImplicitParam(name="feedbackID",value = "反馈ID")
    public Response deleteFeedback(Integer feedbackID){
        feedbackService.deleteFeedback(feedbackID);
        return Response.ok("删除成功！");
    }

    @ApiOperation(value = "查询所有管理员未回复的反馈", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryManagerOrFeedback")
    @ResponseBody
    public List<Feedback> queryManFeedback(){
        List<Feedback>list=feedbackService.queryManagerOrFeedback();
      return list;
    }
}
