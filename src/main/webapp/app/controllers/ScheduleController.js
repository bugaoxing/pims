PRM.controller('SHController', ["$window", "PRMconf", "ngTableParams", '$loading', 'QueryToolService', '$uibModal', '$scope', '$http', '$filter', '$rootScope', '$timeout', 'PRMconf', '$log', 'noty',
    function ($window, PRMconf, ngTableParams, $loading, QueryToolService, $uibModal, $scope, $http, $filter, $rootScope, $timeout, PRMconf, $log, noty) {


        $scope.period = ["大一上", "大一下", "大二上", "大二下", "大三上", "大三下", "大四上", "大四下"];
        $scope.selPe = null;
        $scope.selClass = null;
        $scope.scheduleFlag = false;
        $scope.allScheduleInDetails = [];
        $scope.dataz = [];

        $scope.periodChange = function (selpe) {
            if ($scope.selectedMajor == null) {
                noty.show("请先选择专业再选择学期", 'info');
                return;
            }
            $scope.selPe = selpe;
            console.log($scope.selPe);
        };

        $scope.classChange = function (className) {
            if ($scope.selectedMajor == null || $scope.selPe == null) {
                noty.show("请先选择专业和学期以后,再选择班级", 'info');
                return;
            }
            if (className != null) {
                $scope.scheduleFlag = true;
            }
            $scope.selClass = className;


        };



        $scope.selectedMajor = null;
        $scope.selectedCourseToAdd = null;
        $scope.selectedCourseList = [];
        $scope.selDelCourses = [];
        $scope.allMajorsInDetails = [];


        $scope.selDelC = function (course) {
            if ($scope.selDelCourses.indexOf(course) < 0) {
                $scope.selDelCourses.push(course);
            }
        };

        $scope.delSelCImple = function () {

            var reqObjList = [];
            var reqObj = {};
            for (var i = 0; i < $scope.allMajorsInDetails.length; i++) {
                if ($scope.allMajorsInDetails[i].major == $scope.selectedMajor) {
                    reqObj = $scope.allMajorsInDetails[i];
                    break;
                }
            }
            for (var i = 0; i < $scope.selectedCourseList.length; i++) {
                for (var j = 0; j < $scope.selDelCourses.length; j++) {
                    if ($scope.selectedCourseList[i] == $scope.selDelCourses[j]) {
                        $scope.selectedCourseList.splice(i, 1);
                    }
                }
            }
            reqObj.majorCourse = $scope.selectedCourseList;
            reqObjList.push(reqObj);
            $loading.start("loadingMask");
            QueryToolService.addMajors(reqObjList, function (res) {
                noty.show("删除成功!", 'success');
                getAllMajors($scope.selectedMajor);
                $loading.finish("loadingMask");
            }, function (err) {
                $loading.finish("loadingMask");
            });

        };

        function getAllMajors(major) {
            $loading.start("loadingMask");
            QueryToolService.queryAllMajors({}, function (res) {

                if (res.data) {
                    $scope.allMajorsInDetails = res.data;
                    $scope.allMajorsInDetails.sort();
                    if (major != null) {
                        for (var i = 0; i < $scope.allMajorsInDetails.length; i++) {
                            if ($scope.allMajorsInDetails[i].major == major) {
                                $scope.selectedCourseList = $scope.allMajorsInDetails[i].majorCourse;
                                break;
                            }
                        }
                    }
                }
                $loading.finish("loadingMask");
            }, function (error) {
                $loading.finish("loadingMask");
            });
        }

        $timeout(getAllMajors(null), 200);


        $scope.majorExchange = function (major) {
            $scope.selectedMajor = major;
            $scope.selectedCourseList = [];
            $scope.selClass = null;
            $scope.selPe = null;
            $scope.scheduleFlag = false;
            $timeout(getAllMajors(major),200);
            $timeout($scope.refreshTable(),400);



        };

        $scope.courseAddToMajor = function (course) {
            $scope.selectedCourseToAdd = course;

        };


        function getCurrentMajorObject(selCourse) {
            var pureCourseName = selCourse;
            var reqObj = {};
            for (var i = 0; i < $scope.allMajorsInDetails.length; i++) {
                if ($scope.allMajorsInDetails[i].major == $scope.selectedMajor) {
                    reqObj = $scope.allMajorsInDetails[i];
                    break;
                }
            }
            if (reqObj.majorCourse) {
                for (var j = 0; j < reqObj.majorCourse.length; j++) {
                    if (reqObj.majorCourse.indexOf(pureCourseName) < 0)
                        reqObj.majorCourse.push(pureCourseName);
                }
            } else {
                var newArray = [];
                newArray.push(pureCourseName);
                reqObj.majorCourse = newArray;
            }
            delete reqObj.$$hashKey;
            return reqObj;
        }

        $scope.addCourseToMajor = function () {
            var pureCourseName = $scope.selectedCourseToAdd.substr(0, $scope.selectedCourseToAdd.indexOf('('));
            if ($scope.selectedCourseList.indexOf(pureCourseName) > 0) {

                noty.show("该课程已经添加到该专业中,请勿重复添加!", 'info');
                return;
            }

            var reqObjList = [];
            reqObjList.push(getCurrentMajorObject(pureCourseName));
            $loading.start("loadingMask");
            QueryToolService.addMajors(reqObjList, function (res) {
                noty.show("添加成功!", 'success');
                getAllMajors($scope.selectedMajor);
                $loading.finish("loadingMask");
            }, function (err) {
                $loading.finish("loadingMask");
            });

        };


        $scope.sortByColumn = "id";
        $scope.sortTable = function (selColumn) {
            $scope.sortByColumn = selColumn;
            $scope.tableParams.reload();
        };
        $scope.filter_dict = {};
        $scope.editOn = false;
        $scope.editText = "编辑";
        $scope.data = [];
        $scope.dataz = [];
        var saveIdList = [];
        var addCoursePop;
        $scope.addServerRequest = {};


        $scope.addNew = function () {

            if (PRMconf.isNullOrEmptyOrUndefined($scope.addServerRequest.courseTeacher) ||
                PRMconf.isNullOrEmptyOrUndefined($scope.addServerRequest.courseType) ||
                PRMconf.isNullOrEmptyOrUndefined($scope.addServerRequest.score) ||
                PRMconf.isNullOrEmptyOrUndefined($scope.addServerRequest.courseName)) {
                noty.show("请填写所有信息然后再进行保存提交!", 'alert');
                return;
            }

            $loading.start("loadingMask");
            $scope.addServerRequest.id = new Date().getTime();
            var courseList = [];
            courseList.push($scope.addServerRequest);
            QueryToolService.addCourses(courseList, function (res) {
                if (res.successful) {
                    noty.show("添加成功!", 'success');
                    $scope.refreshTable();
                    addCoursePop.dismiss('cancel');
                } else {
                    noty.show(res.message, 'error');
                }

                $loading.finish("loadingMask");
            }, function (error) {
                $loading.finish("loadingMask");
            })
        };

        $scope.addNewPop = function (event) {
            event.preventDefault();
            $scope.addServerRequest = {};
            addCoursePop = $uibModal.open({
                animation: true,
                size: "md",
                templateUrl: 'app/partials/modals/addCourse.html',
                //controller: 'EDController',
                scope: $scope

            });
        };

        $scope.closeAddPad = function () {
            addCoursePop.dismiss('cancel');
        };

        $scope.deleteDomain = function (configId) {

            var confirm = $window.confirm("是否确认要删除?");
            if (!confirm) {
                return;
            }
            $loading.start("loadingMask");
            QueryToolService.deleteCourses({"id": configId}, function (res) {
                noty.show("删除成功!", 'success');
                $scope.refreshTable();
                $loading.finish("loadingMask");
            }, function (error) {
                $loading.finish("loadingMask");
                noty.show("删除失败!", 'error');
            });


        };


        $scope.allCourses = [];
        $scope.refreshTable = function () {
            if ($scope.selectedMajor == null)
                return;
            console.log($scope.selectedMajor);
            $loading.start("loadingMask");
            QueryToolService.queryAllSchedule({}, function (res) {
                if (!res.data) {
                    noty.show("没有找到相关记录", "error");
                }
                for (var j = 0; j < res.data.length; j++) {
                    if (res.data[j].className.indexOf($scope.selectedMajor) >= 0) {
                        console.log("fid");
                        $scope.allScheduleInDetails = res.data[j];
                        break;
                    }
                }
                console.dir($scope.allScheduleInDetails);
                var oneClass = $scope.allScheduleInDetails.mondayClass || [];
                var twoClass = $scope.allScheduleInDetails.tuesdayClass || [];
                var threeClass = $scope.allScheduleInDetails.wednesdayClass || [];
                var fourClass = $scope.allScheduleInDetails.thursdayClass || [];
                var fiveClass = $scope.allScheduleInDetails.fridayClass || [];
                $scope.dataz = [];

                //上午
                for (var i = 0; i < 2; i++) {
                    $scope.dataz.push({

                        timePeriod: (i * 2 + 7) + ":00" + "~" + (i * 2 + 9) + ":00",
                        mondayClass: oneClass[i] || "休息",
                        tuesdayClass: twoClass[i] || "休息",
                        wednesdayClass: threeClass[i] || "休息",
                        thursdayClass: fourClass[i] || "休息",
                        fridayClass: fiveClass[i] || "休息"

                    });
                }
                //下午
                for (var i = 0; i < 2; i++) {
                    $scope.dataz.push({

                        timePeriod: (i * 2 + 13) + ":00" + "~" + (i * 2 + 15) + ":00",
                        mondayClass: oneClass[i + 2] || "休息",
                        tuesdayClass: twoClass[i + 2] || "休息",
                        wednesdayClass: threeClass[i + 2] || "休息",
                        thursdayClass: fourClass[i + 2] || "休息",
                        fridayClass: fiveClass[i + 2] || "休息"

                    });
                }


                $scope.columns = [];
                $scope.columns.push({
                    title: "时间",
                    field: 'timePeriod',
                    visible: true,
                    showFilter: false
                });
                $scope.columns.push({
                    title: "星期一",
                    field: 'mondayClass',
                    visible: true,
                    showFilter: false
                });
                $scope.columns.push({
                    title: "星期二",
                    field: 'tuesdayClass',
                    visible: true,
                    showFilter: false
                });
                $scope.columns.push({
                    title: "星期三",
                    field: 'wednesdayClass',
                    visible: true,
                    showFilter: false
                });
                $scope.columns.push({
                    title: "星期四",
                    field: 'thursdayClass',
                    visible: true,
                    showFilter: false
                });
                $scope.columns.push({
                    title: "星期五",
                    field: 'fridayClass',
                    visible: true,
                    showFilter: false
                });

                $scope.tableParams.reload();

                if (res.successful == true && res.data && res.data.length == 0)
                    noty.show("信息获取失败", 'error');
                $loading.finish("loadingMask");
            }, function (error) {
                $loading.finish("loadingMask");
            });
            //$scope.tableParams.reload();
        };

        $scope.recordToSave = function (id) {
            if (saveIdList.indexOf(id) < 0)
                saveIdList.push(id)
        };

        $scope.editModeChange = function () {
            if ($scope.editText == "锁定") {
                $scope.editText = "编辑";
                $scope.editOn = false;
            } else {
                $scope.editText = "锁定";
                $scope.editOn = true;
            }


        };

        $scope.saveChanges = function () {

            var saveObj = {"id": $scope.allScheduleInDetails.id};
            saveObj.mondayClass = [];
            saveObj.tuesdayClass = [];
            saveObj.wednesdayClass = [];
            saveObj.thursdayClass = [];
            saveObj.fridayClass = [];

            for (var i = 0; i < $scope.dataz.length; i++) {
                saveObj.mondayClass.push($scope.dataz[i].mondayClass);
                saveObj.tuesdayClass.push($scope.dataz[i].tuesdayClass);
                saveObj.wednesdayClass.push($scope.dataz[i].wednesdayClass);
                saveObj.thursdayClass.push($scope.dataz[i].thursdayClass);
                saveObj.fridayClass.push($scope.dataz[i].fridayClass);
            }

            saveObj.className = $scope.selClass;
            saveObj.period = $scope.selPe;

            var saveObjList = [];
            saveObjList.push(saveObj);
            console.dir(saveObjList);
            $loading.start("loadingMask");
            QueryToolService.addSchedule(saveObjList, function (res) {

                noty.show("保存成功!", "success");
                $scope.refreshTable();
                $loading.finish("loadingMask");

            }, function (error) {
                noty.show("保存失败: " + error.statusText, 'error');
                $loading.finish("loadingMask");
            });


        };

        $scope.filterPress = function () {
            $scope.tableParams.reload();

        };

        $scope.sortTable = function (sortColumn) {
            $scope.sortByColumn = sortColumn;
            $scope.reverse = !$scope.reverse;
            $scope.tableParams.reload();
        };

        $scope.tableParams = new ngTableParams(
            {
                page: 1,            // show first page
                count: PRMconf.DEFAULT_PAGE_SIZE,         // count per page
                filter: $scope.filter_dict

            },
            {
                counts: [],
                //data: $scope.data,
                //total: 0,
                getData: function ($defer, params) {
                    params.total($scope.dataz.length);
                    $scope.totalRows = $scope.dataz.length;
                    $defer.resolve($scope.dataz.slice((params.page() - 1) * params.count(), params.page() * params.count()));


                }
            });
        $timeout(function () {
            $scope.refreshTable();
        }, 500);
    }]);
