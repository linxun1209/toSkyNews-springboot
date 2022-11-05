package com.skynews.controller;


import com.skynews.pojo.User;
import com.skynews.service.CosService;
import com.skynews.service.UserService;
import com.skynews.utils.ResponseDot;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
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

@Api("用户类")
@Controller
@CrossOrigin
public class CosUserImgController {
    @Autowired
    private CosService cosService;
    @Autowired
    private UserService userService;
    @ApiOperation(value = "更换用户头像", httpMethod = "POST")
    @PostMapping("/saveUserProfile")
    @ResponseBody
    @ApiImplicitParam(name="account",value = "账号",required = true)


    public ResponseDot saveUserProfile(MultipartFile profile1,String account) {
//        if(StringUtils.startsWith(account," ")){
//            throw new CustomException("存在空位");
//        }
        ResponseDot upload = cosService.upload(profile1);
        String profile = String.valueOf(upload.getData());
        System.out.println(profile);
        User user1 = userService.getUser(account);
        if(user1==null){
            return new ResponseDot("用户账号输入错误,请重新输入");
        }
        user1.setPicture(profile);
        userService.saveUserProfile(user1);
        Map<String,ResponseDot> map=new HashMap<>();
        map.put("file",upload);
        return new ResponseDot(map);
    }
}