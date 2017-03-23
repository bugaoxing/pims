package com.wyc.pims.util;

import com.wyc.pims.model.ResponsePackage;

import java.util.List;

/**
 * Created by Phoenix on 2017/3/23.
 */
public class UnifiedFunctions {

    public static ResponsePackage buildQuickError(String message) {
        ResponsePackage responsePackage = new ResponsePackage();
        responsePackage.setSuccessful(false);
        responsePackage.setMessage(message);
        return responsePackage;
    }

    public static ResponsePackage buildQuickEmptySuccess(String message) {
        ResponsePackage responsePackage = new ResponsePackage();
        responsePackage.setSuccessful(true);
        responsePackage.setMessage(message);
        return responsePackage;
    }

    public static ResponsePackage buildQuickSuccess(List<?> data, String message) {
        ResponsePackage responsePackage = new ResponsePackage();
        responsePackage.setSuccessful(true);
        responsePackage.setMessage(message);
        responsePackage.setData(data);
        return responsePackage;
    }


}
