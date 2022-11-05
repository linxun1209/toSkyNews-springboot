package com.skynews.controller;


import com.skynews.pojo.Manager;
import com.skynews.pojo.Posts;
import com.skynews.pojo.User;
import com.skynews.service.ManagerService;
import com.skynews.utils.IDutils;
import com.skynews.utils.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.StringUtils;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Random;

@Api(tags="管理员类")
@Controller
@CrossOrigin
@RequestMapping("/users")
public class   managerController {
    //controller调service层
    @Autowired
    private ManagerService managerService;
    //查询所有的页面，并且返回一个用户展示页面
    @ApiOperation(value = "展示所有用户", notes = "获取地址", httpMethod = "GET")
    @GetMapping("/allUser")
    @ResponseBody
    public List<User>list(){
        List<User> list=managerService.queryAllUser();
        return list;
    }
    @ApiOperation(value = "添加用户", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/addUser")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="username",value = "用户名"),
            @ApiImplicitParam(name="password",value = "密码"),
            @ApiImplicitParam(name="telephone",value = "邮箱"),
            @ApiImplicitParam(name="age",value = "年龄"),
            @ApiImplicitParam(name="sex",value = "性别"),
            @ApiImplicitParam(name="signature",value = "个签"),
            @ApiImplicitParam(name="picture",value = "头像地址链接"),
          //  @ApiImplicitParam(name="account",value = "账号")
    })
    public Response addUser(String username,String password,String telephone,Integer age,String sex,String signature,String picture)  {
        String account= String.valueOf(new Random().nextInt(899999) + 1000000);
        if(StringUtils.isEmpty(picture)){
            picture="https://linxun-1310915694.cos.ap-shanghai.myqcloud.com/toSkyNews/20220429192703_none.jpg";
        }
        User user=new User(username,password,telephone,age,sex,signature,picture,account);
        managerService.addUser(user);
        return Response.ok("success");
    }
    @ApiOperation(value = "修改用户", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/updateUser")
    @ResponseBody
    @ApiImplicitParams({
     //       @ApiImplicitParam(name="userID",value = "用户id"),
            @ApiImplicitParam(name="username",value = "用户名"),
            @ApiImplicitParam(name="password",value = "密码"),
            @ApiImplicitParam(name="telephone",value = "邮箱"),
            @ApiImplicitParam(name="age",value = "年龄"),
            @ApiImplicitParam(name="sex",value = "性别"),
            @ApiImplicitParam(name="signature",value = "个签"),
            @ApiImplicitParam(name="picture",value = "头像地址链接")
    })
    public Response updateUser(@RequestParam("userID") int userID,String username,String password,String telephone,Integer age,String sex,String signature,String picture){
        User user=new User(userID,username,password,telephone,age,sex,signature,picture);
        managerService.updateUser(user);
        return Response.ok("修改成功！");
    }

    @ApiOperation(value = "根据id删除用户", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/del/{userID}")
    @ResponseBody
    public Response deleteUser(Integer userID)  {
        User user=managerService.queryUserById(userID);
        if(user!=null){
            managerService.deleteUserById(userID);
            return Response.ok("删除成功！");
        }else{
            return Response.error("删除失败！");
        }
    }

    @ApiOperation(value = "根据id查询用户", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryUserByID/{userID}")
    @ResponseBody
    @ApiImplicitParam(name="userID",value = "用户id")
    public User queryUserByID(Integer userID) {
        User user=managerService.queryUserById(userID);
        if(user!=null){
            return user;
        }else {
            return null;
        }
    }
    @ApiOperation(value = "管理员登录", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/sign")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="managerName",value = "管理员名字"),
            @ApiImplicitParam(name="password",value = "密码"),
    })
    public Response login(String managerName, String password, @ApiIgnore HttpSession session)  {
        Manager manager=managerService.sign(managerName,password);
        session.setAttribute("manager",manager);
        if(manager!=null){
            return Response.ok("success");
        }else{
            return Response.error("false");
        }
    }

    //根据名字模糊查询用户
    @ApiOperation(value = "根据名字模糊查询用户", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryVagueUser")
    @ResponseBody
    public List<User>list2 (@RequestParam("thing") String thing)  {
        List <User> list= managerService.queryVagueUser(thing);
        return list;
    }


    @ApiOperation(value = "根据名字查询用户", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryUserByName")
    @ResponseBody
    @ApiImplicitParam(name="username",value = "用户name（如果用户名字不存在则会返回空值，可以根据用户id=0来判断）")
    public User queryUserByName(String username) {
        User user=managerService.queryUserByName(username);
        return user;
    }

    @ApiOperation(value = "通过分页查询用户", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryPagingUser")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="column",value = "开始查询索引"),
            @ApiImplicitParam(name="total",value = "查询数量"),
    })
    public List<User>list4(Integer column,Integer total) {
        List <User> list=managerService.queryPagingUser(column,total);
        return list;
    }

    @ApiOperation(value = "返回user表里面xi的用户个数", notes = "获取地址", httpMethod = "GET")
    @GetMapping("/queryUserCounts")
    @ResponseBody
    public int queryUserCount(){
        return managerService.queryUserCount();
    }

    @ApiOperation(value = "通过用户id返回其发布的所有帖子", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/queryPostsByUserID")
    @ResponseBody
    @ApiImplicitParam(name="userID",value = "用户id")
    public List<Posts> list4(Integer userID) {
        List<Posts>list= managerService.queryPostsID(userID);
        for(int i=0;i<list.size();i++){
            Posts posts=list.get(i);
            System.out.println(posts.getPostsID());
        }
        return list;
    }

    @ApiOperation(value = "增加manager", notes = "获取地址", httpMethod = "POST")
    @PostMapping("/addManager")
    @ResponseBody
    @ApiImplicitParams({
            @ApiImplicitParam(name="password",value = "管理员密码")
    })
    public Manager queryManagerByName(String password)  {
        String managerName= IDutils.getManagerName();
        Manager manager=new Manager(managerName,password);
        managerService.addManager(manager);
        Manager manager1=managerService.queryManagerByName(managerName);
        return manager1;
    }
}
