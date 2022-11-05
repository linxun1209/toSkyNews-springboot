package com.skynews.pojo;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Reviews {
    @ApiModelProperty(value="子评论id")
    private int reviewsID;
    @ApiModelProperty(value="父评论id")
    private int parentID;
    @ApiModelProperty(value="被一个二级评论回复的二级评论的id")
    private int childID;
    @ApiModelProperty(value="回复一个二级评论的二级评论的name")
    private String childName;
    @ApiModelProperty(value="回复一个二级评论的二级评论的picture")
    private String childPicture;
    @ApiModelProperty(value="子评论内容")
    private String contain;
    @ApiModelProperty(value="评论时间")
    private String times;
    @ApiModelProperty(value="写这条评论的人的id")
    private int makerID;

    public Reviews(int parentID, int childID, String childName, String childPicture, String contain, String times,int makerID) {
        this.parentID = parentID;
        this.childID = childID;
        this.childName = childName;
        this.childPicture = childPicture;
        this.contain = contain;
        this.times = times;
        this.makerID=makerID;
    }

    public Reviews(int parentID, int childID, String contain,int makerID) {
        this.parentID = parentID;
        this.childID = childID;
        this.contain = contain;
        this.makerID=makerID;
    }
}
