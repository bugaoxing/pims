package com.wyc.pims.mongo.config;

import java.io.*;
import java.util.Properties;

/**
 * Created by vizewang on 2015/9/29.
 */
public class DALConfigBean {
    private static DALConfigBean dalConfigBean = new DALConfigBean();
    private String host;
    private int port;
    private String username;
    private String password;
    private String databaseName;

    public static DALConfigBean getInstance() {
        return dalConfigBean;
    }

    private DALConfigBean() {

        host = "127.0.0.1";
        port = 27017;
        username = null;
        password = null;
        databaseName = "pims";
    }

    public String getHost() {
        return host;
    }

    public int getPort() {
        return port;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getDatabaseName() {
        return databaseName;
    }

    public static void main(String[] args) {

//        File file=new File("/");
//        System.out.println(file.getAbsolutePath());
//        File file=new File(DALConfigBean.class.getResource("/config.properties").getPath());
//        System.out.println(file.getAbsolutePath());
//        System.out.println(DALConfigBean.class.getResource("/"));
        System.out.println(getInstance().getHost());
    }
}
