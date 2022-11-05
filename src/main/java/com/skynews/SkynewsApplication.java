package com.skynews;

import org.mybatis.spring.annotation.MapperScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

@SpringBootApplication
@MapperScan("com.skynews.dao")
public class SkynewsApplication {
    public static void main(String[] args) {
        SpringApplication.run(SkynewsApplication.class, args);
//        JdbcTemplate jdbcTemplate = run.getBean(JdbcTemplate.class);
//        List<Map<String, Object>> result = jdbcTemplate.queryForList("SELECT * FROM user");
//        System.out.println(result);
    }
}
