package com.wyc.pims.controller;

import com.google.gson.JsonObject;
import com.mongodb.util.JSON;
import com.wyc.pims.model.ResponsePackage;
import com.wyc.pims.model.Student;
import com.wyc.pims.model.User;
import com.wyc.pims.mongo.ManagerBuilder;
import com.wyc.pims.util.UnifiedFunctions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by wyc on 2017/3/23.
 */

@Controller
@RequestMapping("/v1/service")
public class PIMSController {

    @RequestMapping(value = "/queryAll", method = RequestMethod.GET, produces = "application/json")
     public @ResponseBody
     ResponsePackage getAllPerson(){

        try {
            List<Student> students = ManagerBuilder.build("Student").read();
            return UnifiedFunctions.buildQuickSuccess(students,"成功");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("搜索失败:"+e.getMessage());
        }

    }

    @RequestMapping(value = "/addPerson", method = RequestMethod.POST, produces = "application/json")
    public @ResponseBody
    ResponsePackage addPerson(@RequestBody Student student){

        try {
            ManagerBuilder.build("Student").insert(student);
            return UnifiedFunctions.buildQuickEmptySuccess("成功");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("插入失败:"+e.getMessage());
        }

    }

    @RequestMapping(value = "/addPersons", method = RequestMethod.POST, produces = "application/json")
    public @ResponseBody
    ResponsePackage addPersons(@RequestBody List<Student> students){

        try {
            ManagerBuilder.build("Student").insertList(students);
            return UnifiedFunctions.buildQuickEmptySuccess("成功");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("插入失败:"+e.getMessage());
        }

    }

    @RequestMapping(value = "/deletePerson", method = RequestMethod.POST, produces = "application/json")
    public @ResponseBody
    ResponsePackage addPersons(@RequestBody String id){

        try {
            Map<String,String> maps = (Map) JSON.parse(id);
            ManagerBuilder.build("Student").delete(maps.get("id"));
            return UnifiedFunctions.buildQuickEmptySuccess("成功");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("删除失败:"+e.getMessage());
        }

    }


    @RequestMapping(value = "/register", method = RequestMethod.POST, produces = "application/json")
    public @ResponseBody
    ResponsePackage register(@RequestBody User user){

        try {
            long existCount = ManagerBuilder.build("User").findExist(user.getId());
            if(existCount>0)
                return UnifiedFunctions.buildQuickError("该用户已经注册");
            ManagerBuilder.build("User").insert(user);
            return UnifiedFunctions.buildQuickEmptySuccess("注册成功");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("注册失败:"+e.getMessage());
        }

    }

    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json")
    public @ResponseBody
    ResponsePackage login(@RequestBody User user){

        try {
            User findUser = (User) ManagerBuilder.build("User").findById(user.getId());
            List<User> loggedUser = new ArrayList<User>();
            loggedUser.add(findUser);
            if(findUser.getPassword().equals(user.getPassword())){
                return UnifiedFunctions.buildQuickSuccess(loggedUser,"登录成功");
            }else{
                return UnifiedFunctions.buildQuickError("登录失败");
            }

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("登录失败:"+e.getMessage());
        }

    }

}
