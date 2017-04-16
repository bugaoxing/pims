package com.wyc.pims.model;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

import java.util.Date;
import java.util.List;

/**
 * 专业信息
 *
 <li><a target="_self" ng-click="$parent.addServerRequest.major='计算机科学与技术';">计算机科学与技术</a></li>
 <li><a target="_self" ng-click="$parent.addServerRequest.major='天文';">天文</a></li>
 <li><a target="_self" ng-click="$parent.addServerRequest.major='文学与艺术';">文学与艺术</a></li>
 <li><a target="_self" ng-click="$parent.addServerRequest.major='软件工程';">软件工程</a></li>
 <li><a target="_self" ng-click="$parent.addServerRequest.major='经济管理';">经济管理</a></li>
 <li><a target="_self" ng-click="$parent.addServerRequest.major='德文';">德文</a></li>
 <li><a target="_self" ng-click="$parent.addServerRequest.major='金融';">金融</a></li>
 <li><a target="_self" ng-click="$parent.addServerRequest.major='会计';">会计</a></li>
 <li><a target="_self" ng-click="$parent.addServerRequest.major='游戏设计';">游戏设计</a></li>
 <li><a target="_self" ng-click="$parent.addServerRequest.major='考古';">考古</a></li>
 <li><a target="_self" ng-click="$parent.addServerRequest.major='土木工程';">土木工程</a></li>
 <li><a target="_self" ng-click="$parent.addServerRequest.major='英文';">英文</a></li>
 * Created by wyc on 2017/4/13.
 */
@Entity
public class Major {

    @Id
    String id;
    //专业名 外键student major
    String major;
    //专业主修课程名
    List<String> majorCourse;
    //专业介绍
    String majorDescription;
    //专业创立年份
    Date majorStartDate;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public List<String> getMajorCourse() {
        return majorCourse;
    }

    public void setMajorCourse(List<String> majorCourse) {
        this.majorCourse = majorCourse;
    }

    public String getMajorDescription() {
        return majorDescription;
    }

    public void setMajorDescription(String majorDescription) {
        this.majorDescription = majorDescription;
    }

    public Date getMajorStartDate() {
        return majorStartDate;
    }

    public void setMajorStartDate(Date majorStartDate) {
        this.majorStartDate = majorStartDate;
    }
}
