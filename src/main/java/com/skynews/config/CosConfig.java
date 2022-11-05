package com.skynews.config;
import com.qcloud.cos.COSClient;
import com.qcloud.cos.ClientConfig;
import com.qcloud.cos.auth.BasicCOSCredentials;
import com.qcloud.cos.auth.COSCredentials;
import com.qcloud.cos.region.Region;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
@Data
public class CosConfig {
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
    @Bean
    public COSClient cosClient(){
        // 1 初始化用户身份信息（secretId, secretKey）。
        COSCredentials cred = new BasicCOSCredentials(this.secretId, this.secretKey);
        // 2 设置 bucket 的区域, COS 地域的简称请参照
        Region region = new Region(this.region);
        ClientConfig clientConfig = new ClientConfig(region);
        // 3 生成 cos 客户端。
        COSClient cosClient = new COSClient(cred, clientConfig);
        return cosClient;
    }
}