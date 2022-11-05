package com.skynews.pojo;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Alike {
    @ApiModelProperty(value = "点赞id")
    private int alikeID;
    @ApiModelProperty(value = "被点赞帖子id")
    private int postsID;
    @ApiModelProperty(value = "点赞的用户id")
    private int userID;

    public Alike(int postsID, int userID) {
        this.postsID = postsID;
        this.userID = userID;
    }
}
