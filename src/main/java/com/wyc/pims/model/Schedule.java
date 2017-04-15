package com.wyc.pims.model;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

import java.util.List;

/**
 * 课程表
 * Created by wyc on 2017/4/14.
 */

@Entity
public class Schedule {

    @Id
    String id;
    //班级名 - 外键Student class name
    String className;
    //具体学期或者时间
    String period;
    //星期一课程
    List<String> mondayClass;
    //星期二课程
    List<String> tuesdayClass;
    //星期三课程
    List<String> wednesdayClass;
    //星期四课程
    List<String> thursdayClass;
    //星期五课程
    List<String> fridayClass;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public List<String> getMondayClass() {
        return mondayClass;
    }

    public void setMondayClass(List<String> mondayClass) {
        this.mondayClass = mondayClass;
    }

    public List<String> getTuesdayClass() {
        return tuesdayClass;
    }

    public void setTuesdayClass(List<String> tuesdayClass) {
        this.tuesdayClass = tuesdayClass;
    }

    public List<String> getWednesdayClass() {
        return wednesdayClass;
    }

    public void setWednesdayClass(List<String> wednesdayClass) {
        this.wednesdayClass = wednesdayClass;
    }

    public List<String> getThursdayClass() {
        return thursdayClass;
    }

    public void setThursdayClass(List<String> thursdayClass) {
        this.thursdayClass = thursdayClass;
    }

    public List<String> getFridayClass() {
        return fridayClass;
    }

    public void setFridayClass(List<String> fridayClass) {
        this.fridayClass = fridayClass;
    }
}
