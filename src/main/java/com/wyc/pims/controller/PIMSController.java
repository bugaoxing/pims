package com.wyc.pims.controller;

import com.mongodb.util.JSON;
import com.wyc.pims.model.*;
import com.wyc.pims.mongo.ManagerBuilder;
import com.wyc.pims.util.UnifiedFunctions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by wyc on 2017/3/23.
 */

@Controller
@RequestMapping("/v1/service")
public class PIMSController {

    @RequestMapping(value = "/queryAll", method = RequestMethod.GET, produces = "application/json")
     public
     @ResponseBody
     ResponsePackage getAllPerson() {

        try {
            List<Student> students = ManagerBuilder.build("Student").read();
            return UnifiedFunctions.buildQuickSuccess(students, "成功");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("搜索失败:" + e.getMessage());
        }

    }

    @RequestMapping(value = "/queryAllSchedule", method = RequestMethod.GET, produces = "application/json")
     public
     @ResponseBody
     ResponsePackage queryAllSchedule() {

        try {
            List<Student> students = ManagerBuilder.build("Schedule").read();
            return UnifiedFunctions.buildQuickSuccess(students, "成功");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("搜索失败:" + e.getMessage());
        }

    }
    @RequestMapping(value = "/queryScheduleById", method = RequestMethod.GET, produces = "application/json")
    public
    @ResponseBody
    ResponsePackage queryScheduleById(String id) {

        try {
            Schedule schedule = (Schedule) ManagerBuilder.build("Schedule").findById(id);
            List<Schedule> schedules = new ArrayList<Schedule>();
            schedules.add(schedule);
            return UnifiedFunctions.buildQuickSuccess(schedules, "成功");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("搜索失败:" + e.getMessage());
        }

    }


    @RequestMapping(value = "/queryAllCourse", method = RequestMethod.GET, produces = "application/json")
    public
    @ResponseBody
    ResponsePackage getAllCourse() {

        try {
            List<Course> courses = ManagerBuilder.build("Course").read();
            return UnifiedFunctions.buildQuickSuccess(courses, "成功");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("搜索失败:" + e.getMessage());
        }

    }

    @RequestMapping(value = "/addCourses", method = RequestMethod.POST, produces = "application/json")
    public
    @ResponseBody
    ResponsePackage addCourses(@RequestBody List<Course> courses) {

        try {
            ManagerBuilder.build("Course").insertList(courses);
            return UnifiedFunctions.buildQuickEmptySuccess("成功");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("插入失败:" + e.getMessage());
        }

    }

    @RequestMapping(value = "/initMockData", method = RequestMethod.POST, produces = "application/json")
    public
    @ResponseBody
    ResponsePackage mockData() {

        try {
            //Mock major data
//            List<Major> majors = new ArrayList<Major>();
//            for(MajorType majorType:MajorType.values()){
//                Major major = new Major();
//                try {
//                    Thread.sleep(100);
//                } catch (InterruptedException e) {
//                    e.printStackTrace();
//                }
//                major.setId(String.valueOf(new Date().getTime()));
//                major.setMajor(majorType.name());
//                majors.add(major);
//            }
//            ManagerBuilder.build("Major").insertList(majors);

            //TODO add another mock data

            List<Schedule> schedules = new ArrayList<Schedule>();
            for(MajorType majorType:MajorType.values()){
                Schedule schedule = new Schedule();
                try {
                    Thread.sleep(10);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                schedule.setId(String.valueOf(new Date().getTime()));
                schedule.setClassName(majorType.name()+"01");
                schedule.setPeriod("大一上");
                schedules.add(schedule);
            }
            ManagerBuilder.build("Schedule").insertList(schedules);



            return UnifiedFunctions.buildQuickEmptySuccess("成功");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("插入失败:" + e.getMessage());
        }

    }


    @RequestMapping(value = "/addMajors", method = RequestMethod.POST, produces = "application/json")
    public
    @ResponseBody
    ResponsePackage addMajors(@RequestBody List<Major> majors) {

        try {
            ManagerBuilder.build("Major").insertList(majors);
            return UnifiedFunctions.buildQuickEmptySuccess("成功");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("插入失败:" + e.getMessage());
        }

    }

    @RequestMapping(value = "/queryAllMajors", method = RequestMethod.GET, produces = "application/json")
    public
    @ResponseBody
    ResponsePackage queryAllMajors() {

        try {
            List<Course> courses = ManagerBuilder.build("Major").read();
            return UnifiedFunctions.buildQuickSuccess(courses, "成功");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("搜索失败:" + e.getMessage());
        }

    }



    @RequestMapping(value = "/deleteCourse", method = RequestMethod.POST, produces = "application/json")
    public
    @ResponseBody
    ResponsePackage delCourses(@RequestBody String id) {

        try {

            Map<String, String> maps = (Map) JSON.parse(id);
            ManagerBuilder.build("Course").delete(maps.get("id"));

            return UnifiedFunctions.buildQuickEmptySuccess("成功");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("删除失败:" + e.getMessage());
        }

    }


    @RequestMapping(value = "/addPerson", method = RequestMethod.POST, produces = "application/json")
    public
    @ResponseBody
    ResponsePackage addPerson(@RequestBody Student student) {

        try {
            List<Student> students = ManagerBuilder.build("Student").read();
            int nextNumber = 100000;
            if (students.size() > 0) {
                for (Student student1 : students) {
                    if (student1.getNumber() > nextNumber) {
                        nextNumber = student1.getNumber();
                    }
                }
                nextNumber = nextNumber + 1;
                for (Student student1 : students) {
                    if (student1.getNumber() == 0) {
                        student1.setNumber(nextNumber++);
                        ManagerBuilder.build("Student").insert(student1);
                    }
                }
            }
            student.setNumber(nextNumber);
            ManagerBuilder.build("Student").insert(student);
            return UnifiedFunctions.buildQuickEmptySuccess("成功");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("插入失败:" + e.getMessage());
        }

    }

    @RequestMapping(value = "/addPersons", method = RequestMethod.POST, produces = "application/json")
     public
     @ResponseBody
     ResponsePackage addPersons(@RequestBody List<Student> students) {

        try {
            ManagerBuilder.build("Student").insertList(students);
            return UnifiedFunctions.buildQuickEmptySuccess("成功");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("插入失败:" + e.getMessage());
        }

    }

    @RequestMapping(value = "/addSchedule", method = RequestMethod.POST, produces = "application/json")
    public
    @ResponseBody
    ResponsePackage addSchedule(@RequestBody List<Schedule> schedules) {

        try {
            ManagerBuilder.build("Schedule").insertList(schedules);
            return UnifiedFunctions.buildQuickEmptySuccess("成功");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("插入失败:" + e.getMessage());
        }

    }

    @RequestMapping(value = "/deletePerson", method = RequestMethod.POST, produces = "application/json")
    public
    @ResponseBody
    ResponsePackage addPersons(@RequestBody String id) {

        try {
            Map<String, String> maps = (Map) JSON.parse(id);
            ManagerBuilder.build("Student").delete(maps.get("id"));
            return UnifiedFunctions.buildQuickEmptySuccess("成功");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("删除失败:" + e.getMessage());
        }

    }


    @RequestMapping(value = "/register", method = RequestMethod.POST, produces = "application/json")
    public
    @ResponseBody
    ResponsePackage register(@RequestBody User user) {

        try {
            if (user.getId().equals("10000000")) {
                UnifiedFunctions.buildQuickError("该用户已注册");
            }
            long existCount = ManagerBuilder.build("User").findExist(user.getId());
            if (existCount > 0)
                return UnifiedFunctions.buildQuickError("该用户已经注册");
            ManagerBuilder.build("User").insert(user);
            return UnifiedFunctions.buildQuickEmptySuccess("注册成功");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("注册失败:" + e.getMessage());
        }

    }

    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json")
    public
    @ResponseBody
    ResponsePackage login(@RequestBody User user) {

        try {
            if (user.getId().equals("10000000") && user.getPassword().equals("1234")) {
                List<User> adminUserList = new ArrayList<User>();
                User admin = new User();
                admin.setId("10000000");
                admin.setPassword("");
                admin.setRole("admin");
                adminUserList.add(admin);
                return UnifiedFunctions.buildQuickSuccess(adminUserList, "登录成功");
            }
            User findUser = (User) ManagerBuilder.build("User").findById(user.getId());
            List<User> loggedUser = new ArrayList<User>();
            if (findUser.getPassword().equals(user.getPassword())) {
                findUser.setPassword("");
                loggedUser.add(findUser);
                return UnifiedFunctions.buildQuickSuccess(loggedUser, "登录成功");
            } else {
                return UnifiedFunctions.buildQuickError("登录失败");
            }

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("登录失败:" + e.getMessage());
        }

    }

}
