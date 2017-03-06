angular.module('carwash4u').config(config);

function config($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
    });
}