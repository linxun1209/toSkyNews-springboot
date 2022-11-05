package com.skynews.service;


import com.skynews.pojo.Picture;
import com.skynews.utils.Response;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

public interface ImgDataService {
    //上传图片库
    int ImgDates(Picture img);
    //模糊查询图片库
    Response vagueQueryPicture(@Param("thing") String thing);
    //通过分页查询图片库
    Response saveImgPages(@Param("column") int column,@Param("total") int total);
    //对模糊查询的数据进行分页
    Response vagueSaveImgPages(@Param("thing") String thing,@Param("column") int column,@Param("total") int total);
    //查询未审核的照片，也就是status为0的照片
    Response downPicture();
    //查询所有审核过的照片，也就是status为1的照片
    Response passPicture();
    //对照片进行审核
    Response auditPicture(int status,int PictureID);
    //查询图片库所有图片
    Response allPicture();
    //    用户删除发布的图片
    Response deletePicture(int PictureID);
    //用户根据帖子状态查询对应的帖子
    Response statusPicture(int status,int userID,int start);
    //分页遍历用户的所有图片
    Response allUserPicture(int userID,int start);
    //    获取该用户发布的所有图片的数量
    Response allCountPicture(int userID);
}
