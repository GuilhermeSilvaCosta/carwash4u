angular.module('carwash4u', ['ngRoute','ngMap']).config(config);

function config($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController',
        controllerAs: 'Home'        
    })
    .when('/carwashes', {
        templateUrl: 'partials/carwashes.html',
        controller: 'CarWashesController',
        controllerAs: 'CarWashes'
    })
    .otherwise({
        redirectTo: '/'
    });;
}