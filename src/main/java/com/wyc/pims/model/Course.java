package com.wyc.pims.model;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

import java.util.Date;
import java.util.List;

/**
 * 课程
 * Created by wyc on 2017/4/13.
 */
@Entity
public class Course {

    @Id
    String id;
    //课程 外键 Major major
    String major;
    //课程名
    String courseName;
    //课程老师
    String courseTeacher;
    //学分
    String score;
    //课程类别
    CourseType courseType;
    //所属专业
    MajorType majorType;


    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public MajorType getMajorType() {
        return majorType;
    }

    public void setMajorType(MajorType majorType) {
        this.majorType = majorType;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseTeacher() {
        return courseTeacher;
    }

    public void setCourseTeacher(String courseTeacher) {
        this.courseTeacher = courseTeacher;
    }

    public String getScore() {
        return score;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public CourseType getCourseType() {
        return courseType;
    }

    public void setCourseType(CourseType courseType) {
        this.courseType = courseType;
    }
}
