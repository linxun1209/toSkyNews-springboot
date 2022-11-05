package com.skynews.controller;

import com.skynews.pojo.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class view {

    @RequestMapping("/about_title")
    public String q1(){
        return "/about_title";
    }
    @RequestMapping("/animate")
    public String q2(){
        return "/animate";
    }
    @RequestMapping("/changeUserInfo")
    public String a1(){
        return "/changeUserInfo";
    }
    @RequestMapping("/forgetPass")
    public String aaa(){
        return "forgetPass";
    }
    @RequestMapping("/instruction")
    public String q4(){
        return "/instruction";
    }

    @RequestMapping("/login")
    public String demo(){
        return "login";
    }
    @RequestMapping("/lunbo")
    public String q5(){
        return "/lunbo";
    }

    @RequestMapping("/mymessage")
    public String q6(){
        return "/mymessage";
    }


    @RequestMapping("/myPage")
    public String a2(){
        return "/myPage";
    }

    @RequestMapping("/otherUserPage")
    public String a3(){
        return "/otherUserPage";
    }

    @RequestMapping("/publish")
    public String a4(){
        return "/publish";
    }

    @RequestMapping("/publish-change")
    public String a5(){
        return "/publish-change";
    }

    @RequestMapping("/recomment")
    public String a6(){
        return "/recomment";
    }

    @RequestMapping("/recomments")
    public String a7(){
        return "/recomments";
    }
    @RequestMapping("/respond")
    public String q9(){
        return "/respond";
    }

    @RequestMapping("/search")
    public String a8(){
        return "/search";
    }

    @RequestMapping("/user_main")
    public String a9(){
        return "/user_main";
    }
@RequestMapping("/index")
public String index(Model model, HttpServletRequest request){
    User user1 = (User) request.getSession().getAttribute("user1");
    model.addAttribute("user1",user1);
    return "/index";
}

    @RequestMapping("/users-feedback")
    public String s1(){
        return "/users-feedback";
    }

    @RequestMapping("/users-article")
    public String s2(){
        return "/users-article";
    }

    @RequestMapping("/users-land")
    public String s4(){
        return "/users-land";
    }
    @RequestMapping("/users-main")
    public String qq(){
        return "/users-main";
    }

    @RequestMapping("/users-report")
    public String q8(){
        return "/users-report";
    }
    @RequestMapping("/VIP_start")
    public String s6(){
        return "/VIP_start";
    }
    @RequestMapping("/VIP_SAY")
    public String s7(){
        return "/VIP_SAY";
    }
    @RequestMapping("/VIP")
    public String s8(){
        return "/VIP";
    }

    @RequestMapping("/draftsPage")
    public String s89(){
        return "/draftsPage";
    }

    @RequestMapping("/picture")
    public String c1(){
        return "/picture";
    }
}
