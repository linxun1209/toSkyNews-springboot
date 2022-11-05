package com.skynews.pojo;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Messages {
    @ApiModelProperty(value="自增id")
    private int messagesID;
    @ApiModelProperty(value="alike或者collections")
    private String reside;
    @ApiModelProperty(value="帖子名字")
    private String postsName;
    @ApiModelProperty(value="用户id")
    private int userID;
    @ApiModelProperty(value="作者id")
    private int authorID;
    @ApiModelProperty(value="默认是0，用户查看之后显示为1")
    private int status;
    @ApiModelProperty(value="评论或收藏时间")
    private String times;
    @ApiModelProperty(value="帖子id")
    private int postsID;

    public Messages(String reside, String postsName, int userID, int authorID, String times) {
        this.reside = reside;
        this.postsName = postsName;
        this.userID = userID;
        this.authorID = authorID;
        this.times = times;
    }

    public Messages(String reside, String postsName, int userID, int authorID, String times,int postsID) {
        this.reside = reside;
        this.postsName = postsName;
        this.userID = userID;
        this.authorID = authorID;
        this.times = times;
        this.postsID=postsID;
    }

    public Messages(int messagesID, String reside, String postsName, int authorID, String times) {
        this.messagesID = messagesID;
        this.reside = reside;
        this.postsName = postsName;
        this.authorID = authorID;
        this.times = times;
    }

    public Messages(int messagesID, String reside, String postsName, int authorID, int status, String times) {
        this.messagesID = messagesID;
        this.reside = reside;
        this.postsName = postsName;
        this.authorID = authorID;
        this.status = status;
        this.times = times;
    }
}
