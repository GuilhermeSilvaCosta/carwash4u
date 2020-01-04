angular.module('carwash4u', ['ngRoute','ngMap','ui.materialize','ngGPlaces', 'satellizer']).config(config);

function config($routeProvider, $locationProvider, ngGPlacesAPIProvider, $authProvider){
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

    var commonConfig = {
        popupOptions: {
            location: 'no',
            toolbar: 'yes',
            width: window.screen.width,
            height: window.screen.height
        },
        redirectUri: 'http://192.168.0.181:8080/'
    };    
    $authProvider.facebook(angular.extend({}, commonConfig, {
        clientId: 170751986848124,
        url: 'http://localhost:3000/auth/facebook'
    }));
}