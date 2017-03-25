package com.wyc.pims.mongo.dao;

import com.mongodb.MongoClient;
import org.mongodb.morphia.Datastore;

/**
 * Created by wycwang on 2015/9/14.
 */
public interface DAO {

    MongoClient getMongoClient();

    void resetMongoClient(MongoClient mc);

    Datastore createDatastore(Class clazz);
}
