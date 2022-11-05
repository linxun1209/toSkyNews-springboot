package com.skynews.pojo;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Collections {
    @ApiModelProperty(value="收藏id")
    private int collectionID;
    @ApiModelProperty(value="所收藏帖子id")
    private int postsID;
    @ApiModelProperty(value="所收藏用户id")
    private int userID;
    public Collections(int postsID, int userID) {
        this.postsID = postsID;
        this.userID = userID;
    }
}
