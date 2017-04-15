package com.wyc.pims.model;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

import java.util.Date;

/**
 * 课外活动实践
 * Created by wyc on 2017/4/13.
 */
@Entity
public class OuterStudy {

    @Id
    String id;
    //课外实践学生id
    String personId;
    //课外实践名
    String outerStudyName;
    //课外实践总分
    String outerStudyScore;
    //课外实践开始时间
    Date outerStudyStartDate;
    //课外实践结束时间
    Date outerStudyEndDate;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPersonId() {
        return personId;
    }

    public void setPersonId(String personId) {
        this.personId = personId;
    }

    public String getOuterStudyName() {
        return outerStudyName;
    }

    public void setOuterStudyName(String outerStudyName) {
        this.outerStudyName = outerStudyName;
    }

    public String getOuterStudyScore() {
        return outerStudyScore;
    }

    public void setOuterStudyScore(String outerStudyScore) {
        this.outerStudyScore = outerStudyScore;
    }

    public Date getOuterStudyStartDate() {
        return outerStudyStartDate;
    }

    public void setOuterStudyStartDate(Date outerStudyStartDate) {
        this.outerStudyStartDate = outerStudyStartDate;
    }

    public Date getOuterStudyEndDate() {
        return outerStudyEndDate;
    }

    public void setOuterStudyEndDate(Date outerStudyEndDate) {
        this.outerStudyEndDate = outerStudyEndDate;
    }
}
