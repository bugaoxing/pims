<%@ page trimDirectiveWhitespaces="true"
         contentType="text/html; charset=UTF-8" %>

<!doctype html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta name="layout" content="main"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link rel="stylesheet" href="app/css/bootstrap.min.css">
    <link rel="stylesheet" href="app/css/font-awesome.min.css">
    <link rel="stylesheet" href="app/css/app.css">

    <title>学生信息管理系统</title>
    <script src="app/vendor/angular/angular.js"></script>
    <script src="app/vendor/angular/jquery.min.js"></script>
    <script src="app/vendor/angular/bootstrap.min.js"></script>
    <script src="app/vendor/angular/angular-cookies.js"></script>
    <script src="app/vendor/angular/spin.min.js"></script>
    <script src="app/vendor/angular/angular-loading.js"></script>
    <script src="app/vendor/angular/angular-drag.js"></script>
    <script src="app/vendor/angular/angular-route.js"></script>
    <script src="app/vendor/angular/angular-resource.js"></script>
    <script src="app/vendor/angular/jquery.noty.js"></script>
    <script src="app/vendor/angular/angular-noty.dist.js"></script>
    <script src="app/vendor/angular/angular-md5.js"></script>
    <script src="app/vendor/angular/angular-animate.js"></script>
    <script src="app/vendor/angular/angular-sanitize.min.js"></script>
    <script src="app/vendor/angular/ng-table.js"></script>

    <script src="app/vendor/angularUI/ui-bootstrap-tpls-2.4.0.min.js"></script>

    <script src="app/vendor/angular/moment.min.js"></script>
    <script src="app/vendor/angular/ui-comments-0.2.0.js"></script>
</head>
<body ng-class="'MainPage-body-Sunny'" ng-app="pims">





<script src="app/app.js"></script>
<script src="app/config.js"></script>
<script src="app/services/services.js"></script>

<!--Directives -->
<script src="app/directives/effectiveDirective.js"></script>

<!--Filter -->
<script src="app/filters/filters.js"></script>


<!--Controllers -->
<script src="app/controllers/HomeController.js"></script>
<script src="app/controllers/PersonalEditorController.js"></script>
<script src="app/controllers/CourseEditorController.js"></script>
<script src="app/controllers/ScheduleController.js"></script>
<script src="app/controllers/NavController.js"></script>
<script src="app/controllers/DatePickerController.js"></script>


<div ng-show="!$root.logged" ng-include="'app/partials/Login.html'" width="100%"></div>
<div ng-if="$root.logged" ng-include="'app/partials/Landing.html'" width="100%" style="box-shadow: 3px 3px 6px rgba(10, 10, 10, 0.79);width:100%">
</div>

</body>

</html>