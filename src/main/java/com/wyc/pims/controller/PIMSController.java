package com.wyc.pims.controller;

import com.wyc.pims.model.ResponsePackage;
import com.wyc.pims.model.Student;
import com.wyc.pims.mongo.ManagerBuilder;
import com.wyc.pims.util.UnifiedFunctions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by Phoenix on 2017/3/23.
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
            ManagerBuilder.build("Student").delete(id);
            return UnifiedFunctions.buildQuickEmptySuccess("成功");

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return UnifiedFunctions.buildQuickError("删除失败:"+e.getMessage());
        }

    }


}
