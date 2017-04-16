PRM.controller('CEController', ["$window", "PRMconf", "ngTableParams", '$loading', 'QueryToolService', '$uibModal', '$scope', '$http', '$filter', '$rootScope', '$timeout', 'PRMconf', '$log', 'noty',
    function ($window, PRMconf, ngTableParams, $loading, QueryToolService, $uibModal, $scope, $http, $filter, $rootScope, $timeout, PRMconf, $log, noty) {


        $scope.selectedMajor = null;
        $scope.selectedCourseToAdd = null;
        $scope.selectedCourseList = [];
        $scope.selDelCourses = [];
        $scope.allMajorsInDetails = [];


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
            //TODO call get major again
            getAllMajors(major);


        };

        $scope.courseAddToMajor = function (course) {
            $scope.selectedCourseToAdd = course;

        };


        $scope.addCourseToMajor = function () {

            var pureCourseName = $scope.selectedCourseToAdd.substr(0, $scope.selectedCourseToAdd.indexOf('('));
            var reqObjList = [];
            var reqObj = {};
            for (var i = 0; i < $scope.allMajorsInDetails.length; i++) {
                if ($scope.allMajorsInDetails[i].major == $scope.selectedMajor)
                    reqObj = $scope.allMajorsInDetails[i];
                break;
            }
            if (reqObj.majorCourse && Array.isArray(reqObj.majorCourse)) {
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
            reqObjList.push(reqObj);
            console.dir(reqObjList);
            $loading.start("loadingMask");
            QueryToolService.addMajors(reqObjList, function (res) {

                console.dir(res);
                if ($scope.selectedCourseList.indexOf($scope.selectedCourseToAdd) < 0)
                    $scope.selectedCourseList.push(pureCourseName);
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

            //
            //$loading.start("loadingMask");
            //QueryToolService.secretMatching({"se": password}, function (res) {
            //    if (res.successful == true) {
            //        QueryToolService.deletePerson({"id":configId},function(res){
            //            noty.show("删除成功!", 'success');
            //            $scope.refreshTable();
            //            $loading.finish("loadingMask");
            //        },function(error){
            //            $loading.finish("loadingMask");
            //            noty.show("删除失败!", 'error');
            //        });
            //    } else {
            //        noty.show(res.message, 'error');
            //        $loading.finish("loadingMask");
            //    }
            //}, function (error) {
            //    $loading.finish("loadingMask");
            //});


        };

        var NameMapping = {
            "courseName": "课程名",
            "courseTeacher": "课程老师",
            "score": "学分",
            "courseType": "课程类别",
            "major": "课程所属专业"
        };

        $scope.allCourses = [];
        $scope.refreshTable = function () {
            $loading.start("loadingMask");
            QueryToolService.queryAllCourse({}, function (res) {
                $rootScope.domainRootInfo = res.data;
                for (var j = 0; j < res.data.length; j++) {
                    var input = res.data[j].courseName + '(' + res.data[j].courseType + ')';
                    if ($scope.allCourses.indexOf(input) < 0)
                        $scope.allCourses.push(input);
                }
                $scope.data = [];
                $scope.columns = [];
                var excludeList = ['id', '$$hashKey', 'region', 'weight', 'majorType', 'major'];
                //var filterExcludeList = ['id', '$$hashKey', 'region', 'weight', 'height','room','sex','grade'];
                var keys = ($rootScope.domainRootInfo && $rootScope.domainRootInfo.length > 0) ? Object.keys($rootScope.domainRootInfo[0]) : [];
                if (keys.length > 0) {
                    for (var i = 0; i < keys.length; i++) {
                        $scope.columns.push({
                            title: NameMapping[keys[i]],
                            field: keys[i],
                            visible: excludeList.indexOf(keys[i]) > -1 ? false : true,
                            showFilter: true
                        });
                    }
                    $scope.columns.push({
                        title: "",
                        field: "delete",
                        visible: true,
                        showFilter: false
                    });
                    $scope.columns.push({
                        title: "",
                        field: "more",
                        visible: true,
                        showFilter: false
                    });
                    $scope.data.push.apply($scope.data, $rootScope.domainRootInfo);
                }
                $scope.totalRows = $scope.data.length;
                $scope.tableParams.reload();

                if (res.successful == true && res.data.length == 0)
                    noty.show("信息获取失败", 'error');
                $loading.finish("loadingMask");
            }, function (error) {
                $loading.finish("loadingMask");
            });
            $scope.tableParams.reload();
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
            //var password = $window.prompt("请输入密码以继续进行编辑操作...");
            //if (password == null) {
            //    return;
            //}
            //$loading.start("loadingMask");
            //QueryToolService.secretMatching({"se": password}, function (res) {
            //    if (res.successful == true) {
            //        $scope.editOn = true;
            //        $scope.editText = "锁定";
            //        noty.show("验证成功", 'success');
            //    } else {
            //        noty.show(res.message, 'error');
            //    }
            //    $loading.finish("loadingMask");
            //}, function (error) {
            //    $loading.finish("loadingMask");
            //});

        };

        $scope.saveChanges = function () {
            var saveRec = [];
            console.dir(saveIdList);
            if (saveIdList.length == 0) {
                noty.show("没有任何变更.", 'info');
                return;
            }
            angular.forEach($scope.dataz, function (rec) {
                if (saveIdList.indexOf(rec.id) >= 0) {
                    saveRec.push(rec);
                }
            });
            if (saveRec.length > 0) {
                $loading.start("loadingMask");
                QueryToolService.addCourses(saveRec, function (res) {

                    noty.show("保存成功!", "success");
                    saveIdList = [];
                    $loading.finish("loadingMask");

                }, function (error) {
                    noty.show("保存失败: " + error.statusText, 'error');
                    saveIdList = [];
                    $loading.finish("loadingMask");
                });
            }

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
                //counts: [],
                //data: $scope.data,
                //total: 0,
                getData: function ($defer, params) {
                    $scope.dataz = [];
                    angular.copy($scope.data, $scope.dataz);
                    $scope.dataz = $filter('filter')($scope.dataz, $scope.filter_dict);
                    $scope.dataz = $filter('orderBy')($scope.dataz, $scope.sortByColumn, $scope.reverse);
                    params.total($scope.dataz.length);
                    $scope.totalRows = $scope.dataz.length;
                    $defer.resolve($scope.dataz.slice((params.page() - 1) * params.count(), params.page() * params.count()));


                }
            });
        $timeout(function () {
            $scope.refreshTable();
        }, 500);
    }]);
