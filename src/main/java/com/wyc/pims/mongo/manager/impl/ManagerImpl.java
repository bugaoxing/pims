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

    public ManagerImpl(Class<T> tClass) {
        datastore = new DAOImpl().createDatastore(tClass);
        defaultClaz = tClass;
    }

    public Key<T> insert(T t) {
        return datastore.save(t);
    }

    public Iterable<Key<T>> insertList(List<T> list) {
        return datastore.save(list);
    }

    public void delete(String id) {

        datastore.delete(datastore.createQuery(Student.class).filter("_id", id));
    }

    public void update() {

    }

    public List<T> read() {
        return datastore.find(defaultClaz).asList();
    }
}
