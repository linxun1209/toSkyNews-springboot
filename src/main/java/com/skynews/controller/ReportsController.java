package com.skynews.controller;


import com.skynews.pojo.Reports;
import com.skynews.service.ReportsService;
import com.skynews.utils.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.util.StringUtils;

import java.util.List;

@Api(tags="举报帖子类")
@Controller
@CrossOrigin
public class ReportsController {
    @Autowired
    private ReportsService reportsService;
    @ApiOperation(value = "添加举报", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/addReport")
    @ResponseBody
//    @ApiImplicitParams({
//            @ApiImplicitParam(name="kind",value = "举报类型"),
//            @ApiImplicitParam(name="contact",value = "联系方式"),
//            @ApiImplicitParam(name="opinion",value = "举报原因"),
//            @ApiImplicitParam(name="times",value = "用户反馈时间")
//    })
    public Response addReport(String kind, String contact, String opinion, Integer userID,Integer postsID,String times)  {
//        if (StringUtils.isEmpty(kind) || StringUtils.isEmpty(contact)||StringUtils.isEmpty(opinion)||StringUtils.isEmpty(String.valueOf(userID))||StringUtils.isEmpty(String.valueOf(postsID))||StringUtils.isEmpty(times)){
//            throw new CustomException("类型不能为空");
//        }
//
//        if (StringUtils.startsWith(kind," ") || StringUtils.startsWith(contact," ")|| StringUtils.startsWith(opinion," ")||StringUtils.startsWith(userID," ")||StringUtils.startsWith(postsID," ")|| StringUtils.startsWith(times," ")){
//            throw new CustomException("类型不能有空位");
//        }

//        if (kind == null||userID==null){
//            throw new CustomException("类型为空！");
//        }
        Reports reports=new Reports(kind,contact,opinion,userID,postsID,times);
        reportsService.addReport(reports);
        return Response.ok("尊敬的用户,我们已经收到你的举报！");
    }
    @ApiOperation(value = "查询所有举报帖子", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/showReports")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="column",value = "从第几条数据开始查询"),
            @ApiImplicitParam(name="total",value = "查询数量")
    })
    public List<Reports> showReports(Integer column, Integer total) {
//        if(StringUtils.isEmpty(String.valueOf(column))||StringUtils.isEmpty(String.valueOf(total))){
//            throw new CustomException("类型为空！");
//        }
//        if(StringUtils.startsWith(column," ")||StringUtils.startsWith(total," ")){
//            throw new CustomException("类型存在空值");
//        }
//        if(column==null || total==null){
//            throw new CustomException("类型为空！");
//        }
        List<Reports>list=reportsService.showReports(column,total);
        return list;
    }
    @ApiOperation(value = "查询所有举报数量(返回一共多少条举报)", notes = "获取地址", httpMethod = "GET")
    @GetMapping("/ReportsCount")
    @ResponseBody
    public int ReportsCount(){
        return reportsService.ReportsCount();
    }
    @ApiOperation(value = "展示个人举报文章", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/showPortsById")
    @ResponseBody
    @ApiImplicitParam(name="userID",value = "举报的用户id")
    public List<Reports> showPortsById(Integer userID){
//        if(userID==null){
//            throw new CustomException("类型为空！");
//        }
        List<Reports>list= reportsService.showPortsById(userID);
        return list;
    }
    //管理员查询所有被举报且管理员已经审核通过的的帖子，也就是status为1的帖子
    @ApiOperation(value = " 管理员查询所有被举报且管理员已经审核通过的的帖子，也就是status为1的帖子", notes = "获取地址", httpMethod = "GET")
    @GetMapping("/passReports")
    @ResponseBody
    public List<Reports> passReports(){
        List <Reports> list2= reportsService.passReports();
        return list2;
    }
    //管理员查询所有被举报的的帖子，也就是status为0的帖子
    @ApiOperation(value = "管理员查询所有被举报的的帖子，也就是status为0的帖子", notes = "获取地址", httpMethod = "GET")
    @GetMapping("/downReports")
    @ResponseBody
    public List<Reports> downReports (){
        List<Reports> reports = reportsService.downReports();
        System.out.println(reports);
        List <Reports> list3= reports;
        return list3;
    }
    //管理员查询所有被举报且管理员已经审核通过的的帖子，也就是status为-1的帖子
    @ApiOperation(value = "管理员查询所有被举报的的帖子，也就是status为-1的帖子", notes = "获取地址", httpMethod = "GET")
    @GetMapping("/disPassReports")
    @ResponseBody
    public List<Reports> disPassReports (){
        List<Reports> reports = reportsService.disPassReports();
        System.out.println(reports);
        List <Reports> list4= reports;
        return list4;
    }
    //对帖子进行审核,审核通过
    @ApiOperation(value = "对举报的帖子进行审核,且审核通过", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/savePassPosts")
    @ResponseBody
    @ApiImplicitParam(name="postsID",value = "帖子ID")
    public Response savePassPosts(Integer postsID) {
//        if(postsID==null){
//            throw new CustomException("类型为空！");
//        }
//        if(StringUtils.startsWith(postsID," ")){
//            throw new CustomException("类型存在空值");
//        }
        int i = reportsService.savePassPorts(postsID);
        if(i==0){
            return Response.error("该帖子id不存在");
        }
        return Response.ok("审核通过！");
    }
    //对帖子进行审核,且未通过
    @ApiOperation(value = "对举报的帖子进行审核,且审核未通过", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/disSavePassPosts")
    @ResponseBody
    @ApiImplicitParam(name="postsID",value = "帖子ID")
    public Response disSavePassPosts(Integer postsID) {
//        if(postsID==null){
//            throw new CustomException("类型为空！");
//        }
//        if(StringUtils.startsWith(postsID," ")){
//            throw new CustomException("类型为空值");
//        }
        int i = reportsService.disSavePassPorts(postsID);
        if(i==0){
            return Response.error("该帖子id不存在");
        }
        return Response.ok("审核通过！");
    }
    @ApiOperation(value = "删除指定举报", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/deleteReports")
    @ResponseBody
//    @ApiImplicitParam(name="reportID",value = "举报ID")
    public Response deleteReports(Integer reportID)  {
//        if(reportID==null){
//            throw new CustomException("类型为空！");
//        }
        int i = reportsService.deleteReports(reportID);
        if(i==0){
            return Response.error("该举报的id不存在");
        }
        return Response.ok("删除成功！");
    }
}
