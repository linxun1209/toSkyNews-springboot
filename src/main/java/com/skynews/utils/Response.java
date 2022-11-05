package com.skynews.utils;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class Response {
    // 统一结果返回类
    //标识返回的状态码
    private Integer code;
    //标识返回的信息
    private String message;
    //标识返回的数据
    private Object data;

    //私有化，防止new
    private Response() {  }
    //成功
    public static Response ok(Object data, String message) {
        return new Response(1, message, data);  //code 也可以使用字典管理 下面会谈到
    }

    //成功返回 重载 message没有特别要求
    public static Response ok(Object data) {
        return Response.ok(data, "success"); //message 也可以使用字典管理 下面会谈到
    }

    // 失败
    public static Response error(Object data, String message) {
        return new Response(-1, message, data);
    }

    public static Response error(Object data) {
        return Response.error(data,"fail");  //code 也可以使用字典管理 下面会谈到
    }


    /************************/
    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public Response(String message, Object data) {
        this.message = message;
        this.data = data;
    }
}