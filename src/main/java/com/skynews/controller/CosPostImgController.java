package com.skynews.controller;

import com.skynews.pojo.Posts;
import com.skynews.service.CosService;
import com.skynews.service.PostsService;
import com.skynews.utils.ResponseDot;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.util.StringUtils;

import java.util.HashMap;
import java.util.Map;

@Api("帖子")
@Controller
@CrossOrigin
public class CosPostImgController {
    @Autowired
    private PostsService postsService;
    @Autowired
    private CosService cosService;

    @ApiOperation(value = "带封面的帖子发布", httpMethod = "POST")
    @PostMapping("/setPostProfile")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="reside",value = "发布人id",required = true),
            @ApiImplicitParam(name="postsName",value = "帖子标题",required = true),
            @ApiImplicitParam(name="label",value = "标签",required = true),
            @ApiImplicitParam(name="content",value = "帖子内容(有格式)",required = true),
            @ApiImplicitParam(name="contentA",value = "帖子内容(纯文本)",required = true),
            @ApiImplicitParam(name="picture",value = "发布帖子时间",required = true),
            @ApiImplicitParam(name="status",value = "发布帖子状态",required = true)
    })
    public ResponseDot setPostProfile(MultipartFile profile1,String postsName,String label,Integer reside,String content,String contentA,String picture,int status)  {
//        if (StringUtils.startsWith(postsName," ")||StringUtils.startsWith(label," ")||StringUtils.startsWith(reside," ")||StringUtils.startsWith(content," ")||StringUtils.startsWith(contentA," ")||StringUtils.startsWith(picture," ")){
//            throw new CustomException("类型存在空位");
//        }
        ResponseDot upload = cosService.upload(profile1);
        String profile = String.valueOf(upload.getData());
//        Posts posts=new Posts(postsName,label,reside,content,contentA,picture,profile);
        Posts posts=new Posts();
        posts.setPostsName(postsName);
        posts.setLabel(label);
        posts.setReside(reside);
        posts.setContent(content);
        posts.setContentA(contentA);
        posts.setPicture(picture);
        posts.setCover(profile);
        posts.setStatus(status);
        System.out.println(profile);
        System.out.println(posts);
        postsService.upPostImg(posts);
        Map<String,Object> map=new HashMap<>();
        map.put("帖子照片上传",upload);
        return new ResponseDot(map);
    }
    @ApiOperation(value = "修改帖子", httpMethod = "POST")
    @PostMapping("/changePostProfile")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="reside",value = "发布人id",required = true),
            @ApiImplicitParam(name="postsName",value = "帖子标题",required = true),
            @ApiImplicitParam(name="label",value = "标签",required = true),
            @ApiImplicitParam(name="content",value = "帖子内容(有格式)",required = true),
            @ApiImplicitParam(name="contentA",value = "帖子内容(纯文本)",required = true),
            @ApiImplicitParam(name="picture",value = "发布帖子时间",required = true),
            @ApiImplicitParam(name="postsID",value = "帖子id",required = true),
    })
    public ResponseDot changePostProfile(MultipartFile profile1,String postsName,String label,Integer reside,String content,String contentA,String picture,Integer  postsID){
//        if (StringUtils.startsWith(postsName," ")||StringUtils.startsWith(label," ")||StringUtils.startsWith(reside," ")||StringUtils.startsWith(content," ")||StringUtils.startsWith(contentA," ")||StringUtils.startsWith(picture," ")){
//            throw new CustomException("类型存在空位");
//        }
        ResponseDot upload = cosService.upload(profile1);
        String profile = String.valueOf(upload.getData());
        Posts posts=new Posts();
        posts.setPostsID(postsID);
        posts.setPostsName(postsName);
        posts.setLabel(label);
        posts.setReside(reside);
        posts.setContent(content);
        posts.setContentA(contentA);
        posts.setPicture(picture);
        posts.setCover(profile);
        postsService.changePosts(posts);
        Map<String,ResponseDot> map=new HashMap<>();
        map.put("帖子照片上传",upload);
        return new ResponseDot(map);
    }
}
