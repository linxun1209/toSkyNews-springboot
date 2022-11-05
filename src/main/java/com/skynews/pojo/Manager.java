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
public class Manager {
    @ApiModelProperty(value="管理员id")
    private int managerID;
    @ApiModelProperty(value="管理员名字")
    private String managerName;
    @ApiModelProperty(value="密码")
    private String password;

    public Manager(String managerName, String password) {
        this.managerName = managerName;
        this.password = password;
    }
}
