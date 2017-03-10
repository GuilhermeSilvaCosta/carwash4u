angular.module('carwash4u').controller('HomeController', HomeController);

function HomeController($scope){
    var vm = this;
     
    vm.showError = showError;
    function showError(error){
        vm.location = error.message;
        $scope.$apply();
    }

    vm.showPosition = showPosition;
    function showPosition(position){
        vm.location = "Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude;
        $scope.$apply();         
    }

    vm.getLocation = getLocation;
    function getLocation(){  
        // vm.location = "Aguarde..."   
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        }else{
            vm.location = "O seu navegador não suporta Geolocalização.";
        }
    }
}