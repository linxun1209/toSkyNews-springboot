package com.skynews.pojo;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//@Data提供所有的getting和setting方法
//@AllArgsConstructor为类提供一个全参的构造方法
//@NoArgsConstructor为类提供一个无参的构造方法
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @ApiModelProperty(value="用户id")
    private int userID;
    @ApiModelProperty(value="账号")
    private String account;
    @ApiModelProperty(value="用户名字（唯一）")
    private String username;
    @ApiModelProperty(value="密码")
    private String password;
    @ApiModelProperty(value="邮箱")
    private String telephone;
    @ApiModelProperty(value="年龄")
    private int age;
    @ApiModelProperty(value="性别")
    private String sex;
    @ApiModelProperty(value="个签")
    private String signature;
    @ApiModelProperty(value="头像地址链接")
    private String picture;

    public User(String username,String password,String telephone){
        this.username = username;
        this.password = password;
        this.telephone = telephone;
        this.age = 18;
        this.sex="男";
        this.signature="爱生活,爱未来";
        this.picture = "https://linxun-1310915694.cos.ap-shanghai.myqcloud.com/toSkyNews/20220429192703_none.jpg";
    }
    public User(String username,String password,String telephone,int age,String sex,String signature) {
        this.password=password;
        this.age=age;
        this.sex=sex;
        this.telephone=telephone;
        this.signature=signature;
        this.username=username;
    }
    public User(String username,String password,String telephone,int age,String sex,String signature,String picture) {
        this.password=password;
        this.age=age;
        this.sex=sex;
        this.telephone=telephone;
        this.signature=signature;
        this.username=username;
        this.picture=picture;
    }
    public User(String username,String password,String telephone,int age,String sex,String signature,String picture,String account) {
        this.password=password;
        this.age=age;
        this.sex=sex;
        this.telephone=telephone;
        this.signature=signature;
        this.username=username;
        this.picture=picture;
        this.account=account;
    }
    public User(int userID,String username,String password,String telephone,int age,String sex,String signature,String picture) {
        this.userID=userID;
        this.password=password;
        this.age=age;
        this.sex=sex;
        this.telephone=telephone;
        this.signature=signature;
        this.username=username;
        this.picture=picture;
    }

    public User(String username, String picture) {
        this.username = username;
        this.picture = picture;
    }
}
