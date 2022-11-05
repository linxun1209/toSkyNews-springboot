package com.skynews.utils;



import org.junit.Test;

import java.util.UUID;

@SuppressWarnings("all")
public class IDutils {

    public static String getManagerName(){
        return UUID.randomUUID().toString().replaceAll("-","");
    }



//    @Test
//    public void test(){
//        System.out.println(IDutils.getManagerName());
//        System.out.println(IDutils.getManagerName());
//        System.out.println(IDutils.getManagerName());
//    }
}