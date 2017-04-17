PRM.controller('PDController', ["$window", "PRMconf", "ngTableParams", '$loading', 'QueryToolService', '$uibModal', '$scope', '$http', '$filter', '$rootScope', '$timeout', 'PRMconf', '$log', 'noty',
    function ($window, PRMconf, ngTableParams, $loading, QueryToolService, $uibModal, $scope, $http, $filter, $rootScope, $timeout, PRMconf, $log, noty) {


        //课程选择和课程表

        $scope.selOuterCourse = [];
        $scope.selExpCourse = [];

        var outerPad;
        $scope.openOuter = function (event) {
            event.preventDefault();
            outerPad = $uibModal.open({
                animation: true,
                size: "md",
                templateUrl: 'app/partials/modals/exCourse.html',
                //controller: 'EDController',
                scope: $scope

            });
        };

        $scope.closeOuter = function () {
            outerPad.dismiss('cancel');
        };

        $scope.addOuterCourse = function () {
            if ($scope.selOuterCourse.length == 4) {
                noty.show("最多只能选择4门课外实践课程!", 'error');
                return;
            }
            var Outer = $("input[name='inlineRadioOptions']:checked").val();
            if (Outer && $scope.selOuterCourse.indexOf(Outer) < 0) {
                $scope.selOuterCourse.push(Outer)
                //TODO SAVE TO DB
            }
        };

        $scope.clearOuterCourse = function () {
            $scope.selOuterCourse = [];
            //TODO SAVE TO DB
        };


        var expPad;
        $scope.openExp = function (event) {
            event.preventDefault();
            expPad = $uibModal.open({
                animation: true,
                size: "md",
                templateUrl: 'app/partials/modals/expCourse.html',
                //controller: 'EDController',
                scope: $scope

            });
        };

        $scope.closeExp = function () {
            expPad.dismiss('cancel');
        };

        $scope.addExpCourse = function () {
            if ($scope.selExpCourse.length == 2) {
                noty.show("最多只能选择2门选修课!", 'error');
                return;
            }
            var Outer = $("input[name='inlineRadioOptionsE']:checked").val();
            if (Outer && $scope.selExpCourse.indexOf(Outer) < 0) {
                $scope.selExpCourse.push(Outer)
                //TODO SAVE TO DB
            }
        };

        $scope.clearExpCourse = function () {
            $scope.selExpCourse = [];
            //TODO SAVE TO DB
        };


        var schedulePad;
        $scope.classNAME = "";
        $scope.goSchedule = function (classNAME, event) {
            $scope.classNAME = classNAME;
            event.preventDefault();
            schedulePad = $uibModal.open({
                animation: true,
                size: "lg",
                templateUrl: 'app/partials/modals/ScheduleModal.html',
                //controller: 'EDController',
                scope: $scope

            });
            QueryToolService.queryAllSchedule({},function(res){

                var idVal = "";
                for(var i=0;i<res.data.length;i++){
                    if(res.data[i].className == classNAME){
                        idVal = res.data[i].id;
                        break;
                    }
                }
                QueryToolService.queryScheduleByKeyValue({key:"id",value:idVal},function(res){
                    console.log("Now getting schedule");
                    console.dir(res);

                },function(err){

                });

            },function(err){

            });

            //TODO Load schedule from BD

        };

        $scope.closeSchedule = function () {
            schedulePad.dismiss('cancel');
        };






        /////////////&&&&&&&&&&&&&&& end ((((((((((())))))))

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
        var addDomainPop;
        $scope.addServerRequest = {};

        $scope.addNew = function () {

            if (PRMconf.isNullOrEmptyOrUndefined($scope.addServerRequest.name) ||
                PRMconf.isNullOrEmptyOrUndefined($scope.addServerRequest.sex) ||
                PRMconf.isNullOrEmptyOrUndefined($scope.addServerRequest.age) ||
                PRMconf.isNullOrEmptyOrUndefined($scope.addServerRequest.major) ||
                PRMconf.isNullOrEmptyOrUndefined($scope.addServerRequest.className) ||
                PRMconf.isNullOrEmptyOrUndefined($scope.addServerRequest.masterName)) {
                noty.show("请填写所有信息然后再进行保存提交!", 'alert');
                return;
            }

            $loading.start("loadingMask");
            $scope.addServerRequest.id = new Date().getTime();
            QueryToolService.addPerson($scope.addServerRequest, function (res) {
                if (res.successful) {
                    noty.show("添加成功!", 'success');
                    $scope.refreshTable();
                    addDomainPop.dismiss('cancel');
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
            addDomainPop = $uibModal.open({
                animation: true,
                size: "md",
                templateUrl: 'app/partials/modals/addDomain.html',
                //controller: 'EDController',
                scope: $scope

            });
        };

        $scope.closeAddPad = function () {
            addDomainPop.dismiss('cancel');
        };

        $scope.deleteDomain = function (configId) {

            var confirm = $window.confirm("是否确认要删除?");
            if (!confirm) {
                return;
            }
            $loading.start("loadingMask");
            QueryToolService.deletePerson({"id": configId}, function (res) {
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
            "masterName": "导师",
            "number": "学号",
            "className": "班级",
            "points": "总评",
            "room": "宿舍",
            "major": "专业",
            "name": "姓名",
            "age": "年龄",
            "sex": "性别"
        };


        $scope.refreshTable = function () {
            $loading.start("loadingMask");
            QueryToolService.getAllPerson({}, function (res) {
                $rootScope.domainRootInfo = res.data;

                $scope.data = [];
                $scope.columns = [];
                var excludeList = ['id', '$$hashKey', 'region', 'weight', 'height'];
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
                QueryToolService.addPersons(saveRec, function (res) {

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
