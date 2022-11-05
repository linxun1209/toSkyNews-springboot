package com.skynews.utils;

import lombok.Data;

@Data
public class ResponseDot<T> {
    /**
     * 状态码
     */
    private Integer code;

    /**
     * 状态信息
     */
    private String message;


    /**
     * 数据
     */
    private T data;

    public ResponseDot(Integer code, String message, T data) {
        this.code = code;
        this.data = data;
        this.message = message;
    }

    public ResponseDot(T data) {
        this.code = 10000;
        this.data = data;
        this.message = "成功并返回数据";
    }

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

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "ResponseDto{" +
                "code=" + code +
                ", message='" + message + '\'' +
                ", data=" + data +
                '}';
    }
}
