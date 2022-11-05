package com.skynews.pojo;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Reports {
    @ApiModelProperty(value = "举报id")
    private int reportID;
    @ApiModelProperty(value = "举报类型")
    private String kind;
    @ApiModelProperty(value = "联系方式")
    private String contact;
    @ApiModelProperty(value = "举报内容")
    private String opinion;
    @ApiModelProperty(value = "用户ID")
    private int userID;
    @ApiModelProperty(value = "被举报的帖子id")
    private int postsID;
    @ApiModelProperty(value = "审核状态")
    private int status;
    @ApiModelProperty(value = "举报时间")
    private String times;

    public Reports(String kind, String contact, String opinion, int userID, int postsID, String times) {
        this.kind = kind;
        this.contact = contact;
        this.opinion = opinion;
        this.userID = userID;
        this.postsID = postsID;
        this.times = times;
    }
}
