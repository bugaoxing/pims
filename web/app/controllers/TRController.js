PRM.controller('TRController', ["PRMconf", "ngTableParams", '$loading', 'TestResultService', '$uibModal', '$scope', '$http', '$filter', '$rootScope', '$timeout', 'PRMconf', '$log', 'noty',
    function (PRMconf, ngTableParams, $loading, TestResultService, $uibModal, $scope, $http, $filter, $rootScope, $timeout, PRMconf, $log, noty) {

        $scope.testDomains = ["ALL", "PGW", "RRP", "OPMS", "WMS", "GWS", "PAS", "PIAPP", "DataQueue", "PROXCheckout"];
        $scope.testGroups = ["ALL"];
        $scope.testMethods = ["ALL"];
        $scope.domainEl = "ALL";
        $scope.testGroupEl = "ALL";
        $scope.testMethodEl = "ALL";
        $scope.data = [];
        $scope.filter_dict = {};

        $scope.domainChange = function () {
            if ($scope.domainEl == "ALL") {
                $scope.testGroups = ["ALL"];
                $scope.testGroupEl = "ALL";
                $scope.testMethods = ["ALL"];
                $scope.testMethodEl = "ALL";
                return;
            }
            var searchTestGroupReqObj = {
                testdomain: $scope.domainEl
            };
            $loading.start("loadingMask");
            TestResultService.fetchtestgroup(searchTestGroupReqObj, function (res) {

                $scope.testGroups = ["ALL"];
                angular.forEach(res.testgroup, function (rec) {
                    $scope.testGroups.push(rec);
                });
                $loading.finish("loadingMask");
            }, function (ErrRes) {
                noty.show("Error Getting test Groups, will default set to ALL", 'error');
                $loading.finish("loadingMask");
            })

        };

        $scope.testGroupChange = function () {
            if ($scope.testGroupEl == "ALL") {
                $scope.testMethods = ["ALL"];
                $scope.testMethodEl = "ALL";
                return;
            }
            var searchTestMethodReqObj = {
                testdomain: $scope.domainEl,
                testgroup: $scope.testGroupEl
            };
            $loading.start("loadingMask");
            TestResultService.fetchTestMethods(searchTestMethodReqObj, function (res) {

                $scope.testMethods = ["ALL"];
                angular.forEach(res.testmethod, function (rec) {
                    $scope.testMethods.push(rec);
                });
                $loading.finish("loadingMask");
            }, function (ErrRes) {
                noty.show("Error Getting test Groups, will default set to ALL", 'error');
                $loading.finish("loadingMask");
            })

        };

        var excludeList = ["_id"];

        $scope.lastSuccess = function(){
            //testdomain & testmethod & testgroup
            var ReqObj = {
                testdomain: $scope.domainEl == "ALL" ? "" : $scope.domainEl,
                testgroup: $scope.testGroupEl == "ALL" ? "" : $scope.testGroupEl,
                testmethod: $scope.testMethodEl == "ALL" ? "" : $scope.testMethodEl,
                startTestDate: $("#startDate").val(),
                endTestDate: $("#endDate").val()
            };

            $loading.start("loadingMask");
            TestResultService.fetchLastSuccess(ReqObj, function (res) {
                $scope.data = [];
                $scope.columns = [];
                var response = res.details;

                if (response.length > 0) {
                    var subKeys = Object.keys(response[0]);
                    for (var i = 0; i < subKeys.length; i++) {
                        $scope.columns.push({
                            title: 'testIndex' == subKeys[i] ? 'MAUI' : subKeys[i],
                            field: subKeys[i],
                            visible: excludeList.indexOf(subKeys[i]) > -1 ? false : true,
                            visibleOption: true,
                            groupable: subKeys[i]
                        });
                    }
                    //response = delete response._id;
                    //angular.forEach(excludeList,function(removeColumn){
                    //    delete response[removeColumn];
                    //});
                    $scope.data = response;


                }
                $scope.tableParams.reload();
                $loading.finish("loadingMask");


            }, function (errRes) {
                noty.show("Query failed: " + errRes.statusText, 'error');
                $loading.finish("loadingMask");
            });

        };

        $scope.passRate = function () {
            $scope.filter_dict = {};
            var ReqObj = {
                testdomain: $scope.domainEl == "ALL" ? "" : $scope.domainEl,
                testgroup: $scope.testGroupEl == "ALL" ? "" : $scope.testGroupEl,
                testmethod: $scope.testMethodEl == "ALL" ? "" : $scope.testMethodEl,
                startTestDate: $("#startDate").val(),
                endTestDate: $("#endDate").val()
            };
            $loading.start("loadingMask");
            TestResultService.fetchpassrate(ReqObj, function (res) {
                $scope.data = [];
                $scope.columns = [];
                var response = res.passrate;

                if (response) {
                    $scope.columns.push(
                        {
                            title: 'Test Method',
                            field: 'testMethod',
                            visible: true,
                            visibleOption: true
                        },
                        {
                            title: 'Pass Rate',
                            field: 'passRate',
                            visible: true,
                            visibleOption: true
                        });
                    console.dir($scope.columns);
                    var subKeys = Object.keys(response);
                    for (var i = 0; i < subKeys.length; i++) {
                        $scope.data.push({
                            testMethod: subKeys[i],
                            passRate: response[subKeys[i]],
                        });
                    }

                    console.dir($scope.data);
                }
                $scope.tableParams.reload();
                $loading.finish("loadingMask");

            }, function (error) {

                $loading.finish("loadingMask");

            });

        };

        $scope.showResult = function () {

            $scope.filter_dict = {};
            var ReqObj = {
                testdomain: $scope.domainEl == "ALL" ? "" : $scope.domainEl,
                testgroup: $scope.testGroupEl == "ALL" ? "" : $scope.testGroupEl,
                testmethod: $scope.testMethodEl == "ALL" ? "" : $scope.testMethodEl,
                startTestDate: $("#startDate").val(),
                endTestDate: $("#endDate").val()
            };
            $loading.start("loadingMask");
            TestResultService.fetchdatabydaterange(ReqObj, function (res) {
                $scope.data = [];
                $scope.columns = [];
                var response = res.details;

                if (response.length > 0) {
                    var subKeys = Object.keys(response[0]);
                    for (var i = 0; i < subKeys.length; i++) {
                        $scope.columns.push({
                            title: 'testIndex' == subKeys[i] ? 'MAUI' : subKeys[i],
                            field: subKeys[i],
                            visible: excludeList.indexOf(subKeys[i]) > -1 ? false : true,
                            visibleOption: true,
                            groupable: subKeys[i]
                        });
                    }
                    //response = delete response._id;
                    //angular.forEach(excludeList,function(removeColumn){
                    //    delete response[removeColumn];
                    //});
                    $scope.data = response;


                }
                $scope.tableParams.reload();
                $loading.finish("loadingMask");


            }, function (errRes) {
                noty.show("Query failed: " + errRes.statusText, 'error');
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


        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: PRMconf.DEFAULT_PAGE_SIZE,         // count per page
            filter: $scope.filter_dict

        }, {
            //counts: [],
            //data: $scope.data,
            //total: 0,
            getData: function ($defer, params) {
                var data = [];
                angular.copy($scope.data, data);
                data = $filter('filter')(data, $scope.filter_dict);
                data = $filter('orderBy')(data, $scope.sortByColumn, $scope.reverse);
                params.total(data.length);
                $scope.totalRows = data.length;
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));


            }
        });

    }]);
