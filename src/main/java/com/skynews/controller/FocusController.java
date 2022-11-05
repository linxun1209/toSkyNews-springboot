package com.skynews.controller;


import com.skynews.pojo.Focus;
import com.skynews.service.FocusService;
import com.skynews.utils.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Api(tags="关注粉丝类")
@Controller
@CrossOrigin
@RequestMapping("/focus")
public class FocusController {
    @Autowired
    private FocusService focusService;

    /***************************************整合接口************************************************/

    @ApiOperation(value = "（整合）关注或取消关注某用户", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/addOrDeleteFocus")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="thing",value = "输入1为关注-1为取消关注"),
            @ApiImplicitParam(name="focusID",value = "关注的用户的id"),
            @ApiImplicitParam(name="fansID",value = "粉丝id"),
    })
    public Response addOrDeleteFocus(String thing,Integer focusID,Integer fansID) {
        if(thing.equals("1")){
            if(focusID==fansID){
                return Response.error("用户自己不能关注自己！");
            }else {
                Focus focus = new Focus(focusID, fansID);
                focusService.addFocus(focus);
                return Response.ok("关注成功！");
            }
        }else{
            Focus focus=new Focus(focusID,fansID);
            focusService.deleteFocus(focus);
            return Response.ok("取消关注成功！");
        }
    }


    @ApiOperation(value = "（整合）查询某个用户所有粉丝或关注(分页查询)", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAllFansOrFocusPage")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="thing",value = "查询某个用户所有粉丝输入1查询所有关注输入-1"),
            @ApiImplicitParam(name="ID",value = "对应id"),
            @ApiImplicitParam(name="num",value = "开始查询")
    })
    public Map<String,List> list12(String thing, Integer ID, Integer num) {
        List<Focus> list=new LinkedList<>();
        Map<String,List>map=new HashMap<>();
        List<Integer>list1 =new LinkedList<>();
        int count;
        if(thing.equals("1")){
            list = focusService.queryAllFansPage(ID, num);
            count=focusService.querySumFans(ID);
        }else{
            list = focusService.queryAllFocusPage(ID, num);
            count=focusService.querySumFocus(ID);
        }
        list1.add(count);
        map.put("总数量",list1);
        map.put("查询到的粉丝或关注",list);
        return map;
    }

//    @ApiOperation(value = "（整合）查询某个用户所有粉丝或关注", notes = "获取地址", httpMethod = "POST")
//    @PostMapping("/queryAllFansOrFocus")
//    @ResponseBody
//    @ApiImplicitParams({
//            @ApiImplicitParam(name="ID",value = "对应id"),
//            @ApiImplicitParam(name="thing",value = "查询粉丝输入1，查询关注输入-1"),
//    })
//    public List<Focus>list3(String thing,Integer ID)  {
//        List<Focus> list;
//        if(thing.equals("1")){
//            list = focusService.queryAllFans(ID);
//        }else{
//            list = focusService.queryAllFocus(ID);
//        }
//        return list;
//    }

//    @ApiOperation(value = "（整合）根据用户id获取用户的粉丝数或关注数（数量）", notes = "获取地址", httpMethod = "POST")
//    @PostMapping("/queryAllSumFansOrFocus")
//    @ResponseBody
//    @ApiImplicitParams({
//            @ApiImplicitParam(name="ID",value = "你想要查询的此用户的粉丝数的此用户的id(如果此id不存在则返回0)"),
//            @ApiImplicitParam(name="thing",value = "查询粉丝数输入1，查询关注数输入-1"),
//    })
//    public int queryAllSumFans1(String thing,Integer ID){
//        if(thing.equals("1")){
//            return focusService.querySumFans(ID);
//        }else{
//            return focusService.querySumFocus(ID);
//        }
//    }
    /***********************************************************************************************/


    @ApiOperation(value = "关注某用户", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/addFocus")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="focusID",value = "关注的用户的id"),
            @ApiImplicitParam(name="fansID",value = "粉丝id"),
    })
    public Response addFocus(Integer focusID,Integer fansID) {
        if(focusID==fansID){
            return Response.error("用户自己不能关注自己！");
        }else {
            Focus focus = new Focus(focusID, fansID);
            focusService.addFocus(focus);
            return Response.ok("关注成功！");
        }
    }

    @ApiOperation(value = "取消关注", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/deleteFocus")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="focusID",value = "关注的用户的id"),
            @ApiImplicitParam(name="fansID",value = "粉丝id"),
    })
    public Response deleteFocus(Integer focusID,Integer fansID) {
        Focus focus=new Focus(focusID,fansID);
        focusService.deleteFocus(focus);
        return Response.ok("取消关注成功！");
    }

    @ApiOperation(value = "查询某个用户所有粉丝", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAllFans")
    @ResponseBody
    @ApiImplicitParam(name="focusID",value = "关注的用户的id")
    public List<Focus>list(Integer focusID)  {
        List<Focus>list=focusService.queryAllFans(focusID);
        return list;
    }

    @ApiOperation(value = "查询某个用户所有关注", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAllFocus")
    @ResponseBody
    @ApiImplicitParam(name="fansID",value = "粉丝id")
    public List<Focus>list1(Integer fansID)  {
        List<Focus>list=focusService.queryAllFocus(fansID);
        return list;
    }

    @ApiOperation(value = "判断该用户是否已经关注过另一个用户", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryFocusBoolean")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="focusID",value = "关注的用户的id"),
            @ApiImplicitParam(name="fansID",value = "粉丝id"),
    })
    public Response queryCollectionBoolean(Integer focusID, Integer fansID){
        Focus focus=new Focus(focusID,fansID);
        int a=focusService.queryFocus(focus);
        if(a==1){
            return Response.error("该用户已经关注过此用户！");
        }else {
            return Response.ok("未关注！");
        }
    }

    @ApiOperation(value = "根据用户id获取用户的粉丝数", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAllSumFans")
    @ResponseBody
    @ApiImplicitParam(name="focusID",value = "你想要查询的此用户的粉丝数的此用户的id(如果此id不存在则返回0)")
    public int queryAllSumFans(Integer focusID){
        return focusService.querySumFans(focusID);
    }

    @ApiOperation(value = "根据用户id获取用户的关注数", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAllSumFocus")
    @ResponseBody
    @ApiImplicitParam(name="fansID",value = "你想要查询的此用户的关注数的此用户的id(如果此id不存在则返回0)")
    public int queryAllSumFocus(Integer fansID) {
        return focusService.querySumFocus(fansID);
    }


    @ApiOperation(value = "查询某个用户所有粉丝(分页查询)", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAllFansPage")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="focusID",value = "关注的用户的id"),
            @ApiImplicitParam(name="num",value = "开始查询")
    })
    public List<Focus>list(Integer focusID,Integer num) {
        List<Focus>list=focusService.queryAllFansPage(focusID,num);
        return list;
    }

    @ApiOperation(value = "查询某个用户所有关注(分页查询)", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAllFocusPage")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="fansID",value = "关注的用户的id"),
            @ApiImplicitParam(name="num",value = "开始查询")
    })
    public List<Focus>list1(Integer fansID,Integer num) {
        List<Focus>list=focusService.queryAllFocusPage(fansID,num);
        return list;
    }
}
