angular.module('carwash4u', ['ngRoute','ngMap']).config(config);

function config($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController',
        controllerAs: 'Home'        
    })
    .when('/carwashes', {
        templateUrl: 'views/carwashes.html',
        controller: 'CarWashesController',
        controllerAs: 'CarWashes'
    })
    .otherwise({
        redirectTo: '/'
    });;
}