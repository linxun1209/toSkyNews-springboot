package com.skynews.pojo;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Focus {
    @ApiModelProperty(value = "关注ID")
    private int autoID;
    @ApiModelProperty(value = "关注的用户的id")
    private int focusID;
    @ApiModelProperty(value = "粉丝的id")
    private int fansID;

    public Focus(int focusID, int fansID) {
        this.focusID = focusID;
        this.fansID = fansID;
    }
}
