define(['angularAMD','ui-router','angular'], function (angularAMD) {
    var app = angular.module("portfolioApp", ['ui.router']);
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/index");
        $stateProvider
        .state('home',
            angularAMD.route({
                url: '/index',
                templateUrl: '../app/components/home/home.html',
                controller: 'HomeCtrl',
                controllerUrl: '../app/components/home/homeCtrl'
        }))
    });
    return angularAMD.bootstrap(app);
});