package com.skynews.dao;


import com.skynews.pojo.Picture;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ImgDataMapper {
    //上传图片库
    int ImgDates(Picture img);
    //根据图片id查询图片是否存在
    Picture getImg(int PictureID);
    //根据用户id查询图片是否存在
    Picture getUserIDImg(int userID);
    //模糊查询图片库
    List<Picture> vagueQueryPicture(@Param("thing") String thing);
    //通过分页查询图片库
    List<Picture> saveImgPages(@Param("column") int column,@Param("total") int total);
    //对模糊查询的数据进行分页
    List<Picture> vagueSaveImgPages(@Param("thing") String thing,@Param("column") int column,@Param("total") int total);
    //查询未审核的照片，也就是status为0的照片
    List<Picture> downPicture();
    //查询所有审核过的照片，也就是status为1的照片
    List<Picture> passPicture();
    //对照片进行审核
    int auditPicture(int status,int PictureID);
//    查询图片库所以图片
    List<Picture> allPicture();
//    用户删除发布的图片
    int deletePicture(int PictureID);
    //用户根据帖子状态查询对应的帖子
    List<Picture> statusPicture(int status,int userID,int start);
    //分页遍历用户的所有图片
    List<Picture> allUserPicture(int userID,int start);
//    获取该用户发布的所有图片的数量
    int allCountPicture(int userID);


}

