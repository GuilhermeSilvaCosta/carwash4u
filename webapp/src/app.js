angular.module('carwash4u', ['ngRoute','ngMap','ui.materialize','ngGPlaces', 'satellizer']).config(config);

function config($routeProvider, $locationProvider, ngGPlacesAPIProvider){
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
    .when('/manager', {
        templateUrl: 'views/manager.html',
        controller: 'ManagerController',
        controllerAs: 'Manager'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        controllerAs: 'Login'
    })    
    .otherwise({
        redirectTo: '/'
    });
    ngGPlacesAPIProvider.setDefaults({        
        nearbySearchKeys: ['name','geometry','vicinity', 'icon', 'place_id']
    });    
}