package com.wyc.pims.model;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

/**
 * 学生总体信息
 * Created by wyc on 2017/3/23.
 */
@Entity
public class Student{

    @Id
    String id;
    //学号
    int number;
    //主修,专业
    String major;
    //班级名
    String className;
    //整体学业总评
    int points;
    //宿舍
    String room;
    //班主任
    String masterName;
    //姓名
    String name;
    //年龄
    String age;
    //性别
    String sex;
    //体重
    String weight;
    //身高
    String height;
    //祖籍
    String region;
    //联系方式
    String phone;
    //常住地址
    String address;
    //次要联系人联系方式
    String subContactPhone;
    //次要联系人姓名
    String subContactPerson;


    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }


    public String getAge() {
        return age;
    }


    public void setAge(String age) {
        this.age = age;
    }


    public String getSex() {
        return sex;
    }

    
    public void setSex(String sex) {
        this.sex = sex;
    }

    
    public String getWeight() {
        return weight;
    }


    public void setWeight(String weight) {
        this.weight = weight;
    }


    public String getHeight() {
        return height;
    }


    public void setHeight(String height) {
        this.height = height;
    }


    public String getRegion() {
        return region;
    }


    public void setRegion(String region) {
        this.region = region;
    }


    public String getPhone() {
        return phone;
    }


    public void setPhone(String phone) {
        this.phone = phone;
    }


    public String getAddress() {
        return address;
    }


    public void setAddress(String address) {
        this.address = address;
    }


    public String getSubContactPhone() {
        return subContactPhone;
    }


    public void setSubContactPhone(String subContactPhone) {
        this.subContactPhone = subContactPhone;
    }


    public String getSubContactPerson() {
        return subContactPerson;
    }


    public void setSubContactPerson(String subContactPerson) {
        this.subContactPerson = subContactPerson;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

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

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getMasterName() {
        return masterName;
    }

    public void setMasterName(String masterName) {
        this.masterName = masterName;
    }
}
