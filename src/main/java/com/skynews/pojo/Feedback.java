package com.skynews.pojo;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Feedback {
    @ApiModelProperty(value = "反馈id")
    private int feedbackID;
    @ApiModelProperty(value = "反馈类型")
    private String kind;
    @ApiModelProperty(value = "联系方式")
    private String contact;
    @ApiModelProperty(value = "你的意见")
    private String opinion;
    @ApiModelProperty(value="反馈用户id")
    private int userID;
    @ApiModelProperty(value="管理员是否反馈")
    private int managerOr;
    @ApiModelProperty(value="用户是否接到反馈")
    private int userOr;
    @ApiModelProperty(value="管理员反馈内容")
    private String managerContent;
    @ApiModelProperty(value = "用户反馈时间")
    private String times;

    public Feedback(String kind, String contact, String opinion,int userID,String times) {
        this.kind = kind;
        this.contact = contact;
        this.opinion = opinion;
        this.userID=userID;
        this.times=times;
    }
}
