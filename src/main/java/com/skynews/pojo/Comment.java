package com.skynews.pojo;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    @ApiModelProperty(value="评论id")
    private int commentID;
    @ApiModelProperty(value="评论内容")
    private String contain;
    @ApiModelProperty(value="发帖人/作者id")
    private int authorID;
    @ApiModelProperty(value="帖子id")
    private int postsID;
    @ApiModelProperty(value="评论人id")
    private int makerID;
    @ApiModelProperty(value="评论人头像")
    private String picture;
    @ApiModelProperty(value="评论时间")
    private String commentTime;
    @ApiModelProperty(value="发评人名字")
    private String commentName;

    public Comment(String contain, int authorID, int postsID, int makerID, String picture, String commentTime, String commentName) {
        this.contain = contain;
        this.authorID = authorID;
        this.postsID = postsID;
        this.makerID = makerID;
        this.picture = picture;
        this.commentTime = commentTime;
        this.commentName = commentName;
    }

    public Comment(String contain, int postsID, int makerID) {
        this.contain = contain;
        this.postsID = postsID;
        this.makerID = makerID;
    }
}
