package com.skynews.pojo;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vip {
    @ApiModelProperty(value = "vipID")
    private int vipID;
    @ApiModelProperty(value = "成为VIP的用户id")
    private int userID;
    @ApiModelProperty(value = "成为VIP时间")
    private String times;

    public Vip(int userID, String times) {
        this.userID = userID;
        this.times = times;
    }
}
