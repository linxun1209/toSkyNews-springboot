package com.skynews.service;

import com.skynews.utils.ResponseDot;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;


public interface CosService {
//    上传图片
    ResponseDot upload(MultipartFile file);
//    删除图片
    void deleteFile(String fileName);
}
