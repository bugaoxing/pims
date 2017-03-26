PRM.controller('HomeController', ['noty','$loading','QueryToolService','$uibModal', '$scope', '$http', '$filter', '$rootScope', '$timeout', 'PRMconf', '$log',
    function (noty,$loading,QueryToolService,$uibModal, $scope, $http, $filter, $rootScope, $timeout, PRMconf, $log) {

        //Default page name
        $scope.pageName = "PersonalEditor";
        $scope.changeLanding = function (pageName) {
            $scope.pageName = pageName;
            $rootScope.pageTitle = pageName;
        };


        $scope.landingUrl = function () {
            return 'app/partials/' + $scope.pageName + '.html';
        };


        $scope.login = function(){
            $loading.start("loadingMask");
            QueryToolService.login($rootScope.login,function(res){

                if(res.successful){
                    $rootScope.role = res.data[0].role;
                    $rootScope.logged = true;
                    noty.show(res.message, 'success');
                }else{
                    noty.show(res.message, 'error');
                }
                $loading.finish("loadingMask");
            },function(error){
                noty.show("登录失败", 'error');
                $loading.finish("loadingMask");
            });

        };

        $scope.register = function(){
            $rootScope.isRegister = true;
            console.log("register");
        };

        $scope.registerConfirm = function(){

            if(PRMconf.isNullOrEmptyOrUndefined($rootScope.login.id)||
                PRMconf.isNullOrEmptyOrUndefined($rootScope.login.password)||
                PRMconf.isNullOrEmptyOrUndefined($rootScope.login.password2)||
                PRMconf.isNullOrEmptyOrUndefined($rootScope.login.role)
            ){
                noty.show("请确认已经填写所有信息以注册用户!", 'error');
                return;
            }
            if($rootScope.login.password!=$rootScope.login.password2){
                noty.show("确保两次密码输入一致!", 'error');
                return;
            }
            $loading.start("loadingMask");
            QueryToolService.register($rootScope.login,function(res){

                if(res.successful){
                    $rootScope.logged = true;
                    $rootScope.role = $rootScope.login.role;
                    noty.show(res.message, 'success');
                }else{
                    noty.show(res.message, 'error');
                }
                $loading.finish("loadingMask");
            },function(error){
                noty.show("注册失败", 'error');
                $loading.finish("loadingMask");
            });
        };
        $scope.registerDismiss = function(){
            $rootScope.isRegister = false;
            console.log("registerDismiss");
        };

    }]);
