package com.wyc.pims.mongo.manager.impl;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.wyc.pims.model.Student;
import com.wyc.pims.mongo.dao.impl.DAOImpl;
import com.wyc.pims.mongo.manager.Manager;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Key;

import java.util.List;

/**
 * Created by wycwang on 2015/9/14.
 */
public class ManagerImpl<T> implements Manager<T> {
    private Datastore datastore = null;
    private Class<T> defaultClaz;
    private String collectionName;

    public ManagerImpl(Class<T> tClass, String collectionName) {
        datastore = new DAOImpl().createDatastore(tClass);
        defaultClaz = tClass;
        this.collectionName = collectionName;
    }

    public Key<T> insert(T t) {
        return datastore.save(t);
    }

    public Iterable<Key<T>> insertList(List<T> list) {
        return datastore.save(list);
    }

    public void delete(String id) {

        datastore.delete(datastore.createQuery(defaultClaz).filter("_id", id));
    }

    public List<T> findByColumn(String column,String value) {

        return datastore.createQuery(defaultClaz).filter(column, value).asList();
    }

    public long findExist(String t) {
        return datastore.getCount(datastore.createQuery(defaultClaz).filter("_id", t));
    }

    public void update() {

    }
    public T findById(String id) {
        return datastore.getByKey(defaultClaz,new Key<T>(defaultClaz,collectionName,id));
    }



    public List<T> read() {
        return datastore.find(defaultClaz).asList();
    }
}
