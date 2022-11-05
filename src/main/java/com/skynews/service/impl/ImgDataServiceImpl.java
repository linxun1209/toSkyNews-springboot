package com.skynews.service.impl;
import com.skynews.dao.ImgDataMapper;
import com.skynews.pojo.Picture;
import com.skynews.service.ImgDataService;
import com.skynews.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImgDataServiceImpl implements ImgDataService {
    @Autowired
    private ImgDataMapper imgDataMapper;

    public void setImgDataMapper(ImgDataMapper imgDataMapper) {
        this.imgDataMapper = imgDataMapper;
    }

    @Override
    public int ImgDates(Picture img) {
        return imgDataMapper.ImgDates(img);
    }


    @Override
    public Response vagueQueryPicture(String thing) {
        List<Picture> pictures = imgDataMapper.vagueQueryPicture(thing);
        if(pictures.isEmpty()){
            return Response.error("error");
        }
        return Response.ok(pictures);
    }

    @Override
    public Response saveImgPages(int column, int total) {
        List<Picture> pictures = imgDataMapper.saveImgPages(column, total);
        if(pictures.isEmpty()){
            return Response.error("error");
        }
        return Response.ok(pictures);
    }

    @Override
    public Response vagueSaveImgPages(String thing, int column, int total) {
        List<Picture> pictures = imgDataMapper.vagueSaveImgPages(thing, column, total);
        if(pictures.isEmpty()){
            return Response.error("error");
        }
        return Response.ok(pictures);
    }

    @Override
    public Response downPicture() {
        List<Picture> pictures = imgDataMapper.downPicture();
        if(pictures.isEmpty()){
            return Response.error("error");
        }
        return Response.ok(pictures);
    }

    @Override
    public Response passPicture() {
        List<Picture> pictures = imgDataMapper.passPicture();
        if(pictures.isEmpty()){
            return Response.error("error");
        }
        return Response.ok(pictures);
    }

    @Override
    public Response auditPicture(int status,int PictureID) {
        if(status==1){
            imgDataMapper.auditPicture(status,PictureID);
            return Response.ok("审核通过");
        }else if(status==-1){
            imgDataMapper.auditPicture(status,PictureID);
            return Response.ok("审核未通过");

        }
        return Response.error("输入错误");
    }
    @Override
    public Response allPicture() {
        List<Picture> pictures = imgDataMapper.allPicture();
        if(pictures.isEmpty()){
            return Response.error("error");
        }
        return Response.ok(pictures);
    }

    @Override
    public Response deletePicture(int PictureID) {
        Picture img = imgDataMapper.getImg(PictureID);
        if(img==null){
            return Response.error("该图片不存在");
        }
        imgDataMapper.deletePicture(PictureID);
        return Response.ok("删除成功");
    }

    @Override
    public Response statusPicture(int status, int userID, int start) {
        List<Picture> pictures = imgDataMapper.statusPicture(status, userID, start);
        if(pictures.isEmpty()){
            return Response.error("error");
        }
        return Response.ok(pictures);
    }

    @Override
    public Response allUserPicture(int userID, int start) {
        List<Picture> pictures = imgDataMapper.allUserPicture(userID, start);
        if(pictures.isEmpty()){
            return Response.error("error");
        }
        return Response.ok(pictures);
    }

    @Override
    public Response allCountPicture(int userID) {
//        Picture userIDImg = imgDataMapper.getUserIDImg(userID);
//        if(userIDImg==null){
//            return Response.error("用户输入错误");
//        }
        int i = imgDataMapper.allCountPicture(userID);
        return Response.ok(i);
    }
}
