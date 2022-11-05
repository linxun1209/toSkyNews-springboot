package com.skynews.controller;

import com.skynews.pojo.Alike;
import com.skynews.pojo.Messages;
import com.skynews.pojo.User;
import com.skynews.service.AlikeService;
import com.skynews.utils.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Api(tags="点赞类")
@Controller
@CrossOrigin
@RequestMapping("/alike")
public class AlikeController {
    @Autowired
    private AlikeService alikeService;

    /**待注接口*/
    @ApiOperation(value = "用户点赞", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/setAlike")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name = "postsID", value = "被点赞帖子ID"),
            @ApiImplicitParam(name = "userID", value = "所点赞用户ID"),
    })
    public Response setAlike(int postsID,int userID){
        Alike alike = new Alike(postsID, userID);
        alikeService.setAlikeTable(alike);
        return Response.ok("点赞成功！");
    }

    /**待注接口*/
    @ApiOperation(value = "用户取消点赞", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/deleteAlike")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name = "postsID", value = "被点赞帖子ID"),
            @ApiImplicitParam(name = "userID", value = "所点赞用户ID"),
    })
    public Response deleteAlike(Integer postsID, Integer userID) {
        Alike alike = new Alike(postsID, userID);
        int a = alikeService.deleteAlikeTable(alike);
        if (a == 1) {
            return Response.ok("取消点赞成功！");
        } else {
            return Response.error("取消点赞失败！该用户未给此帖点过赞！");
        }
    }

    /*******用户点赞和取消点赞的整合**********/
    @ApiOperation(value = "用户（点赞）取消点赞", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/setOrDeleteAlike")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name = "thing", value = "选择（点赞输入1，取消输入-1）"),
            @ApiImplicitParam(name = "postsID", value = "被点赞帖子ID"),
            @ApiImplicitParam(name = "userID", value = "所点赞用户ID"),
    })
    public Response deleteAlike(Integer postsID, Integer userID,String thing) {
        Alike alike = new Alike(postsID, userID);
        if(thing.equals("1")){
            alikeService.setAlikeTable(alike);
            return Response.ok("点赞成功！");
        }else {
            int a = alikeService.deleteAlikeTable(alike);
            if (a == 1) {
                return Response.ok("取消点赞成功！");
            } else {
                return Response.error("取消点赞失败！该用户未给此帖点过赞！");
            }
        }
    }


    @ApiOperation(value = "判断该用户是否已经点赞过此帖子", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAlikeBoolean")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name = "postsID", value = "所点赞帖子ID"),
            @ApiImplicitParam(name = "userID", value = "所点赞用户ID"),
    })
    public Response queryAlikeBoolean(int postsID, int userID) {
        Alike alike = new Alike(postsID, userID);
        int a = alikeService.queryAlike(alike);
        if (a == 1) {
            return Response.error("该帖已被此用户点赞过！");
        } else {
            return Response.ok("该帖未被此用户点赞过！");
        }
    }

    @ApiOperation(value = "当用户查看此信息之后此信息状态改变", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/updateMessagesStatus")
    @ResponseBody
    @ApiImplicitParam(name = "messagesID", value = "信息id")
    public Response update1(Integer messagesID) {
        alikeService.updateMessagesStatus(messagesID);
        return Response.ok("用户已查看此信息！");
    }

    @ApiOperation(value = "查询某个用户下的所有信息（被收藏或点赞）", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAllMessages")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorID", value = "所要查询的某个用户的id"),
    })
    public List<Messages> update5(Integer authorID) {
        return alikeService.queryAllMessages(authorID);
    }

    @ApiOperation(value = "查询某个用户下的所有信息（收藏或点赞自己的用户信息）", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryAllMessagesUser")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userID", value = "所要查询的某个用户的id"),
    })
    public List<User> update2(Integer userID) {
        return alikeService.queryAllMessagesUser(userID);
    }

    @ApiOperation(value = "删除某条信息", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/deleteMessages")
    @ResponseBody
    @ApiImplicitParam(name = "messagesID", value = "信息id")
    public Response update3(Integer messagesID){
        alikeService.deleteMessages(messagesID);
        return Response.ok("删除成功！");
    }


    /*************************/


    @ApiOperation(value = "分页查询某个用户下的所有信息（被收藏或点赞)", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryMessagesPages")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorID", value = "所要查询的某个用户的id"),
            @ApiImplicitParam(name = "page", value = "第几页")
    })
    public Response update6(Integer authorID,Integer page) {
        Map<String, List>map=new HashMap<>();
        if(page<1){
            List<String>list2=new LinkedList<>();
            list2.add("请输入合理的页数！");
            map.put("error",list2);
            return Response.ok(map);
        }else {
            List<Messages> list = alikeService.queryPagesMessages(authorID, page);
            List<Integer> list1 = alikeService.queryMessagesCount(authorID);
            map.put("totalPages", list1);
            map.put("list", list);
            return Response.ok(map);
        }
    }

    @ApiOperation(value = "用户批量删除信息", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/deleteBatchMessages")
    @ResponseBody
    public Response deleteBatchPosts(@RequestParam("List<Integer>list") List<Integer>list){
        if(list.isEmpty()){
            return Response.error("输入错误！");
        }
        else{
            alikeService.deleteBatchMessages(list);
            return Response.ok("批量删除成功！");
        }
    }

    @ApiOperation(value = "删除某个用户下的所有信息", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/deleteAllMessagesByUserID")
    @ResponseBody
    @ApiImplicitParam(name = "userID", value = "待删除的用户id")
    public Response update8(Integer userID){
        alikeService.deleteAllMessagesByUserID(userID);
        return Response.ok("删除成功！");
    }
}
