package com.skynews.utils;

import com.qcloud.cos.COSClient;
import com.qcloud.cos.ClientConfig;
import com.qcloud.cos.auth.BasicCOSCredentials;
import com.qcloud.cos.auth.COSCredentials;
import com.qcloud.cos.model.PutObjectRequest;
import com.qcloud.cos.region.Region;
import org.springframework.stereotype.Component;
import java.io.File;
import java.net.URL;
import java.util.Date;
@Component
public class cos {
    public static URL picCOS(File cosFile) throws Exception {

        COSCredentials cred = new BasicCOSCredentials("AKIDWrvkIYXGjwsXw83h5C1Zrsc4HDsGNEp8","3qMbZGgphIdhU0FDuJSKuDF1WkgLksjJ");
        // 2 设置bucket的区域, COS地域的简称请参照
        // https://cloud.tencent.com/document/product/436/6224
        ClientConfig clientConfig = new ClientConfig(new Region("ap-shanghai"));
        // 3 生成cos客户端
        COSClient cosClient = new COSClient(cred, clientConfig);
        String bucketName = "linxun-1310915694";
        String key = "image/"+new Date().getTime() + ".png";
        // 简单文件上传, 最大支持 5 GB, 适用于小文件上传, 建议 20 M 以下的文件使用该接口
        // 大文件上传请参照 API 文档高级 API 上传
        // 指定要上传到 COS 上的路径
        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, key, cosFile);
        cosClient.putObject(putObjectRequest);
        cosClient.shutdown();
        Date expiration = new Date(new Date().getTime() + 5 * 60 * 10000);
        URL url = cosClient.generatePresignedUrl(bucketName, key, expiration);
        return url;
    }

    public static void main(String[] args) throws Exception {
        System.out.println(cos.picCOS(new File("src/bird-小鸟.png")));
    }

}
