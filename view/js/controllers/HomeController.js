angular.module('carwash4u').controller('HomeController', HomeController);

function HomeController($scope){
    var vm = this;
     
    vm.showError = showError;
    function showError(error){
        switch(error.code){
            case error.PERMISSION_DENIED:
                vm.location = "Usuário rejeitou a solicitação de Geolocalização";
                break;
            case error.POSITION_UNAVAILABLE:
                vm.location = "Localização indisponível";
                break;
            case error.TIMEOUT:
                vm.location = "A requisição expirou.";
                break;
            case error.UNKNOWN_ERROR:
                vm.location = "Algum erro desconhecido aconteceu.";
                break;
        }
        $scope.$apply();
    }

    vm.showPosition = showPosition;
    function showPosition(position){
        vm.location = "Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude;
        var latlon = position.coords.latitude+","+position.coords.longitude;
        vm.map = "http://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false";
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