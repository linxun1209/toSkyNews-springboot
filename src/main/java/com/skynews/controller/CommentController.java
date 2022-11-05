package com.skynews.controller;


//import com.skynews.exception.CustomException;


import com.skynews.pojo.Comment;
import com.skynews.pojo.Reviews;
import com.skynews.service.CommentService;
import com.skynews.service.ManagerService;
import com.skynews.utils.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Api(tags="评论类")
@Controller
@CrossOrigin
@RequestMapping("/comments")
public class CommentController {
    //controller调service层
//    @Autowired(required = false)
//    @Resource
    @Autowired
    private CommentService commentService;

    @Autowired
    private ManagerService managerService;


    /*****************************************接口的优化和整合********************************************************/

    /*****************************************接口的优化和整合********************************************************/

    @ApiOperation(value = "发布评论", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/addComment")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="contain",value = "评论内容"),
            @ApiImplicitParam(name="postsID",value = "帖子id"),
            @ApiImplicitParam(name="makerID",value = "评论人id"),
    })
    public Response addComment(String contain, Integer postsID, Integer makerID) {
        Comment comment=new Comment(contain,postsID,makerID);
        commentService.addComment(comment);
        return Response.ok("评论成功！");
    }

    //查询所有的帖子，并且返回一个帖子展示页面
    @ApiOperation(value = "展示某个帖子下所有评论", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryCommentByPosts")
    @ResponseBody
    @ApiImplicitParam(name="postsID",value = "帖子id")
    public List<Comment> list(Integer postsID)  {
        List <Comment> list=commentService.queryCommentByPosts(postsID);
        return list;
    }

    //删除帖子
    @ApiOperation(value = "根据评论id删除评论", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/deleteComment")
    @ResponseBody
    @ApiImplicitParam(name="commentID",value = "评论ID")
    public Response deletePosts(Integer commentID)  {
        commentService.deleteCommentById(commentID);
        return Response.ok("删除成功！");
    }

    @ApiOperation(value = "返回某帖子评论个数", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryCommentCount")
    @ResponseBody
    @ApiImplicitParam(name="postsID",value = "帖子ID")
    public int queryCommentCounts(Integer postsID){
        return commentService.queryCommentCount(postsID);
    }

    @ApiOperation(value = "发布子评论", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/addReviews")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="parentID",value = "父评论id（commentID）"),
            @ApiImplicitParam(name="childID",value = "被这个二级评论回复的二级评论的id（如果是回复父评论的话这个不用填）"),
            @ApiImplicitParam(name="contain",value = "子评论内容"),
            @ApiImplicitParam(name="makerID",value = "写这条评论的人的id")
    })
    public Response addReviews(Integer parentID,Integer childID,String contain,Integer makerID) {
        if(childID==null){
            childID=0;
        }
        System.out.println("controller层"+childID);
        Reviews reviews=new Reviews(parentID,childID,contain,makerID);
        commentService.addReviews(reviews);
        return Response.ok("子评论成功！");
    }

    @ApiOperation(value = "删除子评论（前端输入子评论id）", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/deleteReviewsByID")
    @ResponseBody
    @ApiImplicitParam(name="reviewsID",value = "子评论ID")
    public Response deleteReviews(Integer reviewsID) {
        commentService.deleteReviews(reviewsID);
        return Response.ok("删除子评论成功！");
    }

    @ApiOperation(value = "查询某一个父评论下的所有子评论", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryReviewsByParentID")
    @ResponseBody
    @ApiImplicitParam(name="parentID",value = "父评论id")
    public Response list1(Integer parentID) {
        return Response.ok(commentService.queryReviewsByParent(parentID));
    }
}