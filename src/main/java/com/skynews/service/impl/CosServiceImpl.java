package com.skynews.service.impl;

import cn.hutool.core.util.StrUtil;
import com.qcloud.cos.COSClient;
import com.qcloud.cos.exception.CosClientException;
import com.qcloud.cos.model.CannedAccessControlList;
import com.qcloud.cos.model.ObjectMetadata;
import com.qcloud.cos.model.PutObjectRequest;
import com.skynews.config.CosConfig;
import com.skynews.service.CosService;
import com.skynews.utils.ResponseDot;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

@Service
public class CosServiceImpl implements CosService {
//    @Value("${spring.tengxun.secretId}")
//    private String secretId;
//
//    @Value("${spring.tengxun.SecretKey}")
//    private String secretKey;
//
//    @Value("${spring.tengxun.region}")
//    private String region;
//
//    @Value("${spring.tengxun.bucketName}")
//    private String bucketName;
//
//    @Value("${spring.tengxun.path}")
//    private String path;
    private String secretId="AKIDWrvkIYXGjwsXw83h5C1Zrsc4HDsGNEp8";

    private String secretKey="3qMbZGgphIdhU0FDuJSKuDF1WkgLksjJ";

    private String region="ap-shanghai";

    private String bucketName="linxun-1310915694";

    private String path="https://linxun-1310915694.cos.ap-shanghai.myqcloud.com";

    @Autowired
    private COSClient cosClient;

    @Override
    public ResponseDot upload(MultipartFile file) {
        ResponseDot responseDto = null;
        try {
            String originalfileName = file.getOriginalFilename();

            // 获得文件流
            InputStream inputStream = file.getInputStream();

            //设置文件key
            String filePath = getFileKey(originalfileName);

            // 上传文件
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(inputStream.available());
            cosClient.putObject(new PutObjectRequest(bucketName, filePath, inputStream, null));
            cosClient.setBucketAcl(bucketName, CannedAccessControlList.PublicRead);
            String url = path + "/" + filePath;
            Map<String, String> map = new HashMap<>();
            return new ResponseDot(10000, "成功并返回数据", url);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            cosClient.shutdown();
        }
        return responseDto;
    }
    /**
     * 生成文件路径
     *
     * @return
     */
    private String getFileKey(String originalfileName) {
        String filePath = "toSkyNews/";
        //1.获取后缀名 2.去除文件后缀 替换所有特殊字符
        String fileType = originalfileName.substring(originalfileName.lastIndexOf("."));
        String fileStr = StrUtil.removeSuffix(originalfileName, fileType).replaceAll("[^0-9a-zA-Z\\u4e00-\\u9fa5]", "_");

        filePath += new DateTime().toString("yyyyMMddHHmmss") + "_" + fileStr + fileType;
        return filePath;
    }

//    public static void deleteFile(String bucketName, String key) {
//        CosConfig cosConfig=new CosConfig();
//
//
//        try {
//            cosConfig.deleteObject(bucketName, key);
//        } catch (CosClientException e) {
//            e.printStackTrace();
//        } finally {
//            cosConfig.shutdown();
//        }
//
//    }
    @Override
    public void deleteFile(String originalfileName){
        CosConfig cosConfig=new CosConfig();
        cosConfig.cosClient();
        try{
            cosClient.deleteObject(this.bucketName, originalfileName);
        }catch (CosClientException e){
            e.printStackTrace();
        } finally {
            cosClient.shutdown();
        }

    }


}