package com.wyc.pims.mongo;


import com.wyc.pims.mongo.manager.Manager;
import com.wyc.pims.mongo.manager.impl.ManagerImpl;

/**
 * Created by wyc on 2015/10/31.
 */
public class ManagerBuilder {
    private static String pakName = "com.wyc.pims.model";

    public static Manager build(String beanName) throws ClassNotFoundException {
        String fullName = pakName + "." + beanName;
        Class claz = Class.forName(fullName);
        return new ManagerImpl(claz,beanName);
    }
}
