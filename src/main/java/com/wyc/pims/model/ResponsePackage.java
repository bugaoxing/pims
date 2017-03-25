package com.wyc.pims.model;

import java.util.List;

/**
 * Created by wyc on 2017/3/23.
 */
public class ResponsePackage {

    boolean successful;
    String message;
    List<?> data;

    public boolean isSuccessful() {
        return successful;
    }

    public void setSuccessful(boolean successful) {
        this.successful = successful;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<?> getData() {
        return data;
    }

    public void setData(List<?> data) {
        this.data = data;
    }
}
