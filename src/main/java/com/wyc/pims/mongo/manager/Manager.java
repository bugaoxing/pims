package com.wyc.pims.mongo.manager;

import org.mongodb.morphia.Key;

import java.util.List;

/**
 * Created by wycwang on 2015/9/14.
 */
public interface Manager<T> {
    Key<T> insert(T t);
    Iterable<Key<T>> insertList(List<T> tList);
    void delete(String id);
    long findExist(String t);
    T findById(String t);
    void update();
    List<?> read();
}
