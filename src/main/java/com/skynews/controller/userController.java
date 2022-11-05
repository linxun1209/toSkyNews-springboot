package com.skynews.controller;


import com.skynews.pojo.Posts;
import com.skynews.pojo.User;
import com.skynews.pojo.Collections;
import com.skynews.service.PostsService;
import com.skynews.service.UserService;
import com.skynews.utils.PageUtils;
import com.skynews.utils.RegexUtils;
import com.skynews.utils.Response;
import com.skynews.utils.SendMail;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.StringUtils;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpSession;
import java.util.*;


@Api(tags="用户类")
@Controller
@CrossOrigin
@RequestMapping("/user")
public class userController {
//    创建记录日志的对象
    private static final Logger log= LoggerFactory.getLogger(userController.class);

    @Autowired
    private UserService userService;
    @Autowired
    private SendMail sendMail;
    @Autowired
    private PostsService postsService;
    String authCode="";
    String account="";
    @ApiOperation(value ="发送验证码",notes = "邮箱账号不要写错",httpMethod = "POST")
    @PostMapping("/getCode")
    @ResponseBody
//    @ApiImplicitParam(name="targetEmail",value = "邮箱号")
    public Response mail(@RequestParam("targetEmail") String targetEmail) {
        String targetEmail1=targetEmail.replaceAll(" ","");
//        if(targetEmail.equals("^([\\\\w-\\\\.]+)@((\\\\[[0-9]{1,3}\\\\.[0-9]{1,3}\\\\.[0-9]{1,3}\\\\.)|(([\\\\w-]+\\\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\\\]?)$")){
//            authCode = String.valueOf(new Random().nextInt(899999) + 100000);
//            //sendMail.sendMail(email, "你的验证码为" + captcha + "(五分钟内有效)");
//            sendMail.sendEmailCode(targetEmail1, "你的验证码为" + authCode + "(五分钟内有效)");
//        }
        if (RegexUtils.checkEmail(targetEmail)){
            authCode = String.valueOf(new Random().nextInt(899999) + 100000);
            sendMail.sendEmailCode(targetEmail1, "你的验证码为" + authCode + "(五分钟内有效)");
            return Response.ok(targetEmail1,"验证码发生成功");
        }



//        if (StringUtils.isEmpty(targetEmail)){
//            throw new CustomException("邮箱号不能为空");
//        }
//        if (StringUtils.startsWith(targetEmail," ")){
//            throw new CustomException("邮箱号不能有空位");
//        }
       return Response.error("输入错误");
    }
    //注册
    @ApiOperation(value ="注册",notes = "获取注册",httpMethod = "POST")
    @PostMapping("/register")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="username",value = "用户名",required = true),
            @ApiImplicitParam(name="password",value = "密码",required = true),
            @ApiImplicitParam(name="targetEmail",value = "邮箱号",required = true),
            @ApiImplicitParam(name="authCode1",value = "验证码",required = true),
    })
    public Response register(
                             String username,
                             String password,
                             String targetEmail,
                             String authCode1)
                             {
//        if (StringUtils.startsWith(username," ") || StringUtils.startsWith(password," ")|| StringUtils.startsWith(targetEmail," ")|| StringUtils.startsWith(authCode1," ")){
//            throw new CustomException("类型不能有空位");
//        }
//
//        if (StringUtils.isEmpty(username) || StringUtils.isEmpty(password)|| StringUtils.isEmpty(targetEmail)|| StringUtils.isEmpty(authCode1)){
//            throw new CustomException("用户名或密码不能为空");
//        }
//        if(RegexUtils.checkEmail(targetEmail)&&RegexUtils.checkDigit(password)&&RegexUtils.checkDigit(authCode1)&&RegexUtils.checkChinese(username)){
            User user=new User(username,password,targetEmail);

            if(authCode1.equals(authCode)) {
                int register = userService.register(user);
                if (register == 1) {
                    System.out.println(account);
                    return Response.ok(user,"验证码输入正确,账号生成成功,注册成功");
                } else {
                    return Response.error("注册失败！您的账号已存在！");
                }
            }else {
                return Response.error("验证码输入错误");
            }
        }
//       return Response.ok("注册成功");

    //登录验证
    @ApiOperation(value ="登录验证",notes = "获取登录",httpMethod = "POST")
    @PostMapping("/login")
    @ResponseBody
//    @ApiImplicitParams({
//            @ApiImplicitParam(name="account",value = "账号"),
//            @ApiImplicitParam(name="password",value = "密码"),
//
//    })
    public Response login(@RequestParam("account") String account,
                          @RequestParam("password") String password,@ApiIgnore HttpSession session)  {
        User user1=userService.login(account,password);
//        if (StringUtils.startsWith(account," ") || StringUtils.startsWith(password," ")){
//            throw new CustomException("类型不能有空位");
//        }
//
//        if (StringUtils.isEmpty(account) || StringUtils.isEmpty(password)){
//            throw new CustomException("用户名或密码不能为空");
//        }
        session.setAttribute("user1",user1);
        System.out.println(user1);
        if (user1 != null) {
            return Response.ok(user1,"登录成功");
        } else {
            return Response.error("账号或密码错误,请重新输入");
        }
    }
    //修改密码
    @ApiOperation(value ="忘记密码通过邮箱修改密码",notes = "修改密码",httpMethod = "POST")
    @PostMapping("/changePassword")
    @ResponseBody
    public Response changePassword(@RequestParam("account") String account,
            @RequestParam("newpassword") String password,
                                   @RequestParam("newpassword2") String newpassword2,
                                   @RequestParam("targetEmail") String targetEmail,
                                   @RequestParam("authCode1") String authCode1)  {
//        if (StringUtils.startsWith(account," ") || StringUtils.startsWith(password," ")||StringUtils.startsWith(newpassword2," ")|| StringUtils.startsWith(targetEmail," ")|| StringUtils.startsWith(authCode1," ")){
//            throw new CustomException("类型不能有空位");
//        }
//
//        if (StringUtils.isEmpty(account) || StringUtils.isEmpty(password)||StringUtils.isEmpty(newpassword2)|| StringUtils.isEmpty(targetEmail)|| StringUtils.isEmpty(authCode1)){
//            throw new CustomException("类型不能为空");
//        }
        User user = userService.getUser(account);
        if(user!=null){
            String telephone = user.getTelephone();
            if(!targetEmail.equals(telephone)){
                return Response.ok("邮箱号输入错误,请重新输入");
            }
            if (!password.equals(newpassword2)){
                return Response.error("两次密码不一致,请重新输入");
            }
            if (!authCode1.equals(authCode)){
                return Response.ok("验证码输入错误,请重新输入");
            }
            user.setPassword(password);
            userService.changePassword(user);
            return Response.ok("验证码输入正确,两次密码输入正确,修改密码成功,请登录");
        }
        return Response.error("账号错误或用户不存在");

    }

//            if(targetEmail.equals(telephone)){
//                if (password.equals(newpassword2)) {
//                    if (authCode1.equals(authCode)) {
//                        user.setPassword(password);
//                        System.out.println(user);
//                        userService.changePassword(user);
//
//                    }else{
//                        return Response.ok("验证码输入错误,请重新输入");
//                    }
//                }else{
//                    return Response.error("两次密码不一致,请重新输入");
//
//                }
//
//            } else {
//                return Response.error("邮箱号输入错误");
//
//            }

    //修改信息
    @ApiOperation(value = "修改用户", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/updateUser")
    @ResponseBody
    public Response updateUser(User user) {
//        if (StringUtils.isEmpty(String.valueOf(user))){
//            throw new CustomException("用户信息不能为空");
//        }
//        if(StringUtils.startsWith(user," ")){
//            throw new CustomException("用户信息含空位");
//        }
        System.out.println(user);
        int i = userService.updateUser(user);
        if(i==1){
            return Response.ok("修改成功");
        }else{
            return Response.error("修改失败！您的账号输入错误！");
        }
    }
    //注销用户
    @ApiOperation(value = "注销用户", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/del/{userID}")
    @ResponseBody
    public Response deleteUser(@PathVariable("userID")int  userID){
//        if(StringUtils.isEmpty(String.valueOf(userID))){
//            throw new CustomException("类型为空!");
//        }
//        if(StringUtils.startsWith(userID," ")){
//            throw new CustomException("类型不能有空位");
//        }
        User user = userService.queryUserById(userID);
        if(user!=null){
            userService.deleteUserById(userID);
            return Response.ok(userID,"删除成功");
        }
        return Response.error("用户不存在");
    }

    @ApiOperation(value = "模糊查询用户个人", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/vagueQueryUsername")
    @ResponseBody
//    @ApiImplicitParams({
//            @ApiImplicitParam(name="thing",value = "模糊查询的片段")
//    })
    public List<User> vagueQueryUsername (String thing) {
        String thing1=thing.replaceAll(" ","");
   //     System.out.println(thing1);
//        if (StringUtils.isEmpty(thing)) {
//            throw new CustomException("类型为空!");
//        }
//        if (StringUtils.startsWith(thing," ")){
//            throw new CustomException("类型有空位");
//        }
        List <User> list= userService.vagueQueryUsername(thing1);
        return list;
    }
    @ApiOperation(value = "通过分页查询用户", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/savePages")
    @ResponseBody
//    @ApiImplicitParams({
//            @ApiImplicitParam(name="column",value = "开始查询索引"),
//            @ApiImplicitParam(name="total",value = "查询数量"),
//    })
    public List<User>savePages(@RequestParam("column") int column,@RequestParam("total") int total)  {
//        if(StringUtils.startsWith(column," ")||StringUtils.startsWith(total," ")){
//            throw new CustomException("类型不能有空位");
//        }
//        if(StringUtils.isEmpty(String.valueOf(column))||StringUtils.isEmpty(String.valueOf(total))){
//            throw new CustomException("类型不能为空");
//        }
        List <User> list=userService.savePages(column,total);
        return list;
    }
    @ApiOperation(value = "对模糊查询的用户进行分页", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/vagueSavePages")
    @ResponseBody
//    @ApiImplicitParams({
//            @ApiImplicitParam(name="thing",value = "模糊查询的片段"),
//            @ApiImplicitParam(name="column",value = "开始查询索引"),
//            @ApiImplicitParam(name="total",value = "查询数量"),
//    })
    public List<User>vagueSavePages(@RequestParam("thing")String thing,@RequestParam("column")int column,@RequestParam("total")int total)  {
//        if(StringUtils.startsWith(thing," ")||StringUtils.startsWith(column," ")||StringUtils.startsWith(total," ")){
//            throw new CustomException("类型不能有空位");
//        }
//        if(StringUtils.isEmpty(thing)||StringUtils.isEmpty(String.valueOf(column))||StringUtils.isEmpty(String.valueOf(total))){
//            throw new CustomException("类型不能为空");
//        }
        List <User> list=userService.vagueSavePages(thing,column,total);
        return list;
    }
    @ApiOperation(value = "用户查询暂未审核的帖子", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/allAuditing")
    @ResponseBody
    @ApiImplicitParam(name="reside",value = "用户id")
    public List<Posts>allAuditing(@RequestParam("reside") Integer reside)  {
//        if(StringUtils.startsWith(reside," ")){
//            throw new CustomException("类型不能有空位");
//        }
//        if(StringUtils.isEmpty(String.valueOf(reside))){
//            throw new CustomException("类型不能为空");
//        }
//            if(reside==null){
//            throw new CustomException("类型不能为空");
//            }
        List <Posts> list=userService.allAuditing(reside);
        return list;
    }
    @ApiOperation(value = "用户查询暂审核过的帖子", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/allPass")
    @ResponseBody
    @ApiImplicitParam(name="reside",value = "用户id")
    public List<Posts>allPass(@RequestParam("reside") int reside){
//        if(StringUtils.startsWith(reside," ")){
//            throw new CustomException("类型不能有空位");
//        }
//        if(StringUtils.isEmpty(String.valueOf(reside))){
//            throw new CustomException("类型不能为空");
//        }
        List <Posts> list=userService.allPass(reside);
        return list;
    }
    @ApiOperation(value = "通过用户id查询发布的帖子总数量", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/allCountPosts")
    @ResponseBody
    @ApiImplicitParam(name="reside",value = "用户id",required = true)
    public int allCountPosts(@RequestParam("reside") int reside) {
//        if(StringUtils.startsWith(reside," ")){
//            throw new CustomException("类型不能有空位");
//        }
//        if(StringUtils.isEmpty(String.valueOf(reside))){
//            throw new CustomException("类型不能为空");
//        }
        int list=userService.allCountPosts(reside);
        return list;
    }
    @ApiOperation(value = "对用户的收藏帖子的分页", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/saveCollections")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="column",value = "开始查询索引",required = true),
            @ApiImplicitParam(name="column",value = "索引",required = true),
    })
    public List<Collections> saveCollections(@RequestParam("userID") int userID,@RequestParam("column") int column) {
//        if(StringUtils.startsWith(userID," ")||StringUtils.startsWith(column," ")){
//            throw new CustomException("类型不能有空位");
//        }
//        if(StringUtils.isEmpty(String.valueOf(userID))||StringUtils.isEmpty(String.valueOf(column))){
//            throw new CustomException("类型不能为空");
//        }
//        List<Collections> list=userService.saveCollections(userID,column);
        List<com.skynews.pojo.Collections> collections = userService.saveCollections(userID, column);
        return collections;
    }
    @ApiImplicitParams({
            @ApiImplicitParam(name="userID",value = "用户id",required = true),
            @ApiImplicitParam(name="column",value = "索引",required = true),
    })
    @ApiOperation(value = "对用户的收藏帖子的分页(返回帖子id查询相对应的帖子)", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryPostsByCollectionID")
    @ResponseBody
    public List<Posts> queryPostsByCollectionID (Integer userID,Integer column)  {
//        if(userID==null||column==null){
//            throw new CustomException("类型为空！");
//        }
        List<Collections>list=userService.saveCollections(userID,column);
        List<Posts>list1=new ArrayList<>();
        for(int i=0;i<list.size();i++){
            Collections collections=list.get(i);
            int postsID=collections.getPostsID();
            list1.add(userService.queryPostsById(postsID));
        }
        return list1;
    }
    @ApiOperation(value = "通过id和状态值查询相对应的帖子信息", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/trends")
    @ResponseBody
//    @ApiImplicitParams({
//            @ApiImplicitParam(name="column",value = "开始查询索引",required = true),
//            @ApiImplicitParam(name="column",value = "索引",required = true),
//    })
    public Response trends( int reside,int status,int start,int count){
//        if(StringUtils.startsWith(userID," ")||StringUtils.startsWith(column," ")){
//            throw new CustomException("类型不能有空位");
//        }
//        if(StringUtils.isEmpty(String.valueOf(userID))||StringUtils.isEmpty(String.valueOf(column))){
//            throw new CustomException("类型不能为空");
//        }
//        List<Collections> list=userService.saveCollections(userID,column);
//        System.out.println(userID);
//        System.out.println(list);
//        return list;
        PageUtils pageUtils=new PageUtils(start,count);
        pageUtils.setStart(start);
        pageUtils.setCount(count);
        List<Posts> list = userService.trends(reside,status,pageUtils.getStart(),pageUtils.getCount());
        Map<String,Object> map=new HashMap<>();
        map.put("pagaUtils",pageUtils);
        map.put("list",list);
        return Response.ok(map);
    }
    @ApiOperation(value = "用户获取草稿箱的内容", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/drafts")
    @ResponseBody
    @ApiImplicitParam(name="reside",value = "用户id",required = true)
    public Response drafts( int reside){
//        if(StringUtils.startsWith(userID," ")||StringUtils.startsWith(column," ")){
//            throw new CustomException("类型不能有空位");
//        }
//        if(StringUtils.isEmpty(String.valueOf(userID))||StringUtils.isEmpty(String.valueOf(column))){
//            throw new CustomException("类型不能为空");
//        }

        return userService.drafts(reside);
    }
    @ApiOperation(value = "发布", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/upDrafts")
    @ResponseBody
//    @ApiImplicitParams({
//            @ApiImplicitParam(name="column",value = "开始查询索引",required = true),
//            @ApiImplicitParam(name="column",value = "索引",required = true),
//    })
    public Response upDraft(int reside){
//        if(StringUtils.startsWith(userID," ")||StringUtils.startsWith(column," ")){
//            throw new CustomException("类型不能有空位");
//        }
//        if(StringUtils.isEmpty(String.valueOf(userID))||StringUtils.isEmpty(String.valueOf(column))){
//            throw new CustomException("类型不能为空");
//        }
         userService.upDrafts(reside);
        return Response.ok("发布成功");
    }
    @ApiOperation(value = "用户根据状态值获取对应的帖子", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/disDrafts")
    @ResponseBody
    public Response disDrafts(int reside,int status,int start,int count){
        return userService.disDrafts(reside,status,start,count);
    }
    @ApiOperation(value = "除了草稿箱的用户的所有帖子", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/savePosts")
    @ResponseBody
    public Response savePosts(int reside,int column){
        return userService.savePosts(reside,column);
    }


}

