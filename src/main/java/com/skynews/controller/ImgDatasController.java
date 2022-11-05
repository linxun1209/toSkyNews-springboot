package com.skynews.controller;


import com.skynews.pojo.Picture;
import com.skynews.service.CosService;
import com.skynews.service.ImgDataService;
import com.skynews.service.UserService;
import com.skynews.utils.Response;
import com.skynews.utils.ResponseDot;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Api(tags="图片库类")
@Controller
@CrossOrigin
@RequestMapping("/img")
public class ImgDatasController {
    @Autowired
    private CosService cosService;
    @Autowired
    private ImgDataService imgDataService;
    @Autowired
    private UserService userService;
    @ApiOperation(value = "照片库上传", httpMethod = "POST")
    @PostMapping("/getImgProfile")
    @ResponseBody
    public ResponseDot getImgProfile(@RequestParam("profile") MultipartFile profile, @RequestParam("userID") int  userID,@RequestParam("userDepiction") String userDepiction) {
        ResponseDot upload = cosService.upload(profile);
        String profile1 = String.valueOf(upload.getData());
        Picture img=new Picture();
        img.setUserID(userID);
        img.setUserImg(profile1);
        img.setUserDepiction(userDepiction);
        imgDataService.ImgDates(img);
        Map<String,ResponseDot> map=new HashMap<>();
        map.put("照片库上传",upload);
        return new ResponseDot(map);
    }
    @ApiOperation(value = "模糊查询图片", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/vagueQueryPicture")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="thing",value = "模糊查询的片段")
    })
    public Response vagueQueryPicture (String thing)  {
        String thing1=thing.replaceAll(" ","");
//        if (StringUtils.isEmpty(thing) ){
//            throw new CustomException("类型为空");
//        }
        return imgDataService.vagueQueryPicture(thing1);
    }
    @ApiOperation(value = "通过分页查询图片", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/saveImgPages")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="column",value = "开始查询索引"),
            @ApiImplicitParam(name="total",value = "查询数量"),
    })
    public Response saveImgPages(Integer column, Integer total) {
//        if(column==null||total==null){
//            throw new CustomException("类型为空！");
//        }

        return imgDataService.saveImgPages(column,total);
    }
    @ApiOperation(value = "对模糊查询的图片进行分页", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/vagueSaveImgPages")
    @ResponseBody
    @ApiImplicitParams({
    //        @ApiImplicitParam(name="thing",value = "模糊查询的片段"),
            @ApiImplicitParam(name="column",value = "开始查询索引"),
            @ApiImplicitParam(name="total",value = "查询数量"),
    })
    public Response vagueSaveImgPages(@RequestParam("thing") String thing,Integer column,Integer total) {
//        if(column==null||total==null){
//            throw new CustomException("类型为空！");
//        }
        return imgDataService.vagueSaveImgPages(thing,column,total);
    }

    //对照片进行审核
    @ApiOperation(value = "管理员查询待审核的图片", notes = "获取地址", httpMethod = "GET")
    @GetMapping("/downPicture")
    @ResponseBody
    public Response downPicture (){
        return imgDataService.downPicture();
    }
    //管理员查询待审核的图片
    @ApiOperation(value = "审核照片", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/auditPicture")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="status",value = "图片状态"),
            @ApiImplicitParam(name="PictureID",value = "图片id")
    })

    public Response auditPicture(Integer status,Integer PictureID){
        return imgDataService.auditPicture(status,PictureID);
    }
    //查询所有审核过的帖子，也就是status为1的帖子
    @ApiOperation(value = "管理员查询审核通过的照片", notes = "获取地址", httpMethod = "GET")
    @GetMapping("/passPicture")
    @ResponseBody
    public Response passPicture (){
        return imgDataService.passPicture();
    }
    @ApiOperation(value = "展示所有图片", notes = "获取地址", httpMethod = "GET")
    @GetMapping("/allPicture")
    @ResponseBody
    public Response allPicture(){
        return imgDataService.allPicture();
    }
    @ApiOperation(value = "用户查询暂未审核的图片", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/allAuditingPicture")
    @ResponseBody
    public Response allAuditingPicture(@RequestParam("userID") int userID){
        return userService.allAuditingPicture(userID);
    }
    @ApiOperation(value = "用户查询暂审核过的图片", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/allPassPicture")
    @ResponseBody
    public Response allPassPicture (@RequestParam("userID") int userID){
        return userService.allPassPicture(userID);
    }
    @ApiOperation(value = "用户删除图片", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/deletePicture")
    @ResponseBody
//    @ApiImplicitParam(name="PictureID",value = "图片id")
    public Response deletePicture (@RequestParam("PictureID") int PictureID ){
        return imgDataService.deletePicture(PictureID);
    }
    //    用户根据状态 查询对应图片
    @ApiOperation(value = "用户根据状态 查询对应的图片", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/statusPicture")
    @ResponseBody
    public Response statusPicture (int status,@RequestParam("userID") int userID,int start){
        return imgDataService.statusPicture(status,userID,start);
    }
    @ApiOperation(value = "得到用户的所有图片", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/allUserPicture")
    @ResponseBody
    public Response allUserPicture (@RequestParam("userID") int userID,int start){
        return imgDataService.allUserPicture(userID,start);
    }
    @ApiOperation(value = "得到用户的所有帖子", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/allCountPicture")
    @ResponseBody
    public Response  allCountPicture(@RequestParam("userID") int userID){
        return imgDataService.allCountPicture(userID);
    }
}
