package com.skynews.filter;//package com.skynews.filter;
//
//import com.skynews.pojo.Manager;
//
//import javax.servlet.*;
//import javax.servlet.annotation.WebFilter;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
//import java.io.IOException;
//
//@WebFilter(filterName = "LoginFilter",value = "users-main")  //以html为后缀的不加斜杠
//public class LoginFilter implements Filter {
//    public void destroy() {
//    }
//
//    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {//验证是否是用户登录
//        //向下转型/拆箱 因为ServletRequest和ServletResponse属于父类，所以需要向下转型 转换成为HTTP型的
//        HttpServletRequest request=(HttpServletRequest)req;
//        HttpServletResponse response=(HttpServletResponse)resp;
//        HttpSession session=request.getSession();
//        Manager mgr=(Manager)session.getAttribute("manager") ;
//        if(mgr!=null){
//            chain.doFilter(req, resp);
//        }else{
//            response.sendRedirect(request.getContextPath()+"/users-land.html");
//        }
//    }
//
//    public void init(FilterConfig config) throws ServletException {
//
//    }
////
//}
//
//
//
////import javax.servlet.*;
////import javax.servlet.http.HttpServletRequest;
////import javax.servlet.http.HttpServletResponse;
////import javax.servlet.http.HttpSession;
////import java.io.IOException;
////
////public class LoginFilter implements Filter {
////
////    @Override
////    public void destroy() {
////        // TODO Auto-generated method stub
////
////    }
////
////    @Override
////    public void doFilter(ServletRequest arg0, ServletResponse arg1, FilterChain arg2)
////            throws IOException, ServletException {
////        // TODO Auto-generated method stub
////        HttpServletRequest request = (HttpServletRequest)arg0;
////        HttpServletResponse response = (HttpServletResponse)arg1;
////        HttpSession session = request.getSession();
////
////        if(session.getAttribute("LOGIN_USER")==null
////                && request.getRequestURI().indexOf("/system/login") == -1){
////            // 没有登录
////            response.sendRedirect(request.getContextPath()+"/templates/login.html");
////        }else{
////            // 已经登录，继续请求下一级资源（继续访问）
////            arg2.doFilter(arg0, arg1);
////        }
////
////    }
////
////    @Override
////    public void init(FilterConfig arg0) throws ServletException {
////        // TODO Auto-generated method stub
////
////    }
////
////}