package com.wyc.pims.mongo.dao.impl;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import com.wyc.pims.mongo.config.DALConfigBean;
import com.wyc.pims.mongo.dao.DAO;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;


import java.util.Arrays;

/**
 * Created by wycwang on 2015/9/14.
 */
public class DAOImpl implements DAO {
    private static MongoClient mongoClient = null;
    public DAOImpl() {
        if (mongoClient == null){
            ServerAddress serverAddress=new ServerAddress(DALConfigBean.getInstance().getHost(),DALConfigBean.getInstance().getPort());
            if (DALConfigBean.getInstance().getUsername() != null && DALConfigBean.getInstance().getPassword() != null) {
                MongoCredential credential = MongoCredential.createCredential(DALConfigBean.getInstance().getUsername(), DALConfigBean.getInstance().getDatabaseName(), DALConfigBean.getInstance().getPassword().toCharArray());
                mongoClient=new MongoClient(serverAddress, Arrays.asList(credential));
            }else {
                mongoClient=new MongoClient(serverAddress);
            }
        }
    }

    public DAOImpl(MongoClientOptions mongoClientOptions){
        if (mongoClient == null){
            ServerAddress serverAddress=new ServerAddress(DALConfigBean.getInstance().getHost(),DALConfigBean.getInstance().getPort());
            if (DALConfigBean.getInstance().getUsername() != null && DALConfigBean.getInstance().getPassword() != null) {
                MongoCredential credential = MongoCredential.createCredential(DALConfigBean.getInstance().getUsername(), DALConfigBean.getInstance().getDatabaseName(), DALConfigBean.getInstance().getPassword().toCharArray());
                mongoClient=new MongoClient(serverAddress, Arrays.asList(credential),mongoClientOptions);
            }else {
                mongoClient=new MongoClient(serverAddress,mongoClientOptions);
            }
        }
    }
    public void resetMongoClient(MongoClient mc){
        mongoClient=mc;
    }
    public MongoClient getMongoClient() {
        return mongoClient;
    }
    public Datastore createDatastore(Class clazz) {
        Morphia morphia = new Morphia();
        morphia.mapPackage("com.wyc.pims.model");
        return morphia.createDatastore(mongoClient, "pims");
    }
}
