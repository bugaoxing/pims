PRM.controller('TSController', ["PRMconf", "ngTableParams", '$loading', 'QueryToolService', '$uibModal', '$scope', '$http', '$filter', '$rootScope', '$timeout', 'PRMconf', '$log', 'noty',
    function (PRMconf, ngTableParams, $loading, QueryToolService, $uibModal, $scope, $http, $filter, $rootScope, $timeout, PRMconf, $log, noty) {

        $scope.paymentDomains = ["ALL", "gw", "opms", "pgw v3", "pgw raptor", "wms", "rrp", "pmtappbes", "pmtappsvc", "piapp", "billing", "loyalty"];
        $scope.searchConditions = ["omsOrderId", "pgTrackingId", "keyWord"];
        $scope.searchPools = ["ALL"];
        $scope.poolEl = ["ALL"];
        $scope.domainEl = ["ALL"];
        $scope.sortByColumn = "";
        $scope.domainDetailList = [];
        $scope.reverse = true;

        var domainList = ["ALL"];
        function getDomainDetails() {
            $loading.start("loadingMask");
            QueryToolService.getAllDomainDetails({}, function (res) {

                if (res.successful == true && res.data.length > 0) {
                    $scope.domainDetailList = res.data;
                    $rootScope.domainRootInfo = $scope.domainDetailList;
                    angular.forEach($scope.domainDetailList, function (rec) {
                        if (domainList.indexOf(rec.domainName) < 0) {
                            domainList.push(rec.domainName);
                        }
                    });
                    $scope.paymentDomains = domainList;
                    $scope.paymentDomains.sort()
                }
                if (res.successful == true && res.data.length == 0)
                    noty.show("Error Getting Domain names, please refresh again", 'error');
                $loading.finish("loadingMask");
            }, function (error) {
                $loading.finish("loadingMask");
            });
        }
        getDomainDetails();



        $scope.domainChange = function () {
            if ($scope.domainEl.length == 1 && $scope.domainEl[0] == "ALL") {
                $scope.poolEl = ["ALL"];
                return;
            }

            $scope.searchPools = ["ALL"];
            angular.forEach($scope.domainEl,function(selectedDomain){
                angular.forEach($scope.domainDetailList,function(domainDetail){
                    if(domainDetail.domainName==selectedDomain && $scope.searchPools.indexOf(domainDetail.poolName)<0){
                        $scope.searchPools.push(domainDetail.poolName);
                    }
                });
            });


        };


        $scope.columns = [];
        $scope.data = [];

        $scope.searchCondi = "keyWord";
        $scope.calIds = [];

        $scope.changeSearchCondition = function (condition) {
            $scope.searchCondi = condition;
        };

        //Binding elements
        $scope.keyWordEl = "";
        //$scope.searchDateEl = "";


        //Function area

        $scope.domainSel = function (selDomain) {

        };

        $scope.poolSel = function (selPool) {

        };

        $scope.genCVS = function () {
            PRMconf.genCVS($scope.data, ["$$hashKey"], true);
        }

        $scope.calIdSelection = function (calId) {

            var calIndex = $scope.calIds.indexOf(calId);
            var addFlag = $('#' + calId).prop('checked');
            if (calIndex >= 0 && addFlag) {
                //Do nothing
            } else if (calIndex >= 0 && !addFlag) {
                $scope.calIds.splice(calIndex, 1);
            } else if (calIndex < 0 && !addFlag) {
                //Do nothing
            } else if (calIndex < 0 && addFlag) {
                $scope.calIds.push(calId)
            }

        };


        $scope.featureSearch = function () {

            if ($scope.keyWordEl == null || $scope.keyWordEl.length < 0 || typeof $scope.keyWordEl == 'undefined' || $scope.keyWordEl == ""
                || $('#featurePoolList').val() == null || $('#featurePoolList').val().length < 0 || typeof $('#featurePoolList').val() == 'undefined' || $('#featurePoolList').val() == "") {
                noty.show("Please enter a valid search condition first", 'alert');
                return null;
            }

            var reqObj = {
                keyword: encodeURIComponent($scope.keyWordEl),
                searchDate: decodeURIComponent($('#searchDate').val()),
                hosts: encodeURIComponent($('#featurePoolList').val())
            };
            $loading.start("loadingMask");
            QueryToolService.fetchCalByKeywordAndFeaturePool(reqObj, function (res) {
                $scope.data = [];
                $scope.columns = [];
                console.dir(res);
                var response = res.calMap;
                var keys = Object.keys(response);

                if (keys.length > 0) {
                    var subKeys = Object.keys(response[keys[0]][0]);
                    for (var i = 0; i < subKeys.length; i++) {
                        $scope.columns.push({
                            title: 'id' == subKeys[i] ? 'Check to Send' : subKeys[i],
                            field: subKeys[i],
                            visible: excludeList.indexOf(subKeys[i]) > -1 ? false : true,
                            visibleOption: true,
                            groupable: subKeys[i]
                        });
                    }
                    angular.forEach(keys, function (key) {
                        $scope.data.push.apply($scope.data, response[key]);
                    });


                }
                $scope.totalRows = $scope.data.length;
                $scope.tableParams.reload();
                $loading.finish("loadingMask");
            }, function (error) {
                $loading.finish("loadingMask");
                noty.show("Query failed: " + error.statusText, 'error');
            });

        };

        $scope.sendEmail = function () {

            //Validation
            var emailList = $('#emailList').val().split(',');
            if (emailList.length <= 0 || emailList == "" || typeof emailList == 'undefined') {
                noty.show("Please enter one valid email address first.", 'error');
                return;
            }
            for (var i = 0; i < emailList.length; i++) {
                if (!isValidEmailAddress(emailList[i])) {
                    noty.show("Email invalid for " + emailList[i], 'error');
                    return;
                }

            }
            if ($scope.calIds.length == 0) {
                noty.show("Not selected calIds in table, please select them before sending mail.", 'error');
                return;
            }
            var sendMailReqObj = {
                emailAddress: $('#emailList').val(),
                calIds: $scope.calIds.join(',')
            };
            $loading.start("loadingMask");
            QueryToolService.sendMailAndCalInfo(sendMailReqObj, function (res) {

                $loading.finish("loadingMask");
                noty.show("Email sent successfully!", 'success');

            }, function (errRes) {
                $loading.finish("loadingMask");
                noty.show("Send email failed, please try again...", 'error');
            })

        };
        //var excludeList=[];
        var excludeList = ["calBody", "paypalRequest", "paypalResponse"];

        function isValidEmailAddress(emailAddress) {
            var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(emailAddress);
        }

        function findByKeyWord() {
            if ($scope.keyWordEl == null || $scope.keyWordEl.length < 0 || $scope.keyWordEl == 'undefined' || $scope.keyWordEl == "") {
                noty.show("Please enter a valid search condition first", 'alert');
                return null;
            }

            $loading.start("loadingMask");
            var keyWordReqObj = {
                keyword: decodeURIComponent($scope.keyWordEl),
                //searchDate: decodeURIComponent("2017/02/13"),
                searchDate: decodeURIComponent($('#searchDate').val()),
                pool: $scope.poolEl.indexOf("ALL") > -1 ? "" : decodeURIComponent($scope.poolEl.join(',')),
                domain: $scope.domainEl.indexOf("ALL") > -1 ? "" : decodeURIComponent($scope.domainEl.join(','))
            };
            QueryToolService.fetchCalByKeyword(keyWordReqObj, function (res) {
                $scope.data = [];
                $scope.columns = [];
                var response = res.calMap;
                var keys = Object.keys(response);

                if (keys.length > 0) {
                    var subKeys = Object.keys(response[keys[0]][0]);
                    for (var i = 0; i < subKeys.length; i++) {
                        $scope.columns.push({
                            title: 'id' == subKeys[i] ? 'Check to Send' : subKeys[i],
                            field: subKeys[i],
                            visible: excludeList.indexOf(subKeys[i]) > -1 ? false : true,
                            visibleOption: true,
                            groupable: subKeys[i]
                        });
                    }
                    angular.forEach(keys, function (key) {
                        $scope.data.push.apply($scope.data, response[key]);
                    });


                }
                $scope.totalRows = $scope.data.length;
                $scope.tableParams.reload();
                $loading.finish("loadingMask");


            }, function (errRes) {
                $loading.finish("loadingMask");
                noty.show("Query failed: " + errRes.statusText, 'error');
            });
        }

        function findByPGTrakId() {
            if ($scope.keyWordEl == null || $scope.keyWordEl.length < 0 || $scope.keyWordEl == 'undefined' || $scope.keyWordEl == "") {
                noty.show("Please enter a valid search condition first", 'alert');
                return null;
            }

            $loading.start("loadingMask");
            var pgTrackReqObj = {
                pgTrackingId: decodeURIComponent($scope.keyWordEl),
                pool: $scope.poolEl.indexOf("ALL") > -1 ? "" : decodeURIComponent($scope.poolEl.join(',')),
            };
            QueryToolService.fetchCalByPgTrackingId(pgTrackReqObj, function (res) {
                $scope.data = [];
                $scope.columns = [];
                var response = res.calMap;
                var keys = Object.keys(response);

                if (keys.length > 0) {
                    var subKeys = Object.keys(response[keys[0]][0]);
                    for (var i = 0; i < subKeys.length; i++) {
                        $scope.columns.push({
                            title: 'id' == subKeys[i] ? 'Check to Send' : subKeys[i],
                            field: subKeys[i],
                            visible: excludeList.indexOf(subKeys[i]) > -1 ? false : true,
                            visibleOption: true,
                            groupable: subKeys[i]
                        });
                    }
                    angular.forEach(keys, function (key) {
                        $scope.data.push.apply($scope.data, response[key]);
                    });


                }
                $scope.totalRows = $scope.data.length;
                $scope.tableParams.reload();
                $loading.finish("loadingMask");


            }, function (errRes) {
                noty.show("Query failed: " + errRes.statusText, 'error');
                $loading.finish("loadingMask");
            });
        }

        function findByOrderId() {
            if ($scope.keyWordEl == null || $scope.keyWordEl.length < 0 || $scope.keyWordEl == 'undefined' || $scope.keyWordEl == "") {
                noty.show("Please enter a valid search condition first", 'alert');
                return null;
            }

            $loading.start("loadingMask");
            var orderReqObj = {
                orderId: decodeURIComponent($scope.keyWordEl),
                searchDate: decodeURIComponent($('#searchDate').val()),
                pool: $scope.poolEl.indexOf("ALL") > -1 ? "" : decodeURIComponent($scope.poolEl.join(',')),
                domain: $scope.domainEl.indexOf("ALL") > -1 ? "" : decodeURIComponent($scope.domainEl.join(','))
            };
            QueryToolService.fetchCalByOrderId(orderReqObj, function (res) {
                $scope.data = [];
                $scope.columns = [];
                var response = res.calMap;
                var keys = Object.keys(response);

                if (keys.length > 0) {
                    var subKeys = Object.keys(response[keys[0]][0]);
                    for (var i = 0; i < subKeys.length; i++) {
                        $scope.columns.push({
                            title: 'id' == subKeys[i] ? 'Check to Send' : subKeys[i],
                            field: subKeys[i],
                            visible: excludeList.indexOf(subKeys[i]) > -1 ? false : true,
                            visibleOption: true,
                            groupable: subKeys[i]
                        });
                    }
                    angular.forEach(keys, function (key) {
                        $scope.data.push.apply($scope.data, response[key]);
                    });


                }
                $scope.totalRows = $scope.data.length;
                $scope.tableParams.reload();
                $loading.finish("loadingMask");


            }, function (errRes) {
                noty.show("Query failed: " + errRes.statusText, 'error');
                $loading.finish("loadingMask");
            });
        }

        $scope.searchCal = function () {

            switch ($scope.searchCondi) {
                case "keyWord":
                    findByKeyWord();
                    break;
                case "omsOrderId":
                    findByOrderId();
                    break;
                case "pgTrackingId":
                    findByPGTrakId();
                    break;
                default:
                    break;
            }


        };

        var editDomainPop;
        $scope.EditDomain = function () {
            editDomainPop = $uibModal.open({
                animation: true,
                size: "lg",
                templateUrl: 'app/partials/modals/editDomain.html',
                controller: 'EDController',
                scope: $scope

            });
        };
        $scope.closeTaskPad = function () {
            editDomainPop.dismiss('cancel');
        };

        $scope.sortTable = function (sortColumn) {
            $scope.sortByColumn = sortColumn;
            $scope.reverse = !$scope.reverse;
            $scope.tableParams.reload();
        };


        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: PRMconf.DEFAULT_PAGE_SIZE,         // count per page


        }, {
            //counts: [],
            //data: $scope.data,
            //total: 0,
            getData: function ($defer, params) {

                params.total($scope.data.length);

                $scope.data = $filter('orderBy')($scope.data, $scope.sortByColumn, $scope.reverse);
                $defer.resolve($scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));


            }
        });

    }]);
