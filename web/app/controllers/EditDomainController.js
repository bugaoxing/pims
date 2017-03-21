PRM.controller('EDController', ["$window", "PRMconf", "ngTableParams", '$loading', 'QueryToolService', '$uibModal', '$scope', '$http', '$filter', '$rootScope', '$timeout', 'PRMconf', '$log', 'noty',
    function ($window, PRMconf, ngTableParams, $loading, QueryToolService, $uibModal, $scope, $http, $filter, $rootScope, $timeout, PRMconf, $log, noty) {

        $scope.sortByColumn = "configId";
        $scope.sortTable = function (selColumn) {
            $scope.sortByColumn = selColumn;
            $scope.tableParams.reload();
        };
        $scope.filter_dict = {};
        $scope.editOn = false;
        $scope.editText = "Edit";
        $scope.data = [];
        $scope.dataz = [];
        $scope.paymentDomains = [];
        var saveIdList = [];
        var addDomainPop;
        $scope.addServerRequest = {};

        $scope.addNew = function(){

            if(PRMconf.isNullOrEmptyOrUndefined($scope.addServerRequest.domainName)||
                PRMconf.isNullOrEmptyOrUndefined($scope.addServerRequest.hosts) ||
                    PRMconf.isNullOrEmptyOrUndefined($scope.addServerRequest.createdBy)){
                noty.show("Please fill all the blanks to add the server!", 'alert');
                return;
            }

            $loading.start("loadingMask");
            QueryToolService.addServerInfo($scope.addServerRequest,function(res){
                if(res.successful){
                    noty.show("Add Successfully!", 'success');
                    $scope.refreshTable();
                    addDomainPop.dismiss('cancel');
                }else{
                    noty.show(res.message, 'error');
                }

                $loading.finish("loadingMask");
            },function(error){
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

        $scope.deleteDomain = function(configId){

            var password = $window.prompt("Please Enter Password to delete...");
            if (password == null) {
                return;
            }
            $loading.start("loadingMask");
            QueryToolService.secretMatching({"se": password}, function (res) {
                if (res.successful == true) {
                    QueryToolService.deleteServer({"configId":configId},function(res){
                        noty.show("Delete successfully!", 'success');
                        $scope.refreshTable();
                        $loading.finish("loadingMask");
                    },function(error){
                        $loading.finish("loadingMask");
                        noty.show("Delete failed!", 'error');
                    });
                } else {
                    noty.show(res.message, 'error');
                    $loading.finish("loadingMask");
                }
            }, function (error) {
                $loading.finish("loadingMask");
            });



        };

        $scope.refreshTable = function () {
            $loading.start("loadingMask");
            QueryToolService.getAllDomainDetails({}, function (res) {

                if (res.successful == true && res.data.length > 0) {
                    $rootScope.domainRootInfo = res.data;
                    angular.forEach($rootScope.domainRootInfo, function (rec) {
                        if ($scope.paymentDomains.indexOf(rec.domainName) < 0) {
                            $scope.paymentDomains.push(rec.domainName);
                        }
                    });
                }
                $scope.data = [];
                $scope.columns = [];
                var excludeList = ['configId', '$$hashKey'];
                var keys = Object.keys($rootScope.domainRootInfo[0]);
                if (keys.length > 0) {
                    for (var i = 0; i < keys.length; i++) {
                        $scope.columns.push({
                            title: keys[i],
                            field: keys[i],
                            visible: excludeList.indexOf(keys[i]) > -1 ? false : true,
                            showFilter: true
                        });
                    }
                    $scope.columns.push({
                        title: "Delete",
                        field: "delete",
                        visible: true,
                        showFilter: false
                    });
                    $scope.data.push.apply($scope.data, $rootScope.domainRootInfo);
                }
                $scope.totalRows = $scope.data.length;
                $scope.tableParams.reload();

                if (res.successful == true && res.data.length == 0)
                    noty.show("Error Getting Domain names, please refresh again", 'error');
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
            if ($scope.editText == "Done") {
                $scope.editText = "Edit";
                $scope.editOn = false;
                return;
            }
            var password = $window.prompt("Please Enter Password to Edit...");
            if (password == null) {
                return;
            }
            $loading.start("loadingMask");
            QueryToolService.secretMatching({"se": password}, function (res) {
                if (res.successful == true) {
                    $scope.editOn = true;
                    $scope.editText = "Done";
                    noty.show("Validation Passed...", 'success');
                } else {
                    noty.show(res.message, 'error');
                }
                $loading.finish("loadingMask");
            }, function (error) {
                $loading.finish("loadingMask");
            });

        };

        $scope.saveChanges = function () {
            var saveRec = [];
            if (saveIdList.length == 0) {
                noty.show("No changes made, will do nothing...", 'success');
                return;
            }
            angular.forEach($scope.dataz, function (rec) {
                if (saveIdList.indexOf(rec.configId) >= 0) {
                    saveRec.push(rec);
                }
            });
            if (saveRec.length > 0) {
                $loading.start("loadingMask");
                QueryToolService.addServers(saveRec, function (res) {

                    noty.show("Save successfully!", "success");
                    saveIdList = [];
                    $loading.finish("loadingMask");

                }, function (error) {
                    noty.show("Query failed: " + error.statusText, 'error');
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
