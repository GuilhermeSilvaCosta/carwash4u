angular.module('carwash4u', ['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
    });
}