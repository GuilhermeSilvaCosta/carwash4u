angular.module('carwash4u', ['ngRoute','ngMap','ui.materialize']).config(config);

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
    .when('/guilherme', {
        templateUrl: 'views/guilherme.html',
        controller: 'GuilhermeController',
        controllerAs: 'Guilherme'
    })
    .otherwise({
        redirectTo: '/'
    });;
}