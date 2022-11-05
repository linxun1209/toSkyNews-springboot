package com.skynews.controller;


import com.skynews.pojo.Collections;
import com.skynews.service.CollectionService;
import com.skynews.service.PostsService;
import com.skynews.utils.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags="收藏类")
@Controller
@CrossOrigin
@RequestMapping("/collections")
public class CollectionController {
    @Autowired
    private CollectionService collectionService;

    @Autowired
    private PostsService postsService;

/****整合接口*****/
    @ApiOperation(value = "用户收藏或取消收藏（删除）", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/deleteCollectionBoolean")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="thing",value = "收藏填1，取消收藏填-1"),
            @ApiImplicitParam(name="postsID",value = "所收藏帖子ID"),
            @ApiImplicitParam(name="userID",value = "所收藏用户ID"),
    })
    public Response deleteCollectionsBoolean(String thing,int postsID, int userID) {
        Collections collections=new Collections(postsID,userID);
        if(thing.equals("1")){
            int a=collectionService.addCollection(collections);
            if(a==1){
                return Response.ok("收藏成功！");
            }else{
                return Response.error("此用户已收藏过此帖子！");
            }
        }else {
            collectionService.deleteCollectionById(collections);
            return Response.ok("取消收藏成功！");
        }
    }

    /**待注**/
    @ApiOperation(value = "收藏(添加)", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/addCollection")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="postsID",value = "所收藏帖子ID"),
            @ApiImplicitParam(name="userID",value = "所收藏用户ID"),
    })

    public Response addCollection(Integer postsID, Integer userID)  {
        Collections collections=new Collections(postsID,userID);
        int a=collectionService.addCollection(collections);
        if(a==1){
            return Response.ok("收藏成功！");
        }else{
            return Response.error("此用户已收藏过此帖子！");
        }
    }

    @ApiOperation(value = "展示某个用户下的所有收藏", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryCollectionByUserID")
    @ResponseBody
    @ApiImplicitParam(name="userID",value = "所要查询的用户ID")
    public List<Collections> list(Integer userID) {
        List <Collections> list=collectionService.queryCollectionByUserID(userID);
        return list;
    }

    /**待注**/
    @ApiOperation(value = "用户取消收藏（删除）", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/deleteCollection")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="postsID",value = "所收藏帖子ID"),
            @ApiImplicitParam(name="userID",value = "所收藏用户ID"),
    })
    public Response deleteCollections(Integer postsID, Integer userID) {
        Collections collections=new Collections(postsID,userID);
        collectionService.deleteCollectionById(collections);
        return Response.ok("取消收藏成功！");
    }

    @ApiOperation(value = "判断该用户是否已经收藏过此帖子", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryCollectionBoolean")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="postsID",value = "所收藏帖子ID"),
            @ApiImplicitParam(name="userID",value = "所收藏用户ID")
    })
    public Response queryCollectionBo(Integer postsID, Integer userID){
        int a=collectionService.queryCollection(postsID,userID);
        System.out.println("controller"+a);
        if(a!=0){
            return Response.error("该帖已被此用户收藏过！");
        }else{
            return Response.ok("该帖未被此用户收藏过！");
        }
    }

    @ApiOperation(value = "用户批量删除所收藏帖子", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/deleteBatchCollection")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="thing",value = "所收藏帖子ID(用逗号（中文字符）隔开)"),
            @ApiImplicitParam(name="userID",value = "所收藏用户ID"),
    })
    public Response deleteBatchCollections(String thing, Integer userID)  {
        String[]strings=thing.split("，");
        int []nums=new int[strings.length];
        for(int i=0;i<strings.length;i++) {
            nums[i]=Integer.parseInt(strings[i]);
        }
        for(int i=0;i<nums.length;i++){
            collectionService.deleteBatchCollections(nums[i],userID);
        }
        return Response.ok("批量删除成功！");
    }

    @ApiOperation(value = "用户批量删除帖子", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/deleteBatchPosts")
    @ResponseBody
    public Response deleteBatchPosts(@RequestParam("List<Integer>list") List<Integer>list){
        if(list.isEmpty()){
            return Response.error("输入错误！");
        }
        else{
            collectionService.deleteBatchPosts(list);
            return Response.ok("批量删除成功！");
        }
    }

}
