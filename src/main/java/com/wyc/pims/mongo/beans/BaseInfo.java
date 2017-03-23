package com.wyc.pims.mongo.beans;


import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Id;

import java.util.Date;

/**
 * Created by vize on 2015/10/31.
 */
public class BaseInfo {
    @Id
    protected ObjectId id;
    protected Date createdDate;

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }
}
