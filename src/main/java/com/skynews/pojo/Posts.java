package com.skynews.pojo;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Posts {
    @ApiModelProperty(value="帖子id")
    private int postsID;
    @ApiModelProperty(value="帖子名字")
    private String postsName;
    @ApiModelProperty(value="点赞")
    private int alike;
    @ApiModelProperty(value="标签")
    private String label;
    @ApiModelProperty(value="审核状态")
    private int status;
    @ApiModelProperty(value="发布帖子的用户的id")
    private int reside;
    @ApiModelProperty(value="帖子内容1(格式)")
    private String content;
    @ApiModelProperty(value="帖子内容2（纯文本）")
    private String contentA;
    @ApiModelProperty(value="发布帖子时间")
    private  String picture;
    @ApiModelProperty(value="收藏帖子的用户的id")
    private int collectionID;
    @ApiModelProperty(value = "浏览量")
    private int browse;
    @ApiModelProperty(value = "帖子封面")
    private String cover;

    public Posts(int postsID,String postsName,String label,String content,String picture){
        this.postsID=postsID;
        this.postsName=postsName;
        this.label=label;
        this.content=content;
        this.picture=picture;
    }
    public Posts(String postsName,String label,int reside,String content,String picture){
        this.postsName=postsName;
        this.label=label;
        this.reside=reside;
        this.content=content;
        this.picture=picture;


    }

    public Posts(int postsID,String postsName,String label,String content,String contentA,String picture){
        this.postsID=postsID;
        this.postsName=postsName;
        this.label=label;
        this.content=content;
        this.contentA=contentA;
        this.picture=picture;
    }

    public Posts(String postsName,String label,int reside,String content,String contentA,String picture){
        this.postsName=postsName;
        this.label=label;
        this.content=content;
        this.contentA=contentA;
        this.picture=picture;
        this.reside=reside;
    }
    public Posts(String postsName,String label,int reside,String content,String contentA,String picture,int status){
        this.postsName=postsName;
        this.label=label;
        this.content=content;
        this.contentA=contentA;
        this.picture=picture;
        this.reside=reside;
        this.status=status;
    }
}
