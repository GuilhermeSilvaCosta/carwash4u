angular.module('carwash4u', ['ngRoute','ngMap','ui.materialize','ngGPlaces']).config(config);

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
    .when('/teste', {
        templateUrl: 'views/guilherme.html',
        controller: 'GuilhermeController',
        controllerAs: 'Guilherme'
    })
    .otherwise({
        redirectTo: '/'
    });
    ngGPlacesAPIProvider.setDefaults({        
        nearbySearchKeys: ['name','geometry','vicinity', 'icon']
    });    
}